import './input.css';

function Input() {
  return (
    <input
      id="colorInput"
      className="input"
      type="text"
      defaultValue="invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)"
    />
  );
}

export default Input;
