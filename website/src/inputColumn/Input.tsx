import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { BASIC_COLOR_TYPE_STRING } from '../types/colorTypeString';
import { BASIC_COLOR_TYPES } from '../consts/colorTypes';
import { ColorToColor } from '../convert/colorToColor';
import { ELEMENT_IDS } from '../consts/elementIds';
import React from 'react';
import './input.css';

function Input() {
  const [colorType, setColorType] = React.useState<BASIC_COLOR_TYPE_STRING>(BASIC_COLOR_TYPES.HEX);

  const changeColorType = (event: SelectChangeEvent<string>): void => {
    const textInputElement = document.getElementById(ELEMENT_IDS.COLOR_INPUT_FIELD) as HTMLInputElement;
    const input = textInputElement.value as string;
    const newColorType = event.target.value as BASIC_COLOR_TYPE_STRING;
    const result = ColorToColor.convert(colorType, newColorType, input);
    textInputElement.value = result;
    setColorType(newColorType);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 84, margin: 0 }} size="small">
        <Select
          id={ELEMENT_IDS.COLOR_TYPE_DROPDOWN}
          value={colorType}
          onChange={changeColorType}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          <MenuItem value={BASIC_COLOR_TYPES.HEX}>{BASIC_COLOR_TYPES.HEX}</MenuItem>
          <MenuItem value={BASIC_COLOR_TYPES.RGB}>{BASIC_COLOR_TYPES.RGB}</MenuItem>
          <MenuItem value={BASIC_COLOR_TYPES.HSL}>{BASIC_COLOR_TYPES.HSL}</MenuItem>
          <MenuItem value={BASIC_COLOR_TYPES.KEYWORD}>{BASIC_COLOR_TYPES.KEYWORD}</MenuItem>
        </Select>
      </FormControl>
      <TextField size="small" id={ELEMENT_IDS.COLOR_INPUT_FIELD} variant="outlined" defaultValue="#3c3ce8" />
    </div>
  );
}

export default Input;
