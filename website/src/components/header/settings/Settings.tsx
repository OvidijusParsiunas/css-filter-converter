import { toggleDropdown } from '../../../state/settings/actions';
import SettingsDropdown from './SettingsDropdown';
import { useDispatch } from 'react-redux';
import cogIcon from './cogwheel.svg';
import React from 'react';

export default function Settings() {
  const anchorRef = React.useRef<HTMLImageElement>(null);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleDropdown());
  };

  return (
    <div>
      <img
        className="header-content generic-header-logo"
        ref={anchorRef}
        src={cogIcon}
        onClick={handleToggle}
        alt=""
        aria-hidden="true"
      />
      <SettingsDropdown anchorRef={anchorRef} />
    </div>
  );
}
