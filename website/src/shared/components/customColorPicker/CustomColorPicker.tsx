import { BasicColor } from '../../../components/columns/middleColumn/convertButton/convert/basicColors/basicColor';
import { HexBasicColor } from '../../../components/columns/middleColumn/convertButton/convert/basicColors/hex';
import ClickOutsideListener from '../../../components/columns/inputColumn/ClickOutsideListener';
import { Color, ColorPicker, toColor } from 'react-color-palette';
import { updateIsValid } from '../../../state/input/actions';
import { ErrorHandler } from '../errorHander/ErrorHandler';
import { BasicColorTypes } from '../../consts/colorTypes';
import { useDispatch } from 'react-redux';
import './customColorPicker.css';
import React from 'react';

type Props = {
  state: {
    basicColor: BasicColor;
    isValid: boolean;
  };
  isSelectable?: boolean;
};

export default function CustomColorPicker(props: Props) {
  const {
    state: { basicColor, isValid },
    isSelectable,
  } = props;
  const dispatch = useDispatch();
  const hexBasicColor = new HexBasicColor();

  const buttonRef = React.useRef<HTMLDivElement>(null);

  const [isDisplayed, setIsDisplayed] = React.useState(false);

  const setColor = (color: Color) => {
    if (basicColor.colorType === BasicColorTypes.HEX) {
      basicColor.setAndParseColorString(color.hex.toLocaleUpperCase(), ErrorHandler);
    } else if (basicColor.colorType === BasicColorTypes.RGB) {
      const { r, g, b } = color.rgb;
      basicColor.setAndParseColorString(`rgb(${r}, ${g}, ${b})`, ErrorHandler);
    } else {
      hexBasicColor.setAndParseColorString(color.hex.toLocaleUpperCase(), ErrorHandler);
      hexBasicColor.convertAndSetColorStringOnNewBasicColor(basicColor, ErrorHandler);
    }
    // as well as setting the input isValid to true, this is additionally used to force an update of
    // this component and the input component
    dispatch(updateIsValid(true));
  };

  const getCurrentColor = (): string => {
    if (basicColor.colorType !== BasicColorTypes.HEX) {
      basicColor.convertAndSetColorStringOnNewBasicColor(hexBasicColor, ErrorHandler);
      return hexBasicColor.validCssColorString;
    }
    return basicColor.validCssColorString;
  };

  // prettier-ignore
  const getColorPickerPanel = () => (
    isDisplayed
      ? (
        <div id="color-picker-panel">
          {/* the reason why all the color options are hidden is because ColorPicker does not support hsl format */}
          {/* if color picker performance suffers - set the onChange handler to {setColor} */}
          <ColorPicker
            width={250}
            height={150}
            color={toColor('hex', getCurrentColor())}
            onChange={(e) => ErrorHandler.executeEvent(setColor.bind(null, e))}
            hideHSV
            hideRGB
            hideHEX
          />
        </div>
      ) : null);

  const toggleColorPickerPanel = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === buttonRef.current) setIsDisplayed(!isDisplayed);
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: isValid ? basicColor.validCssColorString : '#000000',
    pointerEvents: isSelectable ? 'auto' : 'none',
  };

  const closeColorPickerPanel = () => {
    if (isDisplayed) setIsDisplayed(false);
  };

  return (
    <ClickOutsideListener callback={closeColorPickerPanel} callbackActivationCondition={isDisplayed}>
      {/* the reason why this is a div and not a button is because if the user clicks on it with a left mouse key,
        onClick will be called again if they click they proceed to hit the Enter keyboard key */}
      <div
        id="color-picker-button"
        ref={buttonRef}
        aria-hidden="true"
        style={buttonStyle}
        onClick={(e) => ErrorHandler.executeEvent(toggleColorPickerPanel.bind(null, e))}
      >
        <div />
        {getColorPickerPanel()}
      </div>
    </ClickOutsideListener>
  );
}

CustomColorPicker.defaultProps = {
  isSelectable: true,
};
