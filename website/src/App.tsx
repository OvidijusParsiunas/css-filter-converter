import { MIDDLE_COLUMN_WIDTH_PX, SIDE_COLUMN_WIDTH_PX } from './shared/consts/cssPropertyValues';
import ConvertButton from './components/columns/middleColumn/convertButton/ConvertButton';
import SwitchButton from './components/columns/middleColumn/switchButton/SwitchButton';
import ErrorAlert from './shared/components/errorAlert/ErrorAlert';
import Result from './components/columns/resultColumn/Result';
import Input from './components/columns/inputColumn/Input';
import Column from './components/columns/wrapper/Column';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Column width={SIDE_COLUMN_WIDTH_PX} zIndex={2}>
        <Input />
      </Column>
      <Column width={MIDDLE_COLUMN_WIDTH_PX} zIndex={1}>
        <ErrorAlert />
        <ConvertButton />
        <SwitchButton />
      </Column>
      <Column width={SIDE_COLUMN_WIDTH_PX}>
        <Result />
      </Column>
    </div>
  );
}
