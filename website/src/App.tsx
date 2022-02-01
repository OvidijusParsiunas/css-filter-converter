import ConvertButton from './convertButton/ConvertButton';
import WindowColumn from './reactChildren/WindowColumn';
import { ELEMENT_IDS } from './consts/elementIds';
import Result from './resultColumn/Result';
import Input from './inputColumn/Input';
import './App.css';

function App() {
  return (
    <div className="app">
      <WindowColumn transformXValue="-50%">
        <Input />
      </WindowColumn>
      <WindowColumn transformXValue="0%">
        <Result />
      </WindowColumn>
      <ConvertButton />
      <div id={ELEMENT_IDS.COLOR_VALIDATION_ELEMENT} />
    </div>
  );
}

export default App;
