import copyIcon from './copy-button.svg';
import React from 'react';
import './copyButton.css';

type Props = {
  text: string;
  isDisplayed: boolean;
  textContainerRef: React.RefObject<HTMLDivElement>;
  marginLeft: number;
};

export default function CopyButton(props: Props) {
  const { isDisplayed, textContainerRef, marginLeft, text } = props;

  const [isHovered, setHovered] = React.useState(false);

  const onMouseEnterButton = () => {
    setHovered(true);
    if (textContainerRef.current) textContainerRef.current.style.color = 'black';
  };

  const onMouseLeaveButton = () => {
    setHovered(false);
    if (textContainerRef?.current) textContainerRef.current.style.color = '';
  };
  const onClickButton = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ opacity: isDisplayed || isHovered ? '1' : '0' }} className="copy-button-container">
      <img
        src={copyIcon}
        style={{ cursor: isDisplayed || isHovered ? 'pointer' : '', marginLeft }}
        className="copy-button-icon"
        alt=""
        onMouseEnter={onMouseEnterButton}
        onMouseLeave={onMouseLeaveButton}
        onClick={onClickButton}
        aria-hidden="true"
      />
    </div>
  );
}
