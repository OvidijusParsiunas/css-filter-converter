import { AppInitializationActionTypes } from './consts';
import { AppInitializationAction } from './type';

export const fontStyleLoading = (): AppInitializationAction => ({
  type: AppInitializationActionTypes.FONT_STYLE_LOADING,
});

export const fontStyleFinishedLoading = (): AppInitializationAction => ({
  type: AppInitializationActionTypes.FONT_STYLE_FINISHED_LOADING,
});

export const setAppFadeClassToFadeIn = (): AppInitializationAction => ({
  type: AppInitializationActionTypes.SET_APP_FADE_CLASS_TO_FADE_IN,
});
