import { SettingsActionTypes } from './consts';
import { SettingsAction } from './type';

export const toggleContrast = (): SettingsAction => ({
  type: SettingsActionTypes.TOGGLE_CONTRAST,
});

export const toggleIconMode = (): SettingsAction => ({
  type: SettingsActionTypes.TOGGLE_ICON_MODE,
});

export const toggleDropdown = (): SettingsAction => ({
  type: SettingsActionTypes.TOGGLE_DROPDOWN,
});
