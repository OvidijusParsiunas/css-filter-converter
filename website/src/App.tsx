import SmallScreenErrorAlert from './shared/components/errorHander/errorAlert/SmallScreenErrorAlert';
import ConvertButton from './components/columns/middleColumn/convertButton/ConvertButton';
import IconModePanel from './components/columns/middleColumn/iconModePanel/IconModePanel';
import SwitchButton from './components/columns/middleColumn/switchButton/SwitchButton';
import ErrorAlert from './shared/components/errorHander/errorAlert/ErrorAlert';
import ErrorBoundary from './shared/components/errorHander/ErrorBoundary';
import Result from './components/columns/resultColumn/Result';
import Input from './components/columns/inputColumn/Input';
import './shared/functionality/animations/animations.css';
import Column from './components/columns/wrapper/Column';
import { setDispatch } from './state/error/actions';
import Header from './components/header/Header';
import { useDispatch } from 'react-redux';
import AppLoadDelay from './AppLoadDelay';
import './shared/style/globalStyle.css';
import React from 'react';
import './App.css';

export default function App() {
  // currently used for error handling
  const dispatch = useDispatch();
  dispatch(setDispatch(dispatch));

  const inputColumnRef = React.useRef<HTMLDivElement>(null);
  const resultColumnRef = React.useRef<HTMLDivElement>(null);
  const iconModePanelRef = React.useRef<HTMLDivElement>(null);
  const resultHeaderTextRef = React.useRef<HTMLDivElement>(null);

  return (
    <ErrorBoundary>
      <AppLoadDelay>
        <SmallScreenErrorAlert />
        <Header />
        <div className="app">
          <Column zIndex={2} ref={inputColumnRef}>
            <Input />
          </Column>
          <Column zIndex={1}>
            <ErrorAlert />
            <IconModePanel ref={iconModePanelRef} />
            <ConvertButton resultHeaderTextRef={resultHeaderTextRef} />
            <SwitchButton
              inputColumnRef={inputColumnRef}
              resultColumnRef={resultColumnRef}
              iconModePanelRef={iconModePanelRef}
            />
          </Column>
          <Column ref={resultColumnRef}>
            <Result resultHeaderTextRef={resultHeaderTextRef} />
          </Column>
        </div>
      </AppLoadDelay>
    </ErrorBoundary>
  );
}
