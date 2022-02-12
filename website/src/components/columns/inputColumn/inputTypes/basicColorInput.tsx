import { BASIC_COLOR_TYPE_TO_CLASS } from '../../middleColumn/convertButton/convert/basicColors/colorTypeToClass';
import { SelectChangeEvent, FormControl, Select, MenuItem, TextField } from '@mui/material';
import { ColorConversionTypes } from '../../../../shared/types/basicColorFactory';
import { updateIsValid, updateColor } from '../../../../state/input/actions';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import CustomColorPicker from '../customColorPicker/customColorPicker';
import { RootReducer } from '../../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';

export default function BasicColorInput() {
  const dispatch = useDispatch();
  const inputState = useSelector<RootReducer, RootReducer['input']>((state) => state.input);

  const updateIsValidState = (parseResult: ColorConversionTypes | null): void => {
    const isValid = !!parseResult;
    dispatch(updateIsValid(isValid));
  };

  const handleColorTypeChange = (event: SelectChangeEvent<string>): void => {
    const newColorType = event.target.value as BasicColorTypes;
    const newBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[newColorType]();
    inputState.basicColor.convertAndSetColorStringOnNewBasicColor(newBasicColor);
    dispatch(updateColor(newBasicColor));
    updateIsValidState(newBasicColor.parseResult);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputState.basicColor.setAndParseColorString(event.target.value);
    updateIsValidState(inputState.basicColor.parseResult);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 84, margin: 0, marginRight: 1 }} size="small">
        <Select
          value={inputState.basicColor.colorType}
          onChange={handleColorTypeChange}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          <MenuItem value={BasicColorTypes.HEX}>{BasicColorTypes.HEX}</MenuItem>
          <MenuItem value={BasicColorTypes.RGB}>{BasicColorTypes.RGB}</MenuItem>
          <MenuItem value={BasicColorTypes.HSL}>{BasicColorTypes.HSL}</MenuItem>
          <MenuItem value={BasicColorTypes.KEYWORD}>{BasicColorTypes.KEYWORD}</MenuItem>
        </Select>
      </FormControl>
      <TextField
        error={!inputState.isValid}
        size="small"
        variant="outlined"
        value={inputState.basicColor.colorString}
        onChange={handleTextChange}
      />
      <CustomColorPicker />
    </div>
  );
}
