import CssFilterConverter from 'css-filter-converter';
import { COLOR_INPUT_ID, RESULT_ID } from '../consts/elementIds';

function Convert() {
  async function generate() {
    const textInputElement = document.getElementById(COLOR_INPUT_ID) as HTMLInputElement;
    const input = textInputElement.value;
    const result = await CssFilterConverter.filterToHsl(input);
    const resultElement = document.getElementById(RESULT_ID) as HTMLInputElement;
    resultElement.innerText = result.color as string;
  }

  return (
    <button id="convert-button" type="button" className="button" onClick={generate}>
      Convert
    </button>
  );
}

export default Convert;
