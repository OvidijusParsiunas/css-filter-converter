import { BASIC_COLOR_TYPE_TO_CLASS } from '../middleColumn/convertButton/convert/basicColors/colorTypeToClass';
import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ColorConversionTypes } from '../../../shared/types/basicColorFactory';
import { updateColor, updateIsValid } from '../../../state/input/actions';
import { BasicColorTypes } from '../../../shared/consts/colorTypes';
import { InputTypes } from '../../../shared/consts/inputTypes';
import { RootReducer } from '../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import CustomColorPicker from './customColorPicker';
import 'react-color-palette/lib/css/styles.css';
import React from 'react';
import './input.css';

export default function Input() {
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

  // prettier-ignore
  const getInputColorValue = () => (
    inputState.activeType === InputTypes.FILTER ? inputState.filter : inputState.basicColor.colorString
  );

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 84, margin: 0 }} size="small">
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
        value={getInputColorValue()}
        onChange={handleTextChange}
      />
      <CustomColorPicker />
    </div>
  );
}
