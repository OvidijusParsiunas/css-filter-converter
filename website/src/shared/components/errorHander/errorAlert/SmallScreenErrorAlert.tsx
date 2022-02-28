import { RootReducer } from '../../../../state/rootReducer';
import { useSelector } from 'react-redux';
import ErrorAlert from './ErrorAlert';
import './smallScreenErrorAlert.css';
import './errorAlert.css';

// this is a wrapper to blank out the entire screen when an error occurs and the screen size is too
// narrow, the reason why this is a separate component to the ErrorAlert component is because
// the original ErrorAlert is placed inside the middle column which has a lower z index than
// the first one - hence the first column elements cannot be covered by any of the middle
// column elements and this is instead used as a workaround to cover all screen elements
export default function SmallScreenErrorAlert() {
  const isErrorDisplayedState = useSelector<RootReducer, RootReducer['error']['isErrorDisplayed']>(
    (state) => state.error.isErrorDisplayed,
  );

  // prettier-ignore
  const displayError = () => (
    isErrorDisplayedState ? (
      <div id="small-screen-error-alert-cover">
        <div id="small-screen-error-alert-error-message-container">
          <ErrorAlert />
        </div>
      </div>
    ) : null
  );

  return <div id="small-screen-error-alert">{displayError()}</div>;
}
