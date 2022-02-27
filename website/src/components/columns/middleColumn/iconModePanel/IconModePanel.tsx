import { RootReducer } from '../../../../state/rootReducer';
import { IconModePanelUtils } from './iconModePanelUtils';
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

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const svgContainerRef = React.useRef<SVGSVGElement>(null);

  const [iconBase64, setIconBase64] = React.useState('');

  const transitionAnimationLengthMs = 400;
  const transitionAnimationLengthString = `${transitionAnimationLengthMs / 1000}s`;
  const iconDimensionsPx = 35;

  const onFileLoad = (event: ProgressEvent<FileReader>): void => {
    if (event.target?.result) {
      const svgBase64 = event.target.result as string;
      setIconBase64(svgBase64);
      setTimeout(() => {
        if (svgContainerRef.current) svgContainerRef.current.style.opacity = '1';
        setTimeout(() => {
          if (svgContainerRef.current) svgContainerRef.current.style.transition = '';
        }, transitionAnimationLengthMs);
      }, transitionAnimationLengthMs);
    }
  };

  const uploadSVG = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = onFileLoad;
    reader.readAsDataURL(file);
  };

  const getDisplayStyle = () => (IconModePanelUtils.isIsDisplayed(activeInputTypeState) ? 'block' : 'none');

  return (
    <div id="icon-mode-panel" ref={ref} style={{ display: getDisplayStyle() }}>
      <div id="icon-mode-panel-description-text">Upload svg image to test its appearance using result filter</div>
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
          style={{
            transition: transitionAnimationLengthString,
          }}
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
            marginLeft: iconBase64 ? 24 : 0,
            transition: transitionAnimationLengthString,
            filter: historyState?.[0]?.result || '',
          }}
        >
          <image style={{ width: iconDimensionsPx, height: iconDimensionsPx }} xlinkHref={iconBase64} />
        </svg>
      </div>
      <div className="icon-mode-panel-cover" style={{ left: isOnModeOnState ? '-100%' : '-49%' }} />
      <div className="icon-mode-panel-cover" style={{ left: isOnModeOnState ? '100%' : '49%' }} />
    </div>
  );
});

export default IconModePanel;
