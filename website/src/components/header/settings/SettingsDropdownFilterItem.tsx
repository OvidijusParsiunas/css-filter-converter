import { IconModePanelUtil } from '../../columns/middleColumn/iconModePanel/iconModePanelUtil';
import { TooltipTheme } from '../../../shared/style/muiThemes/tooltipTheme';
import { RootReducer } from '../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import ListItemText from '@mui/material/ListItemText';
import { ThemeProvider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import './settingsDropdownFilterItem.css';
import React from 'react';

interface Props {
  itemName: string;
  isOn: boolean;
  toggleState: () => void;
  id?: string;
}

export default function SettingsDropdownFilterItem(props: Props) {
  const { itemName, isOn, toggleState, id } = props;

  const [isTooltipDisplayed, setIsTooltipDisplayed] = React.useState(false);
  const activeInputTypeState = useSelector<RootReducer, RootReducer['input']['activeType']>(
    (state) => state.input.activeType,
  );

  const dispatch = useDispatch();

  const handleItemClick = () => {
    dispatch(toggleState());
  };

  const greyTooltipTheme = TooltipTheme.create('#8e8e8e');

  return (
    <div
      id={id}
      onMouseEnter={() => setIsTooltipDisplayed(!IconModePanelUtil.isIsDisplayed(activeInputTypeState))}
      onMouseLeave={() => setIsTooltipDisplayed(false)}
    >
      <ThemeProvider theme={greyTooltipTheme}>
        <Tooltip title="Used when filter is the result" placement="left" open={isTooltipDisplayed}>
          <MenuItem
            className="settings-dropdown-item"
            onClick={() => handleItemClick()}
            disabled={!IconModePanelUtil.isIsDisplayed(activeInputTypeState)}
          >
            <Checkbox checked={isOn} />
            <ListItemText primary={itemName} />
          </MenuItem>
        </Tooltip>
      </ThemeProvider>
    </div>
  );
}

SettingsDropdownFilterItem.defaultProps = {
  id: '',
};
