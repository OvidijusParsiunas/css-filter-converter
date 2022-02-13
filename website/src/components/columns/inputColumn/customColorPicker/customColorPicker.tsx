import { HexBasicColor } from '../../middleColumn/convertButton/convert/basicColors/hex';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { Color, ColorPicker, toColor } from 'react-color-palette';
import { updateIsValid } from '../../../../state/input/actions';
import { RootReducer } from '../../../../state/rootReducer';
import ClickOutsideListener from '../ClickOutsideListener';
import { useDispatch, useSelector } from 'react-redux';
import './customColorPicker.css';
import React from 'react';

export default function CustomColorPicker() {
  const dispatch = useDispatch();
  const hexBasicColor = new HexBasicColor();

  const inputState = useSelector<RootReducer, RootReducer['input']>((state) => state.input);

  const [isDisplayed, setIsDisplayed] = React.useState(false);

  const setColor = (color: Color) => {
    if (inputState.basicColor.colorType === BasicColorTypes.HEX) {
      inputState.basicColor.setAndParseColorString(color.hex.toLocaleUpperCase());
    } else if (inputState.basicColor.colorType === BasicColorTypes.RGB) {
      const { r, g, b } = color.rgb;
      inputState.basicColor.setAndParseColorString(`rgb(${r}, ${g}, ${b})`);
    } else {
      hexBasicColor.setAndParseColorString(color.hex.toLocaleUpperCase());
      hexBasicColor.convertAndSetColorStringOnNewBasicColor(inputState.basicColor);
    }
    // as well as setting the input isValid to true, this is additionally used to force an update of
    // this component and the input component
    dispatch(updateIsValid(true));
  };

  const getCurrentColor = (): string => {
    if (inputState.basicColor.colorType !== BasicColorTypes.HEX) {
      inputState.basicColor.convertAndSetColorStringOnNewBasicColor(hexBasicColor);
      return hexBasicColor.colorString;
    }
    return inputState.basicColor.colorString;
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

  const toggleColorPickerPanel = () => setIsDisplayed(!isDisplayed);

  const closeColorPickerPanel = () => {
    if (isDisplayed) {
      setIsDisplayed(false);
    }
  };

  const getButtonColor = () => (inputState.isValid ? inputState.basicColor.colorString : '#000000');

  // WORK - color pointer is closing on mouse up
  return (
    <ClickOutsideListener callback={closeColorPickerPanel} callbackActivationCondition={isDisplayed}>
      {/* the reason why this is a div and not a button is because if the user clicks on it with a left mouse key,
        onClick will be called again if they click they proceed to hit the Enter keyboard key */}
      <div
        id="color-picker-button"
        aria-hidden="true"
        style={{ backgroundColor: getButtonColor() }}
        onClick={toggleColorPickerPanel}
      >
        <div />
        {getColorPickerPanel()}
      </div>
    </ClickOutsideListener>
  );
}
