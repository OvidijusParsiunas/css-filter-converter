import { MIDDLE_COLUMN_WIDTH_PX, SIDE_COLUMN_WIDTH_PX } from './shared/consts/cssPropertyValues';
import ConvertButton from './components/columns/middleColumn/convertButton/ConvertButton';
import SwitchButton from './components/columns/middleColumn/switchButton/SwitchButton';
import ErrorAlert from './shared/components/errorHander/errorAlert/ErrorAlert';
import ErrorBoundary from './shared/components/errorHander/ErrorBoundary';
import { Animations } from './shared/functionality/animations';
import Result from './components/columns/resultColumn/Result';
import Input from './components/columns/inputColumn/Input';
import Column from './components/columns/wrapper/Column';
import { setDispatch } from './state/error/actions';
import './shared/functionality/animations.css';
import { useDispatch } from 'react-redux';
import React from 'react';
import './App.css';

export default function App() {
  // currently used for error handling
  const dispatch = useDispatch();
  dispatch(setDispatch(dispatch));

  const [fadeInClass, setFadeInClass] = React.useState(Animations.FADE_IN_START_CLASS);
  const fadeInAnimationDelayMl = 600;
  Animations.fadeInAfterDelay(setFadeInClass, fadeInAnimationDelayMl);

  const inputColumnRef = React.useRef<HTMLDivElement>(null);
  const resultColumnRef = React.useRef<HTMLDivElement>(null);

  return (
    <ErrorBoundary>
      <div className={`app ${fadeInClass}`}>
        <Column width={SIDE_COLUMN_WIDTH_PX} zIndex={2} ref={inputColumnRef}>
          <Input />
        </Column>
        <Column width={MIDDLE_COLUMN_WIDTH_PX} zIndex={1}>
          <ErrorAlert />
          <ConvertButton />
          <SwitchButton inputColumnRef={inputColumnRef} resultColumnRef={resultColumnRef} />
        </Column>
        <Column width={SIDE_COLUMN_WIDTH_PX} ref={resultColumnRef}>
          <Result />
        </Column>
      </div>
    </ErrorBoundary>
  );
}
