import { RootReducer } from '../../../../state/rootReducer';
import BackgroundIcon from './BackgroundIcon';
import { useSelector } from 'react-redux';
import './backgroundIcons.css';

export default function BackgroundIcons() {
  const historyState = useSelector<RootReducer, RootReducer['history']['history']>((state) => state.history.history);

  const displayCssValue = historyState.length > 0 ? 'none' : 'grid';

  return (
    <div id="background-icons-container" style={{ display: displayCssValue }}>
      <BackgroundIcon />
      <BackgroundIcon />
    </div>
  );
}
