import { HexBasicColor } from '../../convertButton/convert/basicColors/hex';
import { BasicColorTypes } from '../../../shared/consts/colorTypes';
import { Color, ColorPicker, toColor } from 'react-color-palette';
import { updateColor } from '../../../state/colorInput/actions';
import { RootReducer } from '../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import './customColorPicker.css';
import React from 'react';

export default function CustomColorPicker() {
  const dispatch = useDispatch();
  const hexBasicColor = new HexBasicColor();

  const colorInput = useSelector<RootReducer, RootReducer['colorInput']>((state) => state.colorInput);

  // WORK - global state
  // WORK - close the window when clicked anywhere on the screen
  // or pressing enter or escape on the keyboard
  const [isDislayed, setIsDisplayed] = React.useState(false);

  // WORK - optimization opportunity for not having to convert RGB
  // WORK - default to 0 when invalid
  // WORK - set back to valid when using
  const setColor = (color: Color) => {
    if (colorInput.color.colorType !== BasicColorTypes.HEX) {
      hexBasicColor.setAndParseColorString(color.hex.toLocaleUpperCase());
      hexBasicColor.convertAndSetColorStringOnNewBasicColor(colorInput.color);
    } else {
      colorInput.color.setAndParseColorString(color.hex.toLocaleUpperCase());
    }
    // this is used to force an update of this component and the input component
    dispatch(updateColor(colorInput.color));
  };

  const getCurrentColor = (): string => {
    if (colorInput.color.colorType !== BasicColorTypes.HEX) {
      colorInput.color.convertAndSetColorStringOnNewBasicColor(hexBasicColor);
      return hexBasicColor.colorString;
    }
    return colorInput.color.colorString;
  };

  // prettier-ignore
  const getColorPicker = () => (
    isDislayed
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

  const displayColorPicker = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if ((event.target as HTMLElement).tagName === 'BUTTON') {
      setIsDisplayed(!isDislayed);
    }
  };

  return (
    <button
      id="color-picker-button"
      type="button"
      style={{ backgroundColor: colorInput.color.colorString }}
      onClick={(e) => displayColorPicker(e)}
    >
      <div />
      {getColorPicker()}
    </button>
  );
}
