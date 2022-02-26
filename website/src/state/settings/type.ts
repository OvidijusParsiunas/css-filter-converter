import { SettingsActionTypes } from './consts';

type ToggleContrastAction = { type: SettingsActionTypes.TOGGLE_CONTRAST };

type ToggleIconModeAction = { type: SettingsActionTypes.TOGGLE_ICON_MODE };

export type SettingsAction = ToggleContrastAction | ToggleIconModeAction;

export interface SettingsState {
  isContrastOn: boolean;
  isIconModeOn: boolean;
}
