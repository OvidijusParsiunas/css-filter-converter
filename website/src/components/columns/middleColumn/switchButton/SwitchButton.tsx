import { updateActiveInputType, updateFilter, updateIsValid } from '../../../../state/input/actions';
import { switchHistory } from '../../../../state/history/actions';
import { InputTypes } from '../../../../shared/consts/inputTypes';
import { updateResult } from '../../../../state/result/actions';
import { store } from '../../../../state/store';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import './switchButton.css';

function SwitchButton() {
  const dispatch = useDispatch();

  const updateInput = (result: string) => {
    const { basicColor, activeType: currentlyActiveType } = store.getState().input;
    if (currentlyActiveType === InputTypes.FILTER) {
      basicColor.colorString = result;
      dispatch(updateActiveInputType(InputTypes.BASIC_COLOR));
    } else {
      dispatch(updateFilter(result));
      dispatch(updateActiveInputType(InputTypes.FILTER));
    }
  };

  const switchInputType = () => {
    const [{ result, input }] = store.getState().history.history;
    updateInput(result);
    dispatch(updateIsValid(true));
    dispatch(updateResult(input));
    dispatch(switchHistory());
  };

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
