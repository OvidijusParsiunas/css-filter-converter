import { IconModePanelUtils } from '../../columns/middleColumn/iconModePanel/iconModePanelUtils';
import { TooltipTheme } from '../../../shared/style/muiThemes/tooltipTheme';
import { RootReducer } from '../../../state/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import ListItemText from '@mui/material/ListItemText';
import { ThemeProvider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

interface Props {
  itemName: string;
  isOn: boolean;
  toggleState: () => void;
}

export default function SettingsDropdownFilterItem(props: Props) {
  const { itemName, isOn, toggleState } = props;

  const [isTooltipDisplayed, setIsTooltipDisplayed] = React.useState(false);
  const activeInputTypeState = useSelector<RootReducer, RootReducer['input']['activeType']>(
    (state) => state.input.activeType,
  );

  const dispatch = useDispatch();

  const handleItemClick = () => {
    dispatch(toggleState());
  };

  const greyTooltipTheme = TooltipTheme.create('#9e9e9e');

  return (
    <div
      onMouseEnter={() => setIsTooltipDisplayed(!IconModePanelUtils.isIsDisplayed(activeInputTypeState))}
      onMouseLeave={() => setIsTooltipDisplayed(false)}
    >
      <ThemeProvider theme={greyTooltipTheme}>
        <Tooltip title="Used when filter is the result" placement="left" open={isTooltipDisplayed}>
          <MenuItem onClick={() => handleItemClick()} disabled={!IconModePanelUtils.isIsDisplayed(activeInputTypeState)}>
            <Checkbox checked={isOn} />
            <ListItemText primary={itemName} />
          </MenuItem>
        </Tooltip>
      </ThemeProvider>
    </div>
  );
}
