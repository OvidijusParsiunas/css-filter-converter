import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import UploadSVG from './uploadSVG';
import React from 'react';
import './iconMode.css';

// WORK - refactor
export default function IconMode() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div id="icon-mode">
      <div>Upload svg image to test its appearance with filter</div>
      <div style={{ marginTop: 20 }}>
        <input
          onChange={(event) => UploadSVG.uploadSVG(event)}
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
      </div>
      {/* WORK - reference */}
      <svg id="icon-mode-user-entry" />
    </div>
  );
}
