import { toggleSheen, toggleDropdown, toggleIconMode, toggleSheenHover } from '../../../state/settings/actions';
import SettingsDropdownFilterItem from './SettingsDropdownFilterItem';
import ClickAwayListener from '@mui/material/ClickAwayListener';
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

  const handleMenuKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      dispatch(toggleDropdown());
    } else if (event.key === 'Escape') {
      dispatch(toggleDropdown());
    }
  };

  const mouseHoverHandler = () => {
    dispatch(toggleSheenHover());
  };

  return (
    <Popper open={settingsState.isDropdownOpen} anchorEl={anchorRef.current} transition disablePortal>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: 'top' }}>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList onKeyDown={(e) => handleMenuKeyDown(e)}>
                <SettingsDropdownFilterItem
                  itemName="Sheen"
                  isOn={settingsState.isSheenAdded}
                  toggleState={toggleSheen}
                  mouseEnterHandler={mouseHoverHandler}
                  mouseLeaveHandler={mouseHoverHandler}
                />
                <SettingsDropdownFilterItem
                  id="icon-mode-dropdown-item"
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
