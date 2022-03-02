import { SettingsAction, SettingsState } from './type';
import { SettingsActionTypes } from './consts';

const initialState: SettingsState = {
  isSheenAdded: true,
  isIconModeOn: false,
  isDropdownOpen: false,
};

const defaultAction: SettingsAction = {
  type: SettingsActionTypes.TOGGLE_SHEEN,
};

export const SettingsReducer = (
  state: SettingsState = initialState,
  action: SettingsAction = defaultAction,
): SettingsState => {
  switch (action.type) {
    case SettingsActionTypes.TOGGLE_SHEEN: {
      return { ...state, isSheenAdded: !state.isSheenAdded };
    }
    case SettingsActionTypes.TOGGLE_ICON_MODE: {
      return { ...state, isIconModeOn: !state.isIconModeOn };
    }
    case SettingsActionTypes.TOGGLE_DROPDOWN: {
      return { ...state, isDropdownOpen: !state.isDropdownOpen };
    }
    default:
      return state;
  }
};
