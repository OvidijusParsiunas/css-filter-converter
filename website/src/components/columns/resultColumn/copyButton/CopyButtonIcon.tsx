import { createTheme, ThemeProvider, Tooltip } from '@mui/material';
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

  const greenToolkitTheme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: 'green',
          },
        },
      },
    },
  });

  return (
    <div style={{ opacity: isDisplayed ? 1 : 0 }} className="copy-button-icon-container">
      <ThemeProvider theme={greenToolkitTheme}>
        <Tooltip title="Copied!" placement="left" open={isTooltipDisplayed}>
          <img
            src={iconImagePath}
            style={{ cursor: isDisplayed ? 'pointer' : '', marginLeft }}
            className={`copy-button-icon ${iconImageSpecificClass}`}
            alt=""
          />
        </Tooltip>
      </ThemeProvider>
    </div>
  );
}
