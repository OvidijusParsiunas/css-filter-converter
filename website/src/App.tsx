import { BASIC_COLOR_TYPE_TO_CLASS } from './components/convertButton/convert/basicColors/colorTypeToClass';
import ConvertButton from './components/convertButton/ConvertButton';
import Column from './components/columns/reactChildren/column';
import Result from './components/columns/resultColumn/Result';
import Input from './components/columns/inputColumn/Input';
import { store } from './shared/state/store';
import './App.css';

export default function App() {
  const defaultColorInput = store.getState().colorInput;

  return (
    <div className="app">
      <Column transformXValue="-50%">
        <Input basicColor={new BASIC_COLOR_TYPE_TO_CLASS[defaultColorInput.colorType](defaultColorInput.text)} />
      </Column>
      <Column transformXValue="0%">
        <Result />
      </Column>
      <ConvertButton />
    </div>
  );
}
