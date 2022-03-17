import { setAppFadeClassToFadeIn, fontStyleFinishedLoading, fontStyleLoading } from './state/appInitialisation/actions';
import { ResourceLoadingProgress } from './shared/types/resourceLoadingProgress';
import { ErrorHandler } from './shared/components/errorHander/ErrorHandler';
import { Animations } from './shared/functionality/animations/animations';
import { ComponentsAsProp } from './shared/types/componentAsProp';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from './state/rootReducer';
import React from 'react';

type Props = {
  children: ComponentsAsProp;
};

export default function AppLoadDelay(props: Props) {
  const { children } = props;

  const [fontStyleLoadStartTime, setFontStyleLoadStartTime] = React.useState(new Date());

  const dispatch = useDispatch();

  const appInitializationState = useSelector<RootReducer, RootReducer['appInitialization']>(
    (state) => state.appInitialization,
  );

  const beginFadeInAnimation = () => dispatch(setAppFadeClassToFadeIn());

  const onFontStyleLoaded = () => {
    dispatch(fontStyleFinishedLoading());
    // this calculation is used to make sure that if the font load time is long that the fade-in delay length is lower
    const elapsedFontLoadStartTime = new Date().getTime() - fontStyleLoadStartTime.getTime();
    const appFadeInAnimationDelayMl = 900;
    const fadeInDelayMl = appFadeInAnimationDelayMl - elapsedFontLoadStartTime;
    Animations.fadeInAfterDelay(beginFadeInAnimation, Math.max(0, fadeInDelayMl));
  };

  const handleFonstStyleError = () => {
    ErrorHandler.displayMessageOnConsole('Failed to load font stylesheet');
    onFontStyleLoaded();
  };

  const loadFontStyle = () => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    link.onerror = () => handleFonstStyleError();
    link.onload = () => onFontStyleLoaded();
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  if (appInitializationState.fontStyleLoadingProgress === ResourceLoadingProgress.NOT_STARTED) {
    setFontStyleLoadStartTime(new Date());
    dispatch(fontStyleLoading());
    loadFontStyle();
  }

  return <div className={`${appInitializationState.appFadeClass}`}>{children}</div>;
}
