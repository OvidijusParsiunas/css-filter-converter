import { toggleContrast, toggleDropdown, toggleIconMode } from '../../../state/settings/actions';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SettingsDropdownItemFilter from './SettingsDropdownItem';
import { RootReducer } from '../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import MenuList from '@mui/material/MenuList';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import React from 'react';

interface Props {
  anchorRef: React.RefObject<HTMLDivElement>;
}

export default function SettingsDropdown(props: Props) {
  const { anchorRef } = props;

  const settingsState = useSelector<RootReducer, RootReducer['settings']>((state) => state.settings);

  const dispatch = useDispatch();

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    dispatch(toggleDropdown());
  };

  function handleMenuKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      dispatch(toggleDropdown());
    } else if (event.key === 'Escape') {
      dispatch(toggleDropdown());
    }
  }

  return (
    <Popper open={settingsState.isDropdownOpen} anchorEl={anchorRef.current} transition disablePortal>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: 'top' }}>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList onKeyDown={(e) => handleMenuKeyDown(e)}>
                <SettingsDropdownItemFilter
                  itemName="Contrast"
                  isOn={settingsState.isContrastOn}
                  toggleState={toggleContrast}
                />
                <SettingsDropdownItemFilter
                  itemName="Icon Mode"
                  isOn={settingsState.isIconModeOn}
                  toggleState={toggleIconMode}
                />
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
