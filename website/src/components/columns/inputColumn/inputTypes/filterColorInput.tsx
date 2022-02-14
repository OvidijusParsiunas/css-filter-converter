import { BASIC_COLOR_TYPE_TO_CLASS } from '../../middleColumn/convertButton/convert/basicColors/colorTypeToClass';
import { updateInputBasicColor, updateInputFilter, updateIsValid } from '../../../../state/input/actions';
import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ColorConversionTypes } from '../../../../shared/types/basicColorFactory';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { RootReducer } from '../../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

export default function FilterColorInput() {
  const dispatch = useDispatch();
  const inputState = useSelector<RootReducer, RootReducer['input']>((state) => state.input);

  const filterTestElement = React.useRef<HTMLDivElement>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateInputFilter(event.target.value));
    if (filterTestElement.current) {
      const { style } = filterTestElement.current;
      style.filter = '';
      style.filter = event.target.value;
      dispatch(updateIsValid(!!style.filter));
    }
  };

  const updateIsValidState = (parseResult: ColorConversionTypes | null): void => {
    const isValid = !!parseResult;
    dispatch(updateIsValid(isValid));
  };

  const handleColorTypeChange = (event: SelectChangeEvent<string>): void => {
    const newColorType = event.target.value as BasicColorTypes;
    const newBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[newColorType]();
    inputState.basicColor.convertAndSetColorStringOnNewBasicColor(newBasicColor);
    dispatch(updateInputBasicColor(newBasicColor));
    updateIsValidState(newBasicColor.parseResult);
  };

  const inputStyle: React.CSSProperties = {
    width: 'calc(80% - 77px)',
    backgroundColor: 'white',
    left: '20px',
  };

  const headerStyle: React.CSSProperties = {
    width: '65px',
    height: '100%',
    position: 'fixed',
    userSelect: 'none',
    pointerEvents: 'none',
    display: 'inline-flex',
    marginLeft: '-54px',
    backgroundColor: 'white',
  };

  const headerClassOverwriteCss = {
    '.MuiOutlinedInput-root': {
      height: '100%',
    },
  };

  const getBasicColorDropdown = () => (
    <FormControl sx={{ m: 1, minWidth: 14, margin: 0, marginRight: 1, position: 'fixed', height: '100%' }} size="small">
      <Select
        value={inputState.basicColor.colorType}
        style={{ height: '100%' }}
        onChange={handleColorTypeChange}
        inputProps={{ MenuProps: { disableScrollLock: true } }}
      >
        <MenuItem value={BasicColorTypes.HEX}>{BasicColorTypes.HEX}</MenuItem>
        <MenuItem value={BasicColorTypes.RGB}>{BasicColorTypes.RGB}</MenuItem>
        <MenuItem value={BasicColorTypes.HSL}>{BasicColorTypes.HSL}</MenuItem>
      </Select>
    </FormControl>
  );

  return (
    <div>
      <TextField size="small" sx={headerClassOverwriteCss} style={headerStyle} value="Filter" />
      <TextField
        multiline
        size="small"
        style={inputStyle}
        variant="outlined"
        error={!inputState.isValid}
        value={inputState.filter}
        onChange={handleTextChange}
      />
      {false ? getBasicColorDropdown() : null}
      <div ref={filterTestElement} />
    </div>
  );
}
