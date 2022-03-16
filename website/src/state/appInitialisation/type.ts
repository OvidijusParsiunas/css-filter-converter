import { ResourceLoadingProgress } from '../../shared/types/resourceLoadingProgress';
import { FadeClasses } from '../../shared/consts/animationClasses';
import { AppInitializationActionTypes } from './consts';

type FontStyleFinishedLoadingAction = {
  type: AppInitializationActionTypes.FONT_STYLE_FINISHED_LOADING;
};

type FontStyleLoadingAction = {
  type: AppInitializationActionTypes.FONT_STYLE_LOADING;
};

type SetAppFadeClassToFadeInAction = {
  type: AppInitializationActionTypes.SET_APP_FADE_CLASS_TO_FADE_IN;
};

export type AppInitializationAction =
  | FontStyleFinishedLoadingAction
  | SetAppFadeClassToFadeInAction
  | FontStyleLoadingAction;

export interface AppInitializationState {
  fontStyleLoadingProgress: ResourceLoadingProgress;
  appFadeClass: FadeClasses;
}
