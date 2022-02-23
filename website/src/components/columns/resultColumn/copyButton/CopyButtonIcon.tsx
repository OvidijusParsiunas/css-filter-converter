import { Tooltip } from '@mui/material';
import './copyButtonIcon.css';

type Props = {
  marginLeft: number;
  isDisplayed: boolean;
  iconImagePath: string;
  isTooltipDisplayed: boolean;
  iconImageSpecificClass: string;
};

export default function CopyButtonIcon(props: Props) {
  const { marginLeft, isDisplayed, iconImagePath, isTooltipDisplayed, iconImageSpecificClass } = props;

  return (
    <div style={{ opacity: isDisplayed ? 1 : 0 }} className="copy-button-icon-container">
      <Tooltip title="Copied!" placement="left" open={isTooltipDisplayed}>
        <img
          src={iconImagePath}
          style={{ cursor: isDisplayed ? 'pointer' : '', marginLeft }}
          className={`copy-button-icon ${iconImageSpecificClass}`}
          alt=""
        />
      </Tooltip>
    </div>
  );
}
