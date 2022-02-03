import { BasicColorTypes } from '../../shared/consts/colorTypes';
import { RootReducer } from '../../state/reducers/rootReducer';
import { ElementIds } from '../../shared/consts/elementIds';
import { ColorToFilter } from './colorToFilter';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import './convertButton.css';

interface ConvertionInputValues {
  input: string;
  colorType: BasicColorTypes;
}

function ConvertButton() {
  const isColorInputValid = useSelector<RootReducer, RootReducer['colorInput']['isValid']>(
    (state) => state.colorInput.isValid,
  );

  const setResult = (result: string): void => {
    const resultElement = document.getElementById(ElementIds.RESULT_VALUE) as HTMLInputElement;
    resultElement.innerText = result;
  };

  const getInputValues = (): ConvertionInputValues => {
    const textInputElement = document.getElementById(ElementIds.COLOR_INPUT_FIELD) as HTMLInputElement;
    const input = textInputElement.value;
    const colorTypeDropdownElement = document.getElementById(ElementIds.COLOR_TYPE_DROPDOWN) as HTMLElement;
    const colorType = colorTypeDropdownElement.textContent as BasicColorTypes;
    return { input, colorType };
  };

  const convert = (): void => {
    const { input, colorType } = getInputValues();
    const resultColor = ColorToFilter.convert(input, colorType);
    setResult(resultColor);
  };

  return (
    <div id="convert-button-container">
      <Button disabled={!isColorInputValid} variant="contained" color="primary" id="convert-button" onClick={convert}>
        Convert
      </Button>
    </div>
  );
}

export default ConvertButton;