import { ColorPicker, useColor } from 'react-color-palette';
import { store } from '../../../state/store';
import './customColorPicker.css';
import React from 'react';

export default function CustomColorPicker() {
  const [color, setColor] = useColor('hex', store.getState().colorInput.text);
  const [isDislayed, setIsDisplayed] = React.useState(false);

  // prettier-ignore
  const getColorPicker = () => (
    isDislayed
      ? (
        <div id="color-picker-panel">
          <ColorPicker width={250} height={150} color={color} onChange={setColor} hideHSV hideRGB hideHEX />
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
      style={{ backgroundColor: color.hex }}
      onClick={(e) => displayColorPicker(e)}
    >
      <div />
      {getColorPicker()}
    </button>
  );
}
