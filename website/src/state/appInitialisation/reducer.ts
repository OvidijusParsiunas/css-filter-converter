import { ResourceLoadingProgress } from '../../shared/types/resourceLoadingProgress';
import { AppInitializationAction, AppInitializationState } from './type';
import { FadeClasses } from '../../shared/consts/animationClasses';
import { AppInitializationActionTypes } from './consts';

const initialState: AppInitializationState = {
  fontStyleLoadingProgress: ResourceLoadingProgress.NOT_STARTED,
  appFadeClass: FadeClasses.FADED_OUT,
};

const defaultAction: AppInitializationAction = {
  type: AppInitializationActionTypes.FONT_STYLE_FINISHED_LOADING,
};

export const AppInitializationReducer = (
  state: AppInitializationState = initialState,
  action: AppInitializationAction = defaultAction,
): AppInitializationState => {
  switch (action.type) {
    case AppInitializationActionTypes.FONT_STYLE_LOADING: {
      return { ...state, fontStyleLoadingProgress: ResourceLoadingProgress.IN_PROGRESS };
    }
    case AppInitializationActionTypes.FONT_STYLE_FINISHED_LOADING: {
      return { ...state, fontStyleLoadingProgress: ResourceLoadingProgress.FINISHED };
    }
    case AppInitializationActionTypes.SET_APP_FADE_CLASS_TO_FADE_IN: {
      return { ...state, appFadeClass: FadeClasses.FADE_IN_ANIMATION };
    }
    default:
      return state;
  }
};
