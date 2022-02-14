import { BASIC_COLOR_TYPE_TO_CLASS } from '../middleColumn/convertButton/convert/basicColors/colorTypeToClass';
import { BasicColor } from '../middleColumn/convertButton/convert/basicColors/basicColor';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { BasicColorTypes } from '../../../shared/consts/colorTypes';
import { updateIsValid } from '../../../state/input/actions';
import { ResultAction } from '../../../state/result/type';
import { InputAction } from '../../../state/input/types';
import { useDispatch } from 'react-redux';

interface Props {
  updateColorCallback: (color: BasicColor) => InputAction | ResultAction;
  basicColorState: BasicColor;
  innerValues: BasicColorTypes[];
  customOuterStyling?: React.CSSProperties;
  customInnerStyling?: React.CSSProperties;
}

export default function ColorTypeSelector(props: Props) {
  const { updateColorCallback, basicColorState, customOuterStyling, customInnerStyling, innerValues } = props;
  const dispatch = useDispatch();

  const handleColorTypeChange = (event: SelectChangeEvent<string>): void => {
    const newColorType = event.target.value as BasicColorTypes;
    const newBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[newColorType]();
    basicColorState.convertAndSetColorStringOnNewBasicColor(newBasicColor);
    dispatch(updateColorCallback(newBasicColor));
    dispatch(updateIsValid(!!newBasicColor.parseResult));
  };

  const generateList = () => innerValues.map((innerValue) => <MenuItem value={innerValue}>{innerValue}</MenuItem>);

  return (
    <div style={{ width: 84, height: 40, position: 'relative', display: 'inline-flex', ...customOuterStyling }}>
      <FormControl sx={{ m: 1, minWidth: 84, margin: 0, marginRight: 1 }} style={{ ...customInnerStyling }} size="small">
        <Select
          value={basicColorState.colorType}
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
  customOuterStyling: {},
  customInnerStyling: {},
};
