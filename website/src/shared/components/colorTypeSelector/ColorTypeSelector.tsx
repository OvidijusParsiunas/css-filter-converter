// prettier-ignore
import {
  BASIC_COLOR_TYPE_TO_CLASS,
} from '../../../components/columns/middleColumn/convertButton/convert/basicColors/colorTypeToClass';
import { BasicColor } from '../../../components/columns/middleColumn/convertButton/convert/basicColors/basicColor';
import { FilterToBasicColor } from '../../../components/columns/middleColumn/convertButton/filterToBasicColor';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FilterToColorResultType } from '../../types/filterToBasicColor';
import { updateIsValid } from '../../../state/input/actions';
import { ErrorHandler } from '../errorHander/ErrorHandler';
import { BasicColorTypes } from '../../consts/colorTypes';
import { ResultAction } from '../../../state/result/type';
import { InputAction } from '../../../state/input/types';
import { store } from '../../../state/store';
import { useDispatch } from 'react-redux';
import './colorTypeSelector.css';
import React from 'react';

interface Props {
  updateColorCallback: (color: BasicColor) => InputAction | ResultAction;
  basicColorState: BasicColor;
  innerValues: BasicColorTypes[];
  convertFromFilterOnChange?: boolean;
  customContainerStyling?: React.CSSProperties;
  customFormControlStyling?: React.CSSProperties;
  customSelectorStyling?: React.CSSProperties;
}

export default function ColorTypeSelector(props: Props) {
  const {
    updateColorCallback,
    basicColorState,
    innerValues,
    convertFromFilterOnChange,
    customContainerStyling,
    customFormControlStyling,
    customSelectorStyling,
  } = props;

  const dispatch = useDispatch();

  const selectorRef = React.useRef<HTMLDivElement>();

  const convertFromFilter = async (newBasicColor: BasicColor) => {
    const { filter } = store.getState().input;
    // WORK do not convert if there are no results in history
    const result = await FilterToBasicColor.convert(filter, newBasicColor.colorType as FilterToColorResultType);
    if (!result.color) {
      // decided not to throw an error here and instead directly convert from existing color type to new type
      if (result.error) ErrorHandler.displayMessageOnConsole(result.error.message);
      const { basicColor } = store.getState().result;
      basicColor.convertAndSetColorStringOnNewBasicColor(newBasicColor, ErrorHandler);
    } else {
      // WORK - display error for parser fail
      newBasicColor.setAndParseColorString(result.color, ErrorHandler);
    }
  };

  const handleColorTypeChange = async (event: SelectChangeEvent<string>): Promise<void> => {
    const newColorType = event.target.value as BasicColorTypes;
    const newBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[newColorType]();
    if (convertFromFilterOnChange) {
      await convertFromFilter(newBasicColor);
    } else {
      basicColorState.convertAndSetColorStringOnNewBasicColor(newBasicColor, ErrorHandler);
    }
    dispatch(updateColorCallback(newBasicColor));
    dispatch(updateIsValid(!!newBasicColor.parseResult));
  };

  // prettier-ignore
  const generateList = () => innerValues.map((innerValue) => (
    <MenuItem key={innerValue} value={innerValue}>
      {innerValue}
    </MenuItem>
  ));

  // this is used in a situation where selector height is expanded beyond the trigger (when filter has multiple lines),
  // hence when the user used to click on the selector but not the trigger element - the dropdown did not open,
  // this clicks the trigger for the user during such situations
  const triggerOpenDropdown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const selectorTrigger = selectorRef.current?.childNodes[0];
    if (selectorTrigger && e.target !== selectorTrigger) {
      selectorTrigger.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: false }));
    }
  };

  return (
    <div className="color-type-selector-container" style={customContainerStyling}>
      <FormControl
        sx={{ m: 1, minWidth: 84, margin: 0, marginRight: 1 }}
        style={customFormControlStyling}
        size="small"
        onMouseDown={(e) => triggerOpenDropdown(e)}
      >
        <Select
          ref={selectorRef}
          value={basicColorState.colorType}
          style={customSelectorStyling}
          onChange={handleColorTypeChange}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          {generateList()}
        </Select>
      </FormControl>
    </div>
  );
}

ColorTypeSelector.defaultProps = {
  customContainerStyling: {},
  customFormControlStyling: {},
  customSelectorStyling: {},
  convertFromFilterOnChange: false,
};
