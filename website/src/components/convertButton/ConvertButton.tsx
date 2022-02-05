import { updateResult } from '../../state/result/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../state/rootReducer';
import { ColorToFilter } from './colorToFilter';
import { store } from '../../state/store';
import Button from '@mui/material/Button';
import './convertButton.css';

function ConvertButton() {
  const dispatch = useDispatch();

  const isColorInputValid = useSelector<RootReducer, RootReducer['colorInput']['isValid']>(
    (state) => state.colorInput.isValid,
  );

  const convert = (): void => {
    const { text, colorType } = store.getState().colorInput;
    const resultColor = ColorToFilter.convert(text, colorType);
    dispatch(updateResult(resultColor));
  };

  const styling = {
    '&.Mui-disabled': {
      backgroundColor: '#7197c0', // #d48484
      color: 'white',
    },
  };

  return (
    <div id="convert-button-container">
      <Button
        sx={styling}
        disabled={!isColorInputValid}
        variant="contained"
        color="primary"
        id="convert-button"
        onClick={convert}
      >
        Convert
      </Button>
    </div>
  );
}

export default ConvertButton;
