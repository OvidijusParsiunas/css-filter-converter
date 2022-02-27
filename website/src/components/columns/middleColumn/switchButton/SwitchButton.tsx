import {
  updateActiveInputType,
  updateInputBasicColor,
  updateInputFilter,
  updateIsValid,
} from '../../../../state/input/actions';
import { BASIC_COLOR_TYPE_TO_CLASS } from '../convertButton/convert/basicColors/colorTypeToClass';
import { updateResultBasicColor, updateResultFilter } from '../../../../state/result/actions';
import { ErrorHandler } from '../../../../shared/components/errorHander/ErrorHandler';
import { BasicColor } from '../convertButton/convert/basicColors/basicColor';
import { DEFAULT_VALUES } from '../../../../shared/consts/defaultValues';
import { Animations } from '../../../../shared/functionality/animations';
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

interface Props {
  inputColumnRef: React.RefObject<HTMLDivElement>;
  resultColumnRef: React.RefObject<HTMLDivElement>;
  iconModePanelRef: React.RefObject<HTMLDivElement>;
}

function SwitchButton(props: Props) {
  const { inputColumnRef, resultColumnRef, iconModePanelRef } = props;
  const dispatch = useDispatch();

  const convertNewColorStringTypeToCurrent = (
    lastConversionColorType: BasicColorTypes,
    currentBasicColor: BasicColor,
    newColorString: string,
  ): void => {
    const lastBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[lastConversionColorType]();
    lastBasicColor.setAndParseColorString(newColorString, ErrorHandler);
    lastBasicColor.convertAndSetColorStringOnNewBasicColor(currentBasicColor, ErrorHandler);
  };

  const generateDefaultBasicColor = (currentBasicColor: BasicColor, newColorString: string) => {
    if (!newColorString) {
      currentBasicColor.setAndParseColorString(currentBasicColor.defaultColorString, ErrorHandler);
    }
    const newBasicColor = new BASIC_COLOR_TYPE_TO_CLASS[BasicColorTypes.HEX]();
    currentBasicColor.convertAndSetColorStringOnNewBasicColor(newBasicColor, ErrorHandler);
    return newBasicColor;
  };

  const generateConvertedColor = (
    lastConversionColorType: BasicColorTypes,
    basicColor: BasicColor,
    newColorString: string,
  ): BasicColor => {
    if (basicColor.colorType === BasicColorTypes.KEYWORD) {
      return generateDefaultBasicColor(basicColor, newColorString);
    }
    if (lastConversionColorType !== basicColor.colorType) {
      convertNewColorStringTypeToCurrent(lastConversionColorType, basicColor, newColorString);
    } else {
      // if there are no results, the parser will fail, however we do want to display a blank colorString value as result
      const { history } = store.getState().history;
      basicColor.setAndParseColorString(newColorString, ErrorHandler, history.length > 0);
    }
    return basicColor;
  };

  // input and result strings are retrieved from the last successful conversion!
  const switchToFilterInput = (
    inputString: string,
    resultString: string,
    basicColor: BasicColor,
    lastConversionColorType: BasicColorTypes,
  ): void => {
    basicColor = generateConvertedColor(lastConversionColorType, basicColor, inputString);
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
    const newColorString = resultString || basicColor.defaultColorString;
    basicColor = generateConvertedColor(lastConversionColorType, basicColor, newColorString);
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

  const wrapAnimation = (intermediateCallback: () => void) => {
    const animationDurationMl = 200;
    Animations.fadeOutAndFadeIn(
      animationDurationMl,
      intermediateCallback,
      inputColumnRef.current as HTMLElement,
      resultColumnRef.current as HTMLElement,
      iconModePanelRef.current as HTMLElement,
    );
  };

  const switchInputType = () => {
    wrapAnimation(() => {
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
    });
  };

  return (
    <div id="switch-button-container">
      <Button id="switch-button" onClick={() => ErrorHandler.executeEvent(switchInputType)}>
        ⇄
      </Button>
    </div>
  );
}

export default SwitchButton;
