import { ComponentsAsProp } from '../../../../shared/types/componentAsProp';
import CopyButton from '../copyButton/CopyButton';
import CSS from 'csstype';
import './outputText.css';
import React from 'react';

interface HistoryItem {
  element: HTMLElement | null;
}

type Props = {
  children: ComponentsAsProp;
  float?: CSS.Property.Float;
  width?: CSS.Property.Width;
  // WORK - may not need this
  overarchingContainerRef?: HistoryItem;
  isTextPresent?: boolean;
};

export default function OutputText(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, float, width, isTextPresent, overarchingContainerRef } = props;
  const [isCopyIconDisplayed, setIsCopyIconDisplayed] = React.useState(false);
  const textContainerRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      style={{ float, width }}
      className="output-text-item-content-centering"
      onMouseOver={() => setIsCopyIconDisplayed(true)}
      onMouseOut={() => setIsCopyIconDisplayed(false)}
      onFocus={() => {}}
      onBlur={() => {}}
    >
      <div ref={textContainerRef} className="output-text-item output-text-item-content-centering">
        {children}
        <CopyButton
          textContainerRef={{ element: textContainerRef.current }}
          isDisplayed={isCopyIconDisplayed && !!isTextPresent}
        />
      </div>
    </div>
  );
}

OutputText.defaultProps = {
  float: 'none',
  width: 'unset',
  isTextPresent: true,
  overarchingContainerRef: null,
};
