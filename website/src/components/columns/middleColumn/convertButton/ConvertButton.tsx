import { FilterToColorResultType } from '../../../../shared/types/filterToBasicColor';
import { ErrorHandler } from '../../../../shared/components/errorHander/ErrorHandler';
import { Animations } from '../../../../shared/functionality/animations/animations';
import { FilterInputUtil } from '../../inputColumn/inputTypes/filterInputUtil';
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

interface Props {
  resultHeaderTextRef: React.RefObject<HTMLDivElement>;
}

export default function ConvertButton(props: Props) {
  const { resultHeaderTextRef } = props;
  const dispatch = useDispatch();

  const isValidState = useSelector<RootReducer, RootReducer['input']['isValid']>((state) => state.input.isValid);
  const isSheenAddedState = useSelector<RootReducer, RootReducer['settings']['isSheenAdded']>(
    (state) => state.settings.isSheenAdded,
  );

  const triggerResultHeaderAnimation = () => {
    if (store.getState().history.history.length === 0) {
      const resultHeaderTextElement = resultHeaderTextRef.current as HTMLElement;
      const animationDurationMl = 1000;
      Animations.fadeOutandFadeInOnReactiveComponent(animationDurationMl, resultHeaderTextElement);
    }
  };

  const convertToBasicColor = (filter: string) => {
    // the reason why incoming filter needs to be parsed is because the user can have inserted whitespace in-between
    // filter string parameters which is technically valid - however does not look great in history and prevents
    // sheen string detection from working correctly. Hence, the filter is parsed into he correct format
    const parsedFilterResult = FilterInputUtil.parse(filter).filter;
    const { basicColor } = store.getState().result;
    FilterToBasicColor.convert(parsedFilterResult, basicColor.colorType as FilterToColorResultType).then((result) => {
      if (!result.color) {
        ErrorHandler.displayError(result.error?.message);
      } else {
        triggerResultHeaderAnimation();
        basicColor.setAndParseColorString(result.color, ErrorHandler);
        dispatch(addToHistory(parsedFilterResult, result.color, basicColor.colorType));
      }
    });
  };

  const convertToFilter = (basicColor: BasicColor) => {
    const { validCssColorString, colorType } = basicColor;
    const result = BasicColorToFilter.convert(validCssColorString, colorType, isSheenAddedState);
    if (!result.color) {
      ErrorHandler.displayError(result.error?.message);
    } else {
      triggerResultHeaderAnimation();
      dispatch(updateResultFilter(result.color));
      dispatch(addToHistory(validCssColorString, result.color, colorType));
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

  // important is used here as otherwise .MuiButton-contained class would always overwrite the backgroundColor
  const buttonClassOverwriteCss = {
    '&.Mui-disabled': {
      backgroundColor: '#7993b0 !important',
      color: 'white',
    },
    '&.MuiButton-contained': {
      backgroundColor: '#336abc',
    },
  };

  return (
    <Button sx={buttonClassOverwriteCss} disabled={!isValidState} variant="contained" color="primary" onClick={convert}>
      Convert
    </Button>
  );
}
