import { SettingsActionTypes } from './consts';

type ToggleContrastAction = { type: SettingsActionTypes.TOGGLE_CONTRAST };

type ToggleIconModeAction = { type: SettingsActionTypes.TOGGLE_ICON_MODE };

type ToggleSettingsDropdownAction = { type: SettingsActionTypes.TOGGLE_DROPDOWN };

export type SettingsAction = ToggleContrastAction | ToggleIconModeAction | ToggleSettingsDropdownAction;

export interface SettingsState {
  isDropdownOpen: boolean;
  isContrastOn: boolean;
  isIconModeOn: boolean;
}
