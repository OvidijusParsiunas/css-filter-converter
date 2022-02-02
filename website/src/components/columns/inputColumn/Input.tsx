import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { BasicColorTypes } from '../../../shared/consts/colorTypes';
import { ElementIds } from '../../../shared/consts/elementIds';
import { ColorToColor } from '../../convertButton/convert/colorToColor';
import React from 'react';
import './input.css';

function Input() {
  const [colorType, setColorType] = React.useState<BasicColorTypes>(BasicColorTypes.HEX);

  const changeColorType = (event: SelectChangeEvent<string>): void => {
    const textInputElement = document.getElementById(ElementIds.COLOR_INPUT_FIELD) as HTMLInputElement;
    const input = textInputElement.value as string;
    const newColorType = event.target.value as BasicColorTypes;
    const result = ColorToColor.convert(input, colorType, newColorType);
    textInputElement.value = result;
    setColorType(newColorType);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 84, margin: 0 }} size="small">
        <Select
          id={ElementIds.COLOR_TYPE_DROPDOWN}
          value={colorType}
          onChange={changeColorType}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          <MenuItem value={BasicColorTypes.HEX}>{BasicColorTypes.HEX}</MenuItem>
          <MenuItem value={BasicColorTypes.RGB}>{BasicColorTypes.RGB}</MenuItem>
          <MenuItem value={BasicColorTypes.HSL}>{BasicColorTypes.HSL}</MenuItem>
          <MenuItem value={BasicColorTypes.KEYWORD}>{BasicColorTypes.KEYWORD}</MenuItem>
        </Select>
      </FormControl>
      <TextField size="small" id={ElementIds.COLOR_INPUT_FIELD} variant="outlined" defaultValue="#3c3ce8" />
    </div>
  );
}

export default Input;
