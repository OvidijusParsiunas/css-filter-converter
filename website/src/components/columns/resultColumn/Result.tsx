import OutputText from './history/outputTextWrapper/outputText';
import { RootReducer } from '../../../state/rootReducer';
import { useSelector } from 'react-redux';
import History from './history/history';
import './result.css';

export default function Result() {
  const resultText = useSelector<RootReducer, RootReducer['result']['text']>((state) => state.result.text);

  // WORK 1 - move this to another component
  function getHeaderText(): JSX.Element {
    return <div className={resultText ? 'result-header-text' : ''}>Result:</div>;
  }

  // The reason why history is a child of the result component is because it has to always safely be below the result text
  // which can usually get high with long filter results (especially when window width is narrow).
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
