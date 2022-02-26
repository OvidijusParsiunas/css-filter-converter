import { RootReducer } from '../../../../state/rootReducer';
import UploadIcon from '@mui/icons-material/Upload';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import './iconModePanel.css';
import React from 'react';

export default function IconModePanel() {
  const historyState = useSelector<RootReducer, RootReducer['history']['history']>((state) => state.history.history);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const svgContainerRef = React.useRef<SVGSVGElement>(null);

  const [iconBase64, setIconBase64] = React.useState('');

  const transitionAnimationLengthMs = 400;
  const transitionAnimationLengthString = `${transitionAnimationLengthMs / 1000}s`;
  const iconDimensionsPx = 34;

  function onFileLoad(event: ProgressEvent<FileReader>): void {
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
  }

  function uploadSVG(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = onFileLoad;
    reader.readAsDataURL(file);
  }

  return (
    <div id="icon-mode-panel">
      <div>Upload svg image to test its appearance using filter</div>
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
          style={{ transition: transitionAnimationLengthString }}
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
            transition: transitionAnimationLengthString,
            filter: historyState?.[0]?.result || '',
          }}
        >
          <image style={{ width: iconDimensionsPx, height: iconDimensionsPx }} xlinkHref={iconBase64} />
        </svg>
      </div>
    </div>
  );
}
