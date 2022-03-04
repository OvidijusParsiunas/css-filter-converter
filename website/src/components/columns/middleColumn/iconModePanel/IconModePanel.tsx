import { RootReducer } from '../../../../state/rootReducer';
import { IconModePanelUtil } from './iconModePanelUtil';
import UploadIcon from '@mui/icons-material/Upload';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import './iconModePanel.css';
import React from 'react';

const IconModePanel = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  const historyState = useSelector<RootReducer, RootReducer['history']['history']>((state) => state.history.history);
  const isOnModeOnState = useSelector<RootReducer, RootReducer['settings']['isIconModeOn']>(
    (state) => state.settings.isIconModeOn,
  );
  const activeInputTypeState = useSelector<RootReducer, RootReducer['input']['activeType']>(
    (state) => state.input.activeType,
  );
  const isErrorDisplayedState = useSelector<RootReducer, RootReducer['error']['isErrorDisplayed']>(
    (state) => state.error.isErrorDisplayed,
  );

  const panelRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const svgContainerRef = React.useRef<SVGSVGElement>(null);

  const [iconBase64, setIconBase64] = React.useState('');

  const fadeAnimationLengthString = '0.7s';
  const firstFileTransitionAnimationLengthMs = 400;
  const firstFiletransitionAnimationLengthString = `${firstFileTransitionAnimationLengthMs / 1000}s`;

  const iconDimensionsPx = 35;

  const initiateFirstFileTransitionAnimation = () => {
    if (panelRef.current) panelRef.current.style.transition = firstFiletransitionAnimationLengthString;
    setTimeout(() => {
      if (svgContainerRef.current) svgContainerRef.current.style.opacity = '1';
      setTimeout(() => {
        if (svgContainerRef.current) svgContainerRef.current.style.transition = '';
        if (panelRef.current) panelRef.current.style.transition = fadeAnimationLengthString;
      }, firstFileTransitionAnimationLengthMs);
    }, firstFileTransitionAnimationLengthMs);
  };

  const onFileLoad = (event: ProgressEvent<FileReader>): void => {
    if (event.target?.result) {
      const svgBase64 = event.target.result as string;
      setIconBase64(svgBase64);
      if (!iconBase64) initiateFirstFileTransitionAnimation();
    }
  };

  const uploadSVG = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = onFileLoad;
    reader.readAsDataURL(file);
  };

  const isDisplayed = () => IconModePanelUtil.isIsDisplayed(activeInputTypeState) && !isErrorDisplayedState;

  const getDisplayStyle = () => (isDisplayed() ? 'block' : 'none');

  // adding ref to outer element to not augment the panel transition and opacity styles in other components
  return (
    <div ref={ref}>
      <div
        id="icon-mode-panel"
        ref={panelRef}
        style={{
          display: getDisplayStyle(),
          opacity: isOnModeOnState ? 1 : 0,
          width: iconBase64 ? 141 : 114,
          transition: fadeAnimationLengthString,
        }}
      >
        <div id="icon-mode-panel-description-text">Icon Mode</div>
        <div id="icon-mode-icons-container">
          <input
            ref={fileInputRef}
            onChange={(event) => uploadSVG(event)}
            multiple={false}
            type="file"
            accept=".svg"
            hidden
          />
          <Button
            id="icon-mode-upload-icon-button"
            style={{ transition: firstFiletransitionAnimationLengthString }}
            onClick={() => fileInputRef?.current?.click()}
            size="small"
            variant="contained"
            color="primary"
          >
            <UploadIcon />
          </Button>
          <svg
            id="icon-mode-user-icon-container"
            ref={svgContainerRef}
            style={{
              width: iconBase64 ? iconDimensionsPx : 0,
              height: iconDimensionsPx,
              marginLeft: iconBase64 ? 20 : 0,
              transition: firstFiletransitionAnimationLengthString,
              filter: historyState?.[0]?.result || '',
            }}
          >
            <image style={{ width: iconDimensionsPx, height: iconDimensionsPx }} xlinkHref={iconBase64} />
          </svg>
        </div>
      </div>
    </div>
  );
});

export default IconModePanel;
