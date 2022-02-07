import { RootReducer } from '../../../state/rootReducer';
import OutputText from '../reactChildren/outputText';
import History from '../../history/history';
import { useSelector } from 'react-redux';
import './result.css';

export default function Result() {
  const resultText = useSelector<RootReducer, RootReducer['result']['text']>((state) => state.result.text);

  // WORK 1 - move this to another component
  function getHeaderText(): JSX.Element {
    return <div className={resultText ? 'result-header-text' : ''}>Result:</div>;
  }

  return (
    <div id="result">
      <OutputText>
        {getHeaderText()}
        <div>{resultText}</div>
      </OutputText>
      <History />
    </div>
  );
}
