import { BASIC_COLOR_TYPE_TO_CLASS } from '../../middleColumn/convertButton/convert/basicColors/colorTypeToClass';
import CustomColorPicker from '../../inputColumn/customColorPicker/CustomColorPicker';
import { ColorConversionTypes } from '../../../../shared/types/basicColorFactory';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { updateResultBasicColor } from '../../../../state/result/actions';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import ResultHeaderText from '../resultHeaderText/resultHeaderText';
import { updateIsValid } from '../../../../state/input/actions';
import { RootReducer } from '../../../../state/rootReducer';
import OutputText from '../outputTextWrapper/outputText';
import { useDispatch, useSelector } from 'react-redux';
import History from '../history/history';

export default function BasicColorResult() {
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

  // The reason why history is a child of the result component is because it has to always safely be below the result text
  // which can usually get high with long filter results (especially when window width is narrow).
  // WORK - pass history component as child
  // WORK - color picker should use the result
  // WORK - color picker should not be selectable
  return (
    <div>
      <OutputText>
        {true ? getBasicColorDropdown() : null}
        <div style={{ display: 'table' }}>
          <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            {/* WORK - should be if there are any existing results */}
            <ResultHeaderText applyPrefixClasses={!!resultColorState.colorString} />
          </div>
          <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <div className="result-text">{resultColorState.colorString}</div>
          </div>
        </div>
        <CustomColorPicker />
      </OutputText>
      <History />
    </div>
  );
}