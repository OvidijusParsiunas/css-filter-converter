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
};

export default function CopyButton(props: Props) {
  const { marginLeft, text, isDisplayed, textContainerRef, iconPath, handleCopy, isTooltipDisplayed } = props;

  const [isHovered, setHovered] = React.useState(false);

  const mouseEnterButton = () => {
    setHovered(true);
    if (textContainerRef.current) textContainerRef.current.style.color = 'black';
  };

  const mouseLeaveButton = () => {
    setHovered(false);
    if (textContainerRef?.current) textContainerRef.current.style.color = '';
  };

  const copy = () => {
    navigator.clipboard.writeText(text);
    handleCopy();
  };

  return (
    <div style={{ opacity: isDisplayed || isHovered ? '1' : '0' }} className="copy-button-container">
      <Tooltip title="Copied!" placement="left" open={isTooltipDisplayed}>
        <img
          src={iconPath}
          style={{ cursor: isDisplayed || isHovered ? 'pointer' : '', marginLeft }}
          className="copy-button-icon"
          alt=""
          onMouseEnter={mouseEnterButton}
          onMouseLeave={mouseLeaveButton}
          onClick={copy}
          aria-hidden="true"
        />
      </Tooltip>
    </div>
  );
}
