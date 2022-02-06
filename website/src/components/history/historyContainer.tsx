import { HistoryState } from '../../state/history/type';
import { RootReducer } from '../../state/rootReducer';
import { useSelector } from 'react-redux';
import './history.css';

export default function HistoryContainer() {
  const historyState = useSelector<RootReducer, RootReducer['history']>((state) => state.history);

  function generateHistoryItems(state: HistoryState): JSX.Element[] {
    return state.input.map((historyElement, index) => (
      <div key={historyElement.id} style={{ marginTop: '10px' }}>
        <div style={{ float: 'left', position: 'relative', width: '50%' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '80%' }}>
              <div
                style={{
                  display: 'inline-block',
                  verticalAlign: 'top',
                  color: 'white',
                  userSelect: 'none',
                  marginRight: '10px',
                }}
              >
                Result:
              </div>
              <div style={{ color: 'red' }}>{historyElement.text}</div>
            </div>
          </div>
        </div>
        <div style={{ float: 'right', position: 'relative', width: '50%' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '80%' }}>
              <div
                style={{
                  display: 'inline-block',
                  verticalAlign: 'top',
                  color: 'white',
                  userSelect: 'none',
                  marginRight: '10px',
                }}
              >
                Result:
              </div>
              <div style={{ color: 'grey' }}>{historyState.result[index].text}</div>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div style={{ width: '100vw', position: 'absolute', height: '100%', left: 'calc(-50vw - 52px)' }}>
      <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexFlow: 'column wrap',
            overflow: 'hidden',
            marginTop: '50px',
            width: '100%',
            height: 'calc(50vh - 65px)',
          }}
        >
          {generateHistoryItems(historyState)}
        </div>
      </div>
    </div>
  );
}
