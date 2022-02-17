import { FilterToColorResultType } from '../../../../shared/types/filterToBasicColor';
import { ErrorHandler } from '../../../../shared/components/errorHander/ErrorHandler';
import { updateResultFilter } from '../../../../state/result/actions';
import { InputTypes } from '../../../../shared/consts/inputTypes';
import { addToHistory } from '../../../../state/history/actions';
import { BasicColor } from './convert/basicColors/basicColor';
import { RootReducer } from '../../../../state/rootReducer';
import { BasicColorToFilter } from './basicColorToFilter';
import { FilterToBasicColor } from './filterToBasicColor';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../state/store';
import Button from '@mui/material/Button';

function ConvertButton() {
  const dispatch = useDispatch();

  const isValidState = useSelector<RootReducer, RootReducer['input']['isValid']>((state) => state.input.isValid);

  const convertToBasicColor = (filter: string) => {
    const { basicColor } = store.getState().result;
    FilterToBasicColor.convert(filter, basicColor.colorType as FilterToColorResultType).then((result) => {
      if (!result.color) {
        ErrorHandler.displayError(result.error?.message);
      } else {
        basicColor.setAndParseColorString(result.color, ErrorHandler);
        dispatch(addToHistory(filter, result.color, basicColor.colorType));
      }
    });
  };

  const convertToFilter = (basicColor: BasicColor) => {
    const { colorString: inputColorString, colorType } = basicColor;
    const result = BasicColorToFilter.convert(inputColorString, colorType);
    if (!result.color) {
      ErrorHandler.displayError(result.error?.message);
    } else {
      dispatch(updateResultFilter(result.color));
      dispatch(addToHistory(inputColorString, result.color, colorType));
    }
  };

  const convert = (): void => {
    const { basicColor, filter, activeType } = store.getState().input;
    if (activeType === InputTypes.BASIC_COLOR) {
      convertToFilter(basicColor);
    } else {
      convertToBasicColor(filter);
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
      disabled={!isValidState}
      variant="contained"
      color="primary"
      onClick={() => ErrorHandler.executeEvent(convert)}
    >
      Convert
    </Button>
  );
}

export default ConvertButton;
