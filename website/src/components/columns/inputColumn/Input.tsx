import { updateColorTextAndIsValid, updateColorType } from '../../../shared/state/colorInput/colorInputActions';
import { BASIC_COLOR_TYPE_TO_CLASS } from '../../convertButton/convert/basicColors/colorTypeToClass';
import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { BasicColor } from '../../convertButton/convert/basicColors/basicColor';
import { RootReducer } from '../../../shared/types/state/rootReducer';
import { BasicColorTypes } from '../../../shared/consts/colorTypes';
import { ElementIds } from '../../../shared/consts/elementIds';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import './input.css';

function Input() {
  const colorInputState = useSelector<RootReducer, RootReducer['colorInput']>((state) => state.colorInput);

  const dispatch = useDispatch();

  const [selectedBasicColor, setSelectedBasicColor] = React.useState<BasicColor>(
    new BASIC_COLOR_TYPE_TO_CLASS[colorInputState.colorType](colorInputState.text),
  );

  const handleColorTypeChange = (event: SelectChangeEvent<string>): void => {
    const textInputElement = document.getElementById(ElementIds.COLOR_INPUT_FIELD) as HTMLInputElement;
    const newColorType = event.target.value as BasicColorTypes;
    const newBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[newColorType]();
    selectedBasicColor.convertAndSetColorStringOnNewColor(newBasicColor);
    textInputElement.value = newBasicColor.colorString;
    setSelectedBasicColor(newBasicColor);
    dispatch(updateColorType(newColorType));
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectedBasicColor.setAndParseColorString(event.target.value);
    dispatch(updateColorTextAndIsValid(selectedBasicColor.colorString, !!selectedBasicColor.parseResult));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 84, margin: 0 }} size="small">
        <Select
          id={ElementIds.COLOR_TYPE_DROPDOWN}
          value={colorInputState.colorType}
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
        error={!colorInputState.isValid}
        size="small"
        id={ElementIds.COLOR_INPUT_FIELD}
        variant="outlined"
        defaultValue={colorInputState.text}
        onChange={handleTextChange}
      />
    </div>
  );
}

export default Input;
