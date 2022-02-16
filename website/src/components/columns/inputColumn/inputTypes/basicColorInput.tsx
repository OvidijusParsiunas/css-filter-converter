import ColorTypeSelector from '../../../../shared/components/colorTypeSelector/ColorTypeSelector';
import { updateInputBasicColor, updateIsValid } from '../../../../state/input/actions';
import { ErrorHandler } from '../../../../shared/components/errorHander/ErrorHandler';
import CustomColorPicker from '../customColorPicker/CustomColorPicker';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { RootReducer } from '../../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import './basicColorInput.css';

export default function BasicColorInput() {
  const dispatch = useDispatch();
  const inputState = useSelector<RootReducer, RootReducer['input']>((state) => state.input);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    inputState.basicColor.setAndParseColorString(event.target.value, ErrorHandler, false);
    dispatch(updateIsValid(!!inputState.basicColor.parseResult));
  };

  const getBasicColorTypeSelector = () => (
    <ColorTypeSelector
      updateColorCallback={updateInputBasicColor}
      basicColorState={inputState.basicColor}
      customContainerStyling={{ left: '-10px' }}
      customFormControlStyling={{ position: 'absolute', right: 0 }}
      innerValues={[BasicColorTypes.HEX, BasicColorTypes.RGB, BasicColorTypes.HSL, BasicColorTypes.KEYWORD]}
    />
  );

  return (
    <div>
      {getBasicColorTypeSelector()}
      <TextField
        spellCheck="false"
        style={{ left: '-8px' }}
        error={!inputState.isValid}
        size="small"
        variant="outlined"
        value={inputState.basicColor.colorString}
        onChange={(e) => ErrorHandler.catchEventError(handleTextChange.bind(null, e))}
      />
      <div id="basic-color-input-color-picker-container">
        <CustomColorPicker state={inputState} />
      </div>
    </div>
  );
}
