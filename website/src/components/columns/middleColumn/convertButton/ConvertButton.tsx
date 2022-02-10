import { addToHistory } from '../../../../state/history/actions';
import { updateResult } from '../../../../state/result/actions';
import { RootReducer } from '../../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ColorToFilter } from './colorToFilter';
import { store } from '../../../../state/store';
import Button from '@mui/material/Button';

function ConvertButton() {
  const dispatch = useDispatch();

  const isInputValidState = useSelector<RootReducer, RootReducer['input']['isValid']>((state) => state.input.isValid);

  const convert = (): void => {
    const currentResult = store.getState().result.text;
    const { colorString, colorType } = store.getState().input.color;
    if (currentResult) dispatch(addToHistory(colorString, currentResult));
    const resultColor = ColorToFilter.convert(colorString, colorType);
    dispatch(updateResult(resultColor));
  };

  const styling = {
    '&.Mui-disabled': {
      backgroundColor: '#7197c0', // #d48484
      color: 'white',
    },
  };

  return (
    <Button sx={styling} disabled={!isInputValidState} variant="contained" color="primary" onClick={convert}>
      Convert
    </Button>
  );
}

export default ConvertButton;
