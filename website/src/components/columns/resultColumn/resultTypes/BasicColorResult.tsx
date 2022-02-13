import { BASIC_COLOR_TYPE_TO_CLASS } from '../../middleColumn/convertButton/convert/basicColors/colorTypeToClass';
import CustomColorPicker from '../../inputColumn/customColorPicker/CustomColorPicker';
import { ColorConversionTypes } from '../../../../shared/types/basicColorFactory';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { ComponentAsProp } from '../../../../shared/types/componentAsProp';
import { updateResultBasicColor } from '../../../../state/result/actions';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import ResultHeaderText from '../resultHeaderText/resultHeaderText';
import { updateIsValid } from '../../../../state/input/actions';
import { RootReducer } from '../../../../state/rootReducer';
import OutputText from '../outputTextWrapper/outputText';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  children: ComponentAsProp;
};

export default function BasicColorResult(props: Props) {
  const { children } = props;

  const dispatch = useDispatch();
  const resultColorState = useSelector<RootReducer, RootReducer['result']['basicColor']>(
    (state) => state.result.basicColor,
  );

  const updateIsValidState = (parseResult: ColorConversionTypes | null): void => {
    const isValid = !!parseResult;
    dispatch(updateIsValid(isValid));
  };

  const handleColorTypeChange = (event: SelectChangeEvent<string>): void => {
    const newColorType = event.target.value as BasicColorTypes;
    const newBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[newColorType]();
    resultColorState.convertAndSetColorStringOnNewBasicColor(newBasicColor);
    dispatch(updateResultBasicColor(newBasicColor));
    updateIsValidState(newBasicColor.parseResult);
  };

  // WORK - basic color type should be a reusable component
  const getBasicColorDropdown = () => (
    <div style={{ width: 84, height: 40, display: 'inline-flex', marginRight: 10 }}>
      <FormControl sx={{ m: 1, minWidth: 84, margin: 0, marginRight: 1 }} size="small">
        <Select
          value={resultColorState.colorType}
          onChange={handleColorTypeChange}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          <MenuItem value={BasicColorTypes.HEX}>{BasicColorTypes.HEX}</MenuItem>
          <MenuItem value={BasicColorTypes.RGB}>{BasicColorTypes.RGB}</MenuItem>
          <MenuItem value={BasicColorTypes.HSL}>{BasicColorTypes.HSL}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );

  // prettier-ignore
  const getColorPicker = () => (resultColorState.colorString ? (
    <CustomColorPicker state={{ basicColor: resultColorState, isValid: true }} isSelectable={false} />
  ) : null);

  return (
    <div>
      <OutputText>
        {true && resultColorState.colorString ? getBasicColorDropdown() : null}
        <div style={{ display: 'table' }}>
          <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <ResultHeaderText applyPrefixClasses={!!resultColorState.colorString} />
          </div>
          <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <div className="result-text">{resultColorState.colorString}</div>
          </div>
        </div>
        {getColorPicker()}
      </OutputText>
      {children}
    </div>
  );
}
