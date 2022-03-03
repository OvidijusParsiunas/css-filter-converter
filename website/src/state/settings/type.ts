import { SettingsActionTypes } from './consts';

type ToggleSettingsDropdownAction = { type: SettingsActionTypes.TOGGLE_DROPDOWN };

type ToggleIconModeAction = { type: SettingsActionTypes.TOGGLE_ICON_MODE };

type ToggleSheenAction = { type: SettingsActionTypes.TOGGLE_SHEEN };

type HoverSheenAction = { type: SettingsActionTypes.TOGGLE_SHEEN_HOVER };

export type SettingsAction = ToggleSheenAction | ToggleIconModeAction | ToggleSettingsDropdownAction | HoverSheenAction;

export interface SettingsState {
  isDropdownOpen: boolean;
  isSheenAdded: boolean;
  isIconModeOn: boolean;
  isSheenHovered: boolean;
}
