import ResultHeaderText from '../resultHeaderText/resultHeaderText';
import { RootReducer } from '../../../../state/rootReducer';
import OutputText from '../outputTextWrapper/outputText';
import { useSelector } from 'react-redux';
import History from '../history/history';

export default function FilterColorResult() {
  const resultTextState = useSelector<RootReducer, RootReducer['result']['text']>((state) => state.result.text);

  return (
    <div>
      <OutputText>
        <ResultHeaderText applyPrefixClasses={!!resultTextState} />
        <div className="result-text">{resultTextState}</div>
      </OutputText>
      <History />
    </div>
  );
}
