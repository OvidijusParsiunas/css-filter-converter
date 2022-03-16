import { setAppFadeClassToFadeIn, fontStyleFinishedLoading, fontStyleLoading } from './state/appInitialisation/actions';
import { APP_FADE_IN_ANIMATION_DELAY_ML } from './shared/consts/appAppearanceDelays';
import { ResourceLoadingProgress } from './shared/types/resourceLoadingProgress';
import { Animations } from './shared/functionality/animations/animations';
import { ComponentsAsProp } from './shared/types/componentAsProp';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from './state/rootReducer';

type Props = {
  children: ComponentsAsProp;
};

export default function AppLoadDelay(props: Props) {
  const { children } = props;

  const dispatch = useDispatch();

  const appInitializationState = useSelector<RootReducer, RootReducer['appInitialization']>(
    (state) => state.appInitialization,
  );

  const beginFadeInAnimation = () => dispatch(setAppFadeClassToFadeIn());

  const onFontStyleLoaded = () => {
    dispatch(fontStyleFinishedLoading());
    Animations.fadeInAfterDelay(beginFadeInAnimation, APP_FADE_IN_ANIMATION_DELAY_ML);
  };

  const loadFontStyle = () => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    // WORK - error handling
    link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    link.onload = () => onFontStyleLoaded();
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  if (appInitializationState.fontStyleLoadingProgress === ResourceLoadingProgress.NOT_STARTED) {
    dispatch(fontStyleLoading());
    loadFontStyle();
  }

  return <div className={`${appInitializationState.appFadeClass}`}>{children}</div>;
}
