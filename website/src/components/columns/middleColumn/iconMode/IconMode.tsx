import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import React from 'react';
import './iconMode.css';

// WORK - refactor
export default function IconMode() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const svgContainerRef = React.useRef<SVGSVGElement>(null);
  const [xlinkHref, setXlinkHref] = React.useState('');

  function onFileLoad(event: ProgressEvent<FileReader>): void {
    if (event.target?.result) {
      const svgBase64 = event.target.result as string;
      setXlinkHref(svgBase64);
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
    <div id="icon-mode">
      <div>Upload svg image to test its appearance with filter</div>
      <div style={{ marginTop: 20 }}>
        <input
          onChange={(event) => uploadSVG(event)}
          multiple={false}
          ref={fileInputRef}
          type="file"
          accept=".svg"
          hidden
        />
        <Button
          onClick={() => fileInputRef?.current?.click()}
          style={{ backgroundColor: '#1160a2', height: 45, minWidth: 55 }}
          size="small"
          variant="contained"
          color="primary"
        >
          <UploadIcon />
        </Button>
        <svg ref={svgContainerRef} style={{ width: 20, height: 20, verticalAlign: 'middle', marginLeft: '20px' }}>
          <image style={{ width: 20, height: 20 }} xlinkHref={xlinkHref} />
        </svg>
      </div>
    </div>
  );
}
