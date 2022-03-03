import { SettingsActionTypes } from './consts';
import { SettingsAction } from './type';

export const toggleSheen = (): SettingsAction => ({
  type: SettingsActionTypes.TOGGLE_SHEEN,
});

export const toggleIconMode = (): SettingsAction => ({
  type: SettingsActionTypes.TOGGLE_ICON_MODE,
});

export const toggleDropdown = (): SettingsAction => ({
  type: SettingsActionTypes.TOGGLE_DROPDOWN,
});

export const toggleSheenHover = (): SettingsAction => ({
  type: SettingsActionTypes.TOGGLE_SHEEN_HOVER,
});
