import {
  updateActiveInputType,
  updateInputBasicColor,
  updateInputFilter,
  updateIsValid,
} from '../../../../state/input/actions';
import { BASIC_COLOR_TYPE_TO_CLASS } from '../convertButton/convert/basicColors/colorTypeToClass';
import { updateResultBasicColor, updateResultFilter } from '../../../../state/result/actions';
import { BasicColor } from '../convertButton/convert/basicColors/basicColor';
import { DEFAULT_VALUES } from '../../../../shared/consts/defaultValues';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { switchHistory } from '../../../../state/history/actions';
import { InputTypes } from '../../../../shared/consts/inputTypes';
import { store } from '../../../../state/store';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import './switchButton.css';

interface InputAndResultStrings {
  input: string;
  result: string;
  basicColorType: BasicColorTypes;
}

function SwitchButton() {
  const dispatch = useDispatch();

  const convertColor = (lastConversionColorType: BasicColorTypes, currentBasicColor: BasicColor, inputString: string) => {
    if (lastConversionColorType !== currentBasicColor.colorType) {
      const lastBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[lastConversionColorType](inputString);
      lastBasicColor.convertAndSetColorStringOnNewBasicColor(currentBasicColor);
    }
  };

  const switchToFilterInput = (
    inputString: string,
    resultString: string,
    basicColor: BasicColor,
    lastConversionColorType: BasicColorTypes,
  ): void => {
    basicColor.colorString = inputString;
    convertColor(lastConversionColorType, basicColor, inputString);
    dispatch(updateResultBasicColor(basicColor));
    dispatch(updateInputFilter(resultString || DEFAULT_VALUES.filter));
    dispatch(updateActiveInputType(InputTypes.FILTER));
  };

  const switchToBasicColorInput = (
    inputString: string,
    resultString: string,
    basicColor: BasicColor,
    lastConversionColorType: BasicColorTypes,
  ): void => {
    basicColor.colorString = resultString || basicColor.defaultColorString;
    convertColor(lastConversionColorType, basicColor, inputString);
    dispatch(updateInputBasicColor(basicColor));
    dispatch(updateResultFilter(inputString));
    dispatch(updateActiveInputType(InputTypes.BASIC_COLOR));
  };

  const getLastSuccessfulInputAndResultStrings = (): InputAndResultStrings => {
    const { history } = store.getState().history;
    if (history.length > 0) {
      const [{ input, result, basicColorType }] = history;
      return { input, result, basicColorType };
    }
    return { input: '', result: '', basicColorType: DEFAULT_VALUES.colorType };
  };

  const switchInputType = () => {
    const { input, result, basicColorType } = getLastSuccessfulInputAndResultStrings();
    const { basicColor: inputBasicColor, activeType: currentlyActiveInputType } = store.getState().input;
    if (currentlyActiveInputType === InputTypes.FILTER) {
      const { basicColor: resultBasicColor } = store.getState().result;
      switchToBasicColorInput(input, result, resultBasicColor, basicColorType);
    } else {
      switchToFilterInput(input, result, inputBasicColor, basicColorType);
    }
    dispatch(updateIsValid(true));
    dispatch(switchHistory());
  };

  return (
    <div id="switch-button-container">
      <Button id="switch-button" onClick={switchInputType}>
        ⇄
      </Button>
    </div>
  );
}

export default SwitchButton;
