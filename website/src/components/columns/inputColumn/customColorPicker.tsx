import { HexBasicColor } from '../../convertButton/convert/basicColors/hex';
import { BasicColorTypes } from '../../../shared/consts/colorTypes';
import { Color, ColorPicker, toColor } from 'react-color-palette';
import { updateColor } from '../../../state/input/actions';
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

  // WORK - optimization opportunity for not having to convert RGB
  // WORK - default to 0 when invalid
  // WORK - set back to valid when using
  const setColor = (color: Color) => {
    if (inputState.color.colorType !== BasicColorTypes.HEX) {
      hexBasicColor.setAndParseColorString(color.hex.toLocaleUpperCase());
      hexBasicColor.convertAndSetColorStringOnNewBasicColor(inputState.color);
    } else {
      inputState.color.setAndParseColorString(color.hex.toLocaleUpperCase());
    }
    // this is used to force an update of this component and the input component
    dispatch(updateColor(inputState.color));
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

  return (
    <ClickOutsideListener callback={closeColorPickerPanel} callbackActivationCondition={isDisplayed}>
      <button
        id="color-picker-button"
        type="button"
        tabIndex={-1}
        style={{ backgroundColor: inputState.color.colorString }}
        onClick={(e) => displayColorPickerPanel(e)}
      >
        <div />
        {getColorPickerPanel()}
      </button>
    </ClickOutsideListener>
  );
}
