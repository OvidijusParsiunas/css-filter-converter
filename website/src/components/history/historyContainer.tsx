import { HistoryElement, HistoryState } from '../../state/history/type';
import { RootReducer } from '../../state/rootReducer';
import { useSelector } from 'react-redux';
import CSS from 'csstype';
import './history.css';

export default function HistoryContainer() {
  const historyState = useSelector<RootReducer, RootReducer['history']>((state) => state.history);

  function getColumnResult(historyElement: HistoryElement, float: CSS.Property.Float): JSX.Element {
    return (
      <div
        style={{
          float,
          position: 'relative',
          width: 'calc(50% - 52px)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
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
          <div style={{ color: 'grey' }}>{historyElement.text}</div>
        </div>
      </div>
    );
  }

  function generateHistoryItems(state: HistoryState): JSX.Element[] {
    return state.input.map((historyElement, index) => (
      <div key={historyElement.id} style={{ marginTop: '10px', width: '100%' }}>
        {getColumnResult(historyElement, 'left')}
        {getColumnResult(historyState.result[index], 'right')}
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
