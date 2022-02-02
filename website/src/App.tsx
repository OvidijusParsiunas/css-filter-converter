import ConvertButton from './components/convertButton/ConvertButton';
import WindowColumn from './components/columns/reactChildren/WindowColumn';
import Result from './components/columns/resultColumn/Result';
import Input from './components/columns/inputColumn/Input';
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
    </div>
  );
}

export default App;
