import { SIDE_COLUMN_WIDTH_PX } from '../../../../shared/consts/cssPropertyValues';
import ResultHeaderText from '../resultHeaderText/resultHeaderText';
import { ElementRef } from '../../../../shared/types/elementRef';
import OutputText from '../outputTextWrapper/outputText';
import CopyButton from '../copyButton/CopyButton';
import './historyText.css';
import CSS from 'csstype';
import React from 'react';

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
  const [isCopyIconDisplayed, setIsCopyIconDisplayed] = React.useState(false);

  const textContainerRef = React.useRef<HTMLDivElement>(null);

  const changeTextColor = (color: CSS.Property.Color): void => {
    if (historyRow.element) historyRow.element.style.color = color;
  };

  const onMouseLeaveText = (): void => {
    changeTextColor('grey');
    setIsCopyIconDisplayed(false);
  };

  const onMouseEnterText = (): void => {
    changeTextColor('black');
    setIsCopyIconDisplayed(true);
  };

  return (
    <OutputText float={float} width={SIDE_COLUMN_WIDTH_PX}>
      {isResult ? <ResultHeaderText prefixClasses={['history-padding-text']} /> : null}
      <div
        ref={textContainerRef}
        className="history-text"
        onMouseEnter={() => onMouseEnterText()}
        onMouseLeave={() => onMouseLeaveText()}
      >
        {text}
      </div>
      <CopyButton textContainerRef={textContainerRef} isDisplayed={isCopyIconDisplayed} />
    </OutputText>
  );
}
