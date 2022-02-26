import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import React from 'react';
import './iconMode.css';

export default function IconMode() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const svgContainerRef = React.useRef<SVGSVGElement>(null);

  const [iconBase64, setIconBase64] = React.useState('');

  const transitionAnimationLengthMs = 400;
  const transitionAnimationLengthString = `${transitionAnimationLengthMs / 1000}s`;
  const iconDimensionsPx = 32;

  function onFileLoad(event: ProgressEvent<FileReader>): void {
    if (event.target?.result) {
      const svgBase64 = event.target.result as string;
      setIconBase64(svgBase64);
      setTimeout(() => {
        if (svgContainerRef.current) svgContainerRef.current.style.opacity = '1';
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
      <div>Upload svg image to test its appearance with filter</div>
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
          }}
        >
          <image style={{ width: iconDimensionsPx, height: iconDimensionsPx }} xlinkHref={iconBase64} />
        </svg>
      </div>
    </div>
  );
}
