import { ElementRef } from '../../../../shared/types/elementRef';
import copyIcon from './copy-svgrepo-com.svg';
import React from 'react';
import './copyButton.css';

type Props = {
  isDisplayed: boolean;
  textContainerRef: ElementRef | undefined;
};

export default function CopyButton(props: Props) {
  const { isDisplayed, textContainerRef } = props;

  const [isHovered, setHovered] = React.useState(false);

  const onMouseEnterButton = () => {
    setHovered(true);
    if (textContainerRef?.element) textContainerRef.element.style.color = 'black';
  };

  const onMouseLeaveButton = () => {
    setHovered(false);
    if (textContainerRef?.element) textContainerRef.element.style.color = '';
  };

  return (
    <div style={{ opacity: isDisplayed || isHovered ? '1' : '0' }} className="copy-button-container">
      <img
        src={copyIcon}
        style={{ cursor: isDisplayed || isHovered ? 'pointer' : '' }}
        className="copy-button-icon"
        alt=""
        onMouseEnter={() => onMouseEnterButton()}
        onMouseLeave={() => onMouseLeaveButton()}
      />
    </div>
  );
}
