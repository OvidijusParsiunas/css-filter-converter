import OutputText from './history/outputTextWrapper/outputText';
import { RootReducer } from '../../../state/rootReducer';
import ResultHeaderText from './resultHeaderText';
import { useSelector } from 'react-redux';
import History from './history/history';
import './result.css';

export default function Result() {
  const resultText = useSelector<RootReducer, RootReducer['result']['text']>((state) => state.result.text);

  // The reason why history is a child of the result component is because it has to always safely be below the result text
  // which can usually get high with long filter results (especially when window width is narrow).
  return (
    <div id="result">
      <OutputText>
        <ResultHeaderText applyClasses={!!resultText} />
        <div>{resultText}</div>
      </OutputText>
      <History />
    </div>
  );
}
