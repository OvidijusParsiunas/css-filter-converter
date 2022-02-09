import { BASIC_COLOR_TYPE_TO_CLASS } from '../../convertButton/convert/basicColors/colorTypeToClass';
import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ColorConversionTypes } from '../../../shared/types/basicColorFactory';
import { updateColor, updateIsValid } from '../../../state/input/actions';
import { BasicColorTypes } from '../../../shared/consts/colorTypes';
import { RootReducer } from '../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import CustomColorPicker from './customColorPicker';
import 'react-color-palette/lib/css/styles.css';
import React from 'react';
import './input.css';

export default function Input() {
  const dispatch = useDispatch();
  const inputState = useSelector<RootReducer, RootReducer['input']>((state) => state.input);

  const [isSelectedColorValid, setIsSelectedColorValid] = React.useState<boolean>(true);

  const updateIsValidState = (parseResult: ColorConversionTypes | null): void => {
    const isValid = !!parseResult;
    setIsSelectedColorValid(isValid);
    dispatch(updateIsValid(isValid));
  };

  const handleColorTypeChange = (event: SelectChangeEvent<string>): void => {
    const newColorType = event.target.value as BasicColorTypes;
    const newBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[newColorType]();
    inputState.color.convertAndSetColorStringOnNewBasicColor(newBasicColor);
    dispatch(updateColor(newBasicColor));
    updateIsValidState(newBasicColor.parseResult);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputState.color.setAndParseColorString(event.target.value);
    updateIsValidState(inputState.color.parseResult);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 84, margin: 0 }} size="small">
        <Select
          value={inputState.color.colorType}
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
        error={!isSelectedColorValid}
        size="small"
        variant="outlined"
        value={inputState.color.colorString}
        onChange={handleTextChange}
      />
      <CustomColorPicker />
    </div>
  );
}
