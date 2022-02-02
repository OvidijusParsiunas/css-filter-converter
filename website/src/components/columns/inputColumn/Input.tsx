import { BASIC_COLOR_TYPE_TO_CLASS } from '../../convertButton/convert/basicColors/colorTypeToClass';
import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { BasicColor } from '../../convertButton/convert/basicColors/basicColor';
import { HexBasicColor } from '../../convertButton/convert/basicColors/hex';
import { BasicColorTypes } from '../../../shared/consts/colorTypes';
import { ElementIds } from '../../../shared/consts/elementIds';
import React from 'react';
import './input.css';

function Input() {
  const [selectedBasicColor, setSelectedBasicColor] = React.useState<BasicColor>(new HexBasicColor('#3c3ce8'));
  const [isInputValid, setIsInputValid] = React.useState(true);

  const changeColorType = (event: SelectChangeEvent<string>): void => {
    const textInputElement = document.getElementById(ElementIds.COLOR_INPUT_FIELD) as HTMLInputElement;
    const newColorType = event.target.value as BasicColorTypes;
    const newBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[newColorType]();
    selectedBasicColor.convertAndSetColorStringOnNewColor(newBasicColor);
    textInputElement.value = newBasicColor.colorString;
    setSelectedBasicColor(newBasicColor);
    setIsInputValid(!!newBasicColor.parseResult);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectedBasicColor.setAndParseColorString(event.target.value);
    setIsInputValid(!!selectedBasicColor.parseResult);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 84, margin: 0 }} size="small">
        <Select
          id={ElementIds.COLOR_TYPE_DROPDOWN}
          value={selectedBasicColor.colorType}
          onChange={changeColorType}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          <MenuItem value={BasicColorTypes.HEX}>{BasicColorTypes.HEX}</MenuItem>
          <MenuItem value={BasicColorTypes.RGB}>{BasicColorTypes.RGB}</MenuItem>
          <MenuItem value={BasicColorTypes.HSL}>{BasicColorTypes.HSL}</MenuItem>
          <MenuItem value={BasicColorTypes.KEYWORD}>{BasicColorTypes.KEYWORD}</MenuItem>
        </Select>
      </FormControl>
      <TextField
        error={!isInputValid}
        size="small"
        id={ElementIds.COLOR_INPUT_FIELD}
        variant="outlined"
        defaultValue={selectedBasicColor.colorString}
        onChange={handleChange}
      />
    </div>
  );
}

export default Input;
