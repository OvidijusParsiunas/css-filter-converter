import { ComponentAsProp } from '../../../../shared/types/componentAsProp';
import ResultHeaderText from '../resultHeaderText/resultHeaderText';
import { RootReducer } from '../../../../state/rootReducer';
import OutputText from '../outputTextWrapper/outputText';
import { useSelector } from 'react-redux';

type Props = {
  children: ComponentAsProp;
};

export default function FilterColorResult(props: Props) {
  const { children } = props;

  const resultTextState = useSelector<RootReducer, RootReducer['result']['filter']>((state) => state.result.filter);

  return (
    <div>
      <OutputText>
        <ResultHeaderText applyPrefixClasses={!!resultTextState} />
        <div className="result-string-text">{resultTextState}</div>
      </OutputText>
      {children}
    </div>
  );
}
