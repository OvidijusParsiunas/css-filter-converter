import { ElementIds } from '../../../shared/consts/elementIds';
import './result.css';

function Result() {
  return (
    <div id="result-container">
      <div id="result-header">
        <div>Result:</div>
      </div>
      <div id="result-value-field">
        <div id={ElementIds.RESULT_VALUE} />
      </div>
    </div>
  );
}

export default Result;
