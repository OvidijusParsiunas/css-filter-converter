import { SIDE_COLUMN_WIDTH_PX } from '../../../../shared/consts/cssPropertyValues';
import ResultHeaderText from '../resultHeaderText/resultHeaderText';
import { ElementRef } from '../../../../shared/types/elementRef';
import CopyButtonWrapper from '../copyButton/CopyButtonWrapper';
import OutputText from '../outputTextWrapper/outputText';
import './historyText.css';
import CSS from 'csstype';

interface Props {
  float: CSS.Property.Float;
  historyRow: ElementRef;
  isResult: boolean;
  text: string;
}

// the reason why input and result history are in the same component and are placed in the same rows alongside
// each other is because input row height needs to be exactly the same as the result height which can vary
// with filter.
export default function HistoryText(props: Props) {
  const { float, historyRow, isResult, text } = props;

  return (
    <OutputText float={float} width={SIDE_COLUMN_WIDTH_PX}>
      {isResult ? <ResultHeaderText prefixClasses={['history-padding-text']} /> : null}
      <CopyButtonWrapper text={text} textToHighlight={historyRow} />
    </OutputText>
  );
}
