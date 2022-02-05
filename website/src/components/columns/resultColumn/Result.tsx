import { RootReducer } from '../../../state/rootReducer';
import History from '../../history/History';
import { useSelector } from 'react-redux';
import './result.css';

export default function Result() {
  const resultText = useSelector<RootReducer, RootReducer['result']['text']>((state) => state.result.text);

  const text = resultText ? (
    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'inline-block', verticalAlign: 'top' }}>Result:</div>
      <div style={{ paddingLeft: '10px' }}>{resultText}</div>
    </div>
  ) : (
    <div>Result</div>
  );

  return (
    <div>
      <div id="result">{text}</div>
      <History />
    </div>
  );
}
