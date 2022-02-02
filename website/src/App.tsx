import ConvertButton from './components/convertButton/ConvertButton';
import Column from './components/columns/reactChildren/column';
import Result from './components/columns/resultColumn/Result';
import Input from './components/columns/inputColumn/Input';
import './App.css';

function App() {
  return (
    <div className="app">
      <Column transformXValue="-50%">
        <Input />
      </Column>
      <Column transformXValue="0%">
        <Result />
      </Column>
      <ConvertButton />
    </div>
  );
}

export default App;
