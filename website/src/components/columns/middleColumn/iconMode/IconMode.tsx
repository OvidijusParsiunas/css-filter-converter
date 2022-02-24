/* eslint-disable @typescript-eslint/no-unused-vars */
import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import React from 'react';
import './iconMode.css';
import FilterConverterIconSelection from '../../../header/filter-converter-icon-selection';

export default function IconMode() {
  const buttonClassOverwriteCss = {
    '&.Mui-disabled': {
      backgroundColor: '#FFF453', // #d48484
      color: 'white',
    },
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = () => {
    // do something with event data
  };

  return (
    <div id="icon-mode">
      <div>Upload svg image to test its appearance with filter</div>
      <div style={{ marginTop: 20 }}>
        <input onChange={handleChange} multiple={false} ref={fileInputRef} type="file" hidden />
        <Button
          onClick={() => fileInputRef?.current?.click()}
          style={{ backgroundColor: '#1160a2', height: 45, minWidth: 55 }}
          sx={buttonClassOverwriteCss}
          size="small"
          variant="contained"
          color="primary"
        >
          <UploadIcon />
        </Button>
        {/* <div style={{ width: 60, height: 60, display: 'inline-flex', verticalAlign: 'middle', marginLeft: 20 }}>
          <FilterConverterIconSelection />
        </div> */}
      </div>
    </div>
  );
}
