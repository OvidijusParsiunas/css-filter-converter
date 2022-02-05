import { BASIC_COLOR_TYPE_TO_CLASS } from './components/convertButton/convert/basicColors/colorTypeToClass';
import ConvertButton from './components/convertButton/ConvertButton';
import Column from './components/columns/reactChildren/column';
import Result from './components/columns/resultColumn/Result';
import Input from './components/columns/inputColumn/Input';
import { store } from './state/store';
import './App.css';

export default function App() {
  const defaultColorInput = store.getState().colorInput;

  // this will need to be fixed
  // side column width / center column width
  return (
    <div className="app">
      <Column width="calc(50% - 52px)">
        <Input basicColor={new BASIC_COLOR_TYPE_TO_CLASS[defaultColorInput.colorType](defaultColorInput.text)} />
      </Column>
      <Column width="104px">
        <ConvertButton />
      </Column>
      <Column width="calc(50% - 52px)">
        <Result />
      </Column>
    </div>
  );
}
