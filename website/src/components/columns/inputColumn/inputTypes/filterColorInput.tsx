import ColorTypeSelector from '../../../../shared/components/colorTypeSelector/ColorTypeSelector';
import { ErrorHandler } from '../../../../shared/components/errorHander/ErrorHandler';
import { updateInputFilter, updateIsValid } from '../../../../state/input/actions';
import { updateResultBasicColor } from '../../../../state/result/actions';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { RootReducer } from '../../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import './filterColorInput.css';
import React from 'react';

export default function FilterColorInput() {
  const dispatch = useDispatch();
  const inputState = useSelector<RootReducer, RootReducer['input']>((state) => state.input);
  const resultColorState = useSelector<RootReducer, RootReducer['result']['basicColor']>(
    (state) => state.result.basicColor,
  );

  const filterTestElement = React.useRef<HTMLDivElement>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(updateInputFilter(event.target.value));
    if (filterTestElement.current) {
      const { style } = filterTestElement.current;
      style.filter = '';
      style.filter = event.target.value;
      dispatch(updateIsValid(!!style.filter));
    }
  };

  const inputStyle: React.CSSProperties = {
    width: 'calc(80% - 77px)',
    backgroundColor: 'white',
    left: '-7px',
  };

  const colorTypeClassOverwriteCss = {
    '.MuiOutlinedInput-root': {
      height: '100%',
    },
  };

  const getBasicColorTypeSelector = () => (
    <ColorTypeSelector
      updateColorCallback={updateResultBasicColor}
      basicColorState={resultColorState}
      convertFromFilterOnChange
      customContainerStyling={{ position: 'fixed', height: '100%', marginLeft: 2 }}
      customSelectorStyling={{ height: '100%', width: '82px', cursor: 'pointer' }}
      innerValues={[BasicColorTypes.HEX, BasicColorTypes.RGB, BasicColorTypes.HSL]}
    />
  );

  return (
    <div id="filter-input">
      <div id="filter-input-color-type">
        <TextField size="small" sx={colorTypeClassOverwriteCss} value="Filter" />
      </div>
      <TextField
        spellCheck="false"
        multiline
        size="small"
        style={inputStyle}
        variant="outlined"
        error={!inputState.isValid}
        value={inputState.filter}
        onChange={(e) => ErrorHandler.executeEvent(handleTextChange.bind(null, e))}
      />
      {getBasicColorTypeSelector()}
      <div ref={filterTestElement} />
    </div>
  );
}
