import WindowColumn from './reactChildren/WindowColumn';
import Convert from './convert/Convert';
import Result from './result/Result';
import Input from './input/Input';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  return (
    <div className="app">
      <WindowColumn transformXValue="-50%">
        <Input />
        <Convert />
      </WindowColumn>
      <WindowColumn transformXValue="0%">
        <Result />
      </WindowColumn>
    </div>
  );
}

export default App;
