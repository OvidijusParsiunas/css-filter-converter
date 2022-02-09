import { HexBasicColor } from '../../convertButton/convert/basicColors/hex';
import { BasicColorTypes } from '../../../shared/consts/colorTypes';
import { Color, ColorPicker, toColor } from 'react-color-palette';
import { updateIsValid } from '../../../state/input/actions';
import ClickOutsideListener from './clickOutsideListener';
import { RootReducer } from '../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import './customColorPicker.css';
import React from 'react';

export default function CustomColorPicker() {
  const dispatch = useDispatch();
  const hexBasicColor = new HexBasicColor();

  const inputState = useSelector<RootReducer, RootReducer['input']>((state) => state.input);

  const [isDisplayed, setIsDisplayed] = React.useState(false);

  const setColor = (color: Color) => {
    if (inputState.color.colorType === BasicColorTypes.HEX) {
      inputState.color.setAndParseColorString(color.hex.toLocaleUpperCase());
    } else if (inputState.color.colorType === BasicColorTypes.RGB) {
      const { r, g, b } = color.rgb;
      inputState.color.setAndParseColorString(`rgb(${r}, ${g}, ${b})`);
    } else {
      hexBasicColor.setAndParseColorString(color.hex.toLocaleUpperCase());
      hexBasicColor.convertAndSetColorStringOnNewBasicColor(inputState.color);
    }
    // as well as setting the input isValid to true, this is additionally used to force an update of
    // this component and the input component
    dispatch(updateIsValid(true));
  };

  const getCurrentColor = (): string => {
    if (inputState.color.colorType !== BasicColorTypes.HEX) {
      inputState.color.convertAndSetColorStringOnNewBasicColor(hexBasicColor);
      return hexBasicColor.colorString;
    }
    return inputState.color.colorString;
  };

  // prettier-ignore
  const getColorPickerPanel = () => (
    isDisplayed
      ? (
        <div id="color-picker-panel">
          {/* the reason why all text opts are hidden is because the picker does not support hsl */}
          <ColorPicker
            width={250}
            height={150}
            color={toColor('hex', getCurrentColor())}
            onChange={(e) => setColor(e)}
            hideHSV
            hideRGB
            hideHEX
          />
        </div>
      ) : null);

  const displayColorPickerPanel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // if not key down - Enter
    if ((event.nativeEvent as PointerEvent).pointerId !== -1 && (event.target as HTMLElement).tagName === 'BUTTON') {
      setIsDisplayed(true);
    }
  };

  const closeColorPickerPanel = () => {
    if (isDisplayed) {
      setIsDisplayed(false);
    }
  };

  const getButtonColor = () => (inputState.isValid ? inputState.color.colorString : '#000000');

  return (
    <ClickOutsideListener callback={closeColorPickerPanel} callbackActivationCondition={isDisplayed}>
      <button
        id="color-picker-button"
        type="button"
        tabIndex={-1}
        style={{ backgroundColor: getButtonColor() }}
        onClick={(e) => displayColorPickerPanel(e)}
      >
        <div />
        {getColorPickerPanel()}
      </button>
    </ClickOutsideListener>
  );
}
