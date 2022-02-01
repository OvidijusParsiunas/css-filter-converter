import { BasicColorType } from '../types/colorTypeString';
import { ELEMENT_IDS } from '../consts/elementIds';
import { ColorToFilter } from './colorToFilter';
import Button from '@mui/material/Button';
import './convertButton.css';

interface ConvertionInputValues {
  input: string;
  colorType: BasicColorType;
}

function ConvertButton() {
  const setResult = (result: string): void => {
    const resultElement = document.getElementById(ELEMENT_IDS.RESULT_VALUE) as HTMLInputElement;
    resultElement.innerText = result;
  };

  const getInputValues = (): ConvertionInputValues => {
    const textInputElement = document.getElementById(ELEMENT_IDS.COLOR_INPUT_FIELD) as HTMLInputElement;
    const input = textInputElement.value;
    const colorTypeDropdownElement = document.getElementById(ELEMENT_IDS.COLOR_TYPE_DROPDOWN) as HTMLElement;
    const colorType = colorTypeDropdownElement.textContent as BasicColorType;
    return { input, colorType };
  };

  const convert = (): void => {
    const { input, colorType } = getInputValues();
    const resultColor = ColorToFilter.convert(input, colorType);
    setResult(resultColor);
  };

  return (
    <div id="convert-button-container">
      <Button variant="contained" color="primary" id="convert-button" onClick={convert}>
        Convert
      </Button>
    </div>
  );
}

export default ConvertButton;
