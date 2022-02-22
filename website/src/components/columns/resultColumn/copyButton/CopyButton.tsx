import { Tooltip } from '@mui/material';
import React from 'react';
import './copyButton.css';

type Props = {
  text: string;
  marginLeft: number;
  isDisplayed: boolean;
  textContainerRef: React.RefObject<HTMLDivElement>;
  iconPath: string;
  handleCopy: () => void;
  isTooltipDisplayed: boolean;
  iconImageSpecificClass: string;
};

export default function CopyButton(props: Props) {
  // prettier-ignore
  const {
    marginLeft, text, isDisplayed, textContainerRef, iconPath, handleCopy, isTooltipDisplayed, iconImageSpecificClass,
  } = props;

  const mouseEnterButton = () => {
    if (textContainerRef.current) textContainerRef.current.style.color = 'black';
  };

  const mouseLeaveButton = () => {
    if (textContainerRef?.current) textContainerRef.current.style.color = '';
  };

  const copy = () => {
    navigator.clipboard.writeText(text);
    handleCopy();
  };

  return (
    <div style={{ opacity: isDisplayed ? '1' : '0' }} className="copy-button-container">
      <Tooltip title="Copied!" placement="left" open={isTooltipDisplayed}>
        <img
          src={iconPath}
          style={{ cursor: isDisplayed ? 'pointer' : '', marginLeft }}
          className={`copy-button-icon ${iconImageSpecificClass}`}
          onMouseEnter={mouseEnterButton}
          onMouseLeave={mouseLeaveButton}
          onClick={copy}
          aria-hidden="true"
          alt=""
        />
      </Tooltip>
    </div>
  );
}
