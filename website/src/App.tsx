import { BASIC_COLOR_TYPE_TO_CLASS } from './components/convertButton/convert/basicColors/colorTypeToClass';
import { MIDDLE_COLUMN_WIDTH_PX, SIDE_COLUMN_WIDTH_PX } from './shared/consts/cssPropertyValues';
import ConvertButton from './components/convertButton/ConvertButton';
import Result from './components/columns/resultColumn/Result';
import Input from './components/columns/inputColumn/Input';
import Column from './components/columns/wrapper/column';
import { store } from './state/store';
import './App.css';

export default function App() {
  const defaultColorInput = store.getState().colorInput;

  // this will need to be fixed
  // side column width / center column width
  return (
    <div className="app">
      <Column width={SIDE_COLUMN_WIDTH_PX} zIndex={1}>
        <Input basicColor={new BASIC_COLOR_TYPE_TO_CLASS[defaultColorInput.colorType](defaultColorInput.text)} />
      </Column>
      <Column width={MIDDLE_COLUMN_WIDTH_PX}>
        <ConvertButton />
      </Column>
      <Column width={SIDE_COLUMN_WIDTH_PX}>
        <Result />
      </Column>
    </div>
  );
}
