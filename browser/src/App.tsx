import FilterToColor from './FilterToColor';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input
          readOnly
          type="text"
          id="textInput"
          value="invert(61%) sepia(52%) saturate(6491%) hue-rotate(163deg) brightness(96%) contrast(102%)"
        />
        <FilterToColor />
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <div id="capture" style={{ padding: '10px', background: '#f5da55' }}>
          <img id="hidden-svg" src="edit-red.svg" alt="triangle with all three sides equal" height="87" width="100" />
        </div>
      </header>
    </div>
  );
}

export default App;
