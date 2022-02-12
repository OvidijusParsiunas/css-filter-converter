import { updateFilter, updateIsValid } from '../../../../state/input/actions';
import { RootReducer } from '../../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import React from 'react';

export default function FilterColorInput() {
  const dispatch = useDispatch();
  const inputState = useSelector<RootReducer, RootReducer['input']>((state) => state.input);

  const filterTestElement = React.useRef<HTMLDivElement>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilter(event.target.value));
    if (filterTestElement.current) {
      const { style } = filterTestElement.current;
      style.filter = '';
      style.filter = event.target.value;
      dispatch(updateIsValid(!!style.filter));
    }
  };

  const inputStyle: React.CSSProperties = {
    width: 'calc(80% - 77px)',
    backgroundColor: 'white',
  };

  const headerStyle: React.CSSProperties = {
    width: '70px',
    height: '100%',
    position: 'fixed',
    userSelect: 'none',
    pointerEvents: 'none',
    display: 'inline-flex',
    marginLeft: '-77px',
    backgroundColor: 'white',
  };

  const headerClassOverwriteCss = {
    '.MuiOutlinedInput-root': {
      height: '100%',
    },
  };

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
      <div ref={filterTestElement} />
    </div>
  );
}
