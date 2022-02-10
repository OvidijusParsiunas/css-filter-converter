import ResultHeaderText from './resultHeaderText/resultHeaderText';
import { RootReducer } from '../../../state/rootReducer';
import OutputText from './outputTextWrapper/outputText';
import { useSelector } from 'react-redux';
import History from './history/history';
import './result.css';

export default function Result() {
  const resultTextState = useSelector<RootReducer, RootReducer['result']['text']>((state) => state.result.text);

  // The reason why history is a child of the result component is because it has to always safely be below the result text
  // which can usually get high with long filter results (especially when window width is narrow).
  return (
    <div id="result">
      <OutputText>
        <ResultHeaderText applyPrefixClasses={!!resultTextState} />
        <div id="result-text">{resultTextState}</div>
      </OutputText>
      <History />
    </div>
  );
}
