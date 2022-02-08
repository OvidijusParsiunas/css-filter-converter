import { BASIC_COLOR_TYPE_TO_CLASS } from '../../convertButton/convert/basicColors/colorTypeToClass';
import { updateColorText, updateColorType, updateIsValid } from '../../../state/colorInput/actions';
import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { BasicColor } from '../../convertButton/convert/basicColors/basicColor';
import { ColorConversionTypes } from '../../../shared/types/basicColorFactory';
import { BasicColorTypes } from '../../../shared/consts/colorTypes';
import 'react-color-palette/lib/css/styles.css';
import CustomColorPicker from './customColorPicker';
import { useDispatch } from 'react-redux';
import React from 'react';
import './input.css';

export default function Input({ basicColor }: { basicColor: BasicColor }) {
  const dispatch = useDispatch();
  const inputElement = React.createRef<HTMLInputElement>();

  const [selectedBasicColor, setSelectedBasicColor] = React.useState<BasicColor>(basicColor);
  const [isSelectedColorValid, setIsSelectedColorValid] = React.useState<boolean>(true);

  const updateIsValidState = (parseResult: ColorConversionTypes | null): void => {
    const isValid = !!parseResult;
    setIsSelectedColorValid(isValid);
    dispatch(updateIsValid(isValid));
  };

  const handleColorTypeChange = (event: SelectChangeEvent<string>): void => {
    const newColorType = event.target.value as BasicColorTypes;
    const newBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[newColorType]();
    selectedBasicColor.convertAndSetColorStringOnNewBasicColor(newBasicColor);
    if (inputElement.current) inputElement.current.value = newBasicColor.colorString;
    setSelectedBasicColor(newBasicColor);
    dispatch(updateColorType(newColorType));
    updateIsValidState(newBasicColor.parseResult);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectedBasicColor.setAndParseColorString(event.target.value);
    dispatch(updateColorText(selectedBasicColor.colorString));
    updateIsValidState(selectedBasicColor.parseResult);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 84, margin: 0 }} size="small">
        <Select
          value={selectedBasicColor.colorType}
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
        defaultValue={selectedBasicColor.colorString}
        inputRef={inputElement}
        onChange={handleTextChange}
      />
      <CustomColorPicker />
    </div>
  );
}
