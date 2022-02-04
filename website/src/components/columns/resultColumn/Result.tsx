import { RootReducer } from '../../../shared/types/state/rootReducer';
import { useSelector } from 'react-redux';
import './result.css';

export default function Result() {
  const resultText = useSelector<RootReducer, RootReducer['result']['text']>((state) => state.result.text);

  return (
    <div id="result-container">
      <div id="result-header">
        <div>Result:</div>
      </div>
      <div id="result-value-field">
        <div>{resultText}</div>
      </div>
    </div>
  );
}
