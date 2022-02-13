import { FilterToColorResultType } from '../../../../shared/types/filterToBasicColor';
import { InputTypes } from '../../../../shared/consts/inputTypes';
import { addToHistory } from '../../../../state/history/actions';
import { updateResult } from '../../../../state/result/actions';
import { RootReducer } from '../../../../state/rootReducer';
import { BasicColorToFilter } from './basicColorToFilter';
import { FilterToBasicColor } from './filterToBasicColor';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../state/store';
import Button from '@mui/material/Button';

function ConvertButton() {
  const dispatch = useDispatch();

  const isInputState = useSelector<RootReducer, RootReducer['input']>((state) => state.input);

  const updateResultAndHistory = (inputColorString: string, resultColorString: string) => {
    dispatch(updateResult(resultColorString));
    dispatch(addToHistory(inputColorString, resultColorString));
  };

  const convert = (): void => {
    const {
      basicColor: { colorString: inputColorString, colorType },
      filter,
      activeType,
    } = store.getState().input;
    if (activeType === InputTypes.BASIC_COLOR) {
      const resultColorString = BasicColorToFilter.convert(inputColorString, colorType);
      updateResultAndHistory(inputColorString, resultColorString);
    } else {
      FilterToBasicColor.convert(filter, colorType as FilterToColorResultType).then((resultColorString) => {
        updateResultAndHistory(filter, resultColorString);
      });
    }
  };

  const buttonClassOverwriteCss = {
    '&.Mui-disabled': {
      backgroundColor: '#7197c0', // #d48484
      color: 'white',
    },
  };

  return (
    <Button
      sx={buttonClassOverwriteCss}
      disabled={!isInputState.isValid}
      variant="contained"
      color="primary"
      onClick={convert}
    >
      Convert
    </Button>
  );
}

export default ConvertButton;
