import { ELEMENT_IDS } from '../consts/elementIds';
import './result.css';

function Result() {
  return (
    <div id="result-container">
      <div id="result-header">
        <div>Result:</div>
      </div>
      <div id="result-value-field">
        <div id={ELEMENT_IDS.RESULT_VALUE} />
      </div>
    </div>
  );
}

export default Result;
