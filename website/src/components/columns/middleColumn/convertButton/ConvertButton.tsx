import { updateResultBasicColor, updateResultFilter } from '../../../../state/result/actions';
import { FilterToColorResultType } from '../../../../shared/types/filterToBasicColor';
import { BASIC_COLOR_TYPE_TO_CLASS } from './convert/basicColors/colorTypeToClass';
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
    const { colorType } = store.getState().result.basicColor;
    FilterToBasicColor.convert(filter, colorType as FilterToColorResultType).then((resultColorString) => {
      const newBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[colorType]();
      newBasicColor.setAndParseColorString(resultColorString);
      dispatch(updateResultBasicColor(newBasicColor));
      dispatch(addToHistory(filter, resultColorString, colorType));
    });
  };

  const convertToFilter = (basicColor: BasicColor) => {
    const { colorString: inputColorString, colorType } = basicColor;
    const resultColorString = BasicColorToFilter.convert(inputColorString, colorType);
    dispatch(updateResultFilter(resultColorString));
    dispatch(addToHistory(inputColorString, resultColorString, colorType));
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
    <Button sx={buttonClassOverwriteCss} disabled={!isValidState} variant="contained" color="primary" onClick={convert}>
      Convert
    </Button>
  );
}

export default ConvertButton;
