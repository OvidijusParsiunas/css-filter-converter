import DynamicImportClass from './dynamicImportClass';
import FilterToColor from './FilterToColor';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          <code>src/App.tsx</code>
          and save to reload.
        </p>
        <input
          readOnly
          type="text"
          id="textInput"
          value="invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)"
        />
        <FilterToColor />
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <button type="button" onClick={DynamicImportClass.import}>
          Dynamic
        </button>
      </header>
    </div>
  );
}

export default App;
