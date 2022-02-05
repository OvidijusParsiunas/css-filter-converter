import { RootReducer } from '../../state/rootReducer';
import { useSelector } from 'react-redux';

export default function History() {
  const resultHistory = useSelector<RootReducer, RootReducer['history']['result']>((state) => state.history.result);

  const listItems = resultHistory.map((result) => (
    <div key={result} style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'inline-block', verticalAlign: 'top', color: 'white' }}>Result:</div>
      <div style={{ paddingLeft: '10px' }}>{result}</div>
    </div>
  ));

  return <div style={{ marginTop: '50px', width: '80%', display: 'inline-block' }}>{listItems}</div>;
}
