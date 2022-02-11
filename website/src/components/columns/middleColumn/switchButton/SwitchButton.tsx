import { updateActiveInputType, updateFilter } from '../../../../state/input/actions';
import { switchHistory } from '../../../../state/history/actions';
import { InputTypes } from '../../../../shared/consts/inputTypes';
import { updateResult } from '../../../../state/result/actions';
import { store } from '../../../../state/store';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import './switchButton.css';

function SwitchButton() {
  const dispatch = useDispatch();

  const switchInputType = () => {
    const { basicColor, activeType: currentlyActiveType, filter } = store.getState().input;
    if (currentlyActiveType === InputTypes.FILTER) {
      dispatch(updateResult(filter));
      dispatch(updateActiveInputType(InputTypes.BASIC_COLOR));
    } else {
      const result = store.getState().result.text;
      dispatch(updateFilter(result));
      dispatch(updateResult(basicColor.colorString));
      dispatch(updateActiveInputType(InputTypes.FILTER));
    }
    dispatch(switchHistory());
  };

  // update is valid
  // update to last valid color so it would woork with the result
  // remove input assets that are not required
  // insert convert functionality

  return (
    <div id="switch-button-container">
      <Button id="switch-button" onClick={switchInputType}>
        ⇄
      </Button>
    </div>
  );
}

export default SwitchButton;
