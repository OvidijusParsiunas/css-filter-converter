import { ColorConversionTypes } from '../../../../shared/types/basicColorFactory';
import { updateIsValid } from '../../../../state/input/actions';
import { RootReducer } from '../../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';

export default function FilterColorInput() {
  const dispatch = useDispatch();
  const inputState = useSelector<RootReducer, RootReducer['input']>((state) => state.input);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateIsValidState = (parseResult: ColorConversionTypes | null): void => {
    const isValid = !!parseResult;
    dispatch(updateIsValid(isValid));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // updateIsValidState(inputState.basicColor.parseResult);
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
      <TextField
        size="small"
        sx={headerClassOverwriteCss}
        style={headerStyle}
        value="Filter"
        error={!inputState.isValid}
      />
      <TextField
        multiline
        size="small"
        style={inputStyle}
        variant="outlined"
        error={!inputState.isValid}
        onChange={handleTextChange}
      />
    </div>
  );
}
