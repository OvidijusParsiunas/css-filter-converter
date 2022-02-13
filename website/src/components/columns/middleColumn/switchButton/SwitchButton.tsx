import { updateActiveInputType, updateFilter, updateIsValid } from '../../../../state/input/actions';
import { DEFAULT_VALUES } from '../../../../shared/consts/defaultValues';
import { switchHistory } from '../../../../state/history/actions';
import { InputTypes } from '../../../../shared/consts/inputTypes';
import { updateResult } from '../../../../state/result/actions';
import { store } from '../../../../state/store';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import './switchButton.css';

interface InputAndResultStrings {
  input: string;
  result: string;
}

function SwitchButton() {
  const dispatch = useDispatch();

  const updateInput = (currentResult: string) => {
    const { basicColor, activeType: currentlyActiveType } = store.getState().input;
    if (currentlyActiveType === InputTypes.FILTER) {
      basicColor.colorString = currentResult || basicColor.defaultColorString;
      dispatch(updateActiveInputType(InputTypes.BASIC_COLOR));
    } else {
      dispatch(updateFilter(currentResult || DEFAULT_VALUES.filter));
      dispatch(updateActiveInputType(InputTypes.FILTER));
    }
    dispatch(updateIsValid(true));
  };

  const getCurrentInputAndResultStrings = (): InputAndResultStrings => {
    const { history } = store.getState().history;
    if (history.length > 0) {
      const [{ input, result }] = history;
      return { input, result };
    }
    return { input: '', result: '' };
  };

  const switchInputType = () => {
    const { input, result } = getCurrentInputAndResultStrings();
    updateInput(result);
    dispatch(updateResult(input));
    dispatch(switchHistory());
  };

  return (
    <div id="switch-button-container">
      <Button id="switch-button" onClick={switchInputType}>
        ⇄
      </Button>
    </div>
  );
}

export default SwitchButton;
