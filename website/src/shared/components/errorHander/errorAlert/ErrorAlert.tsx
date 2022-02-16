import {
  UNEXPECTED_ERROR_MESSAGE_LINK,
  UNEXPECTED_ERROR_MESSAGE_PREFIX,
} from 'css-filter-converter/lib/shared/consts/errors';
import { RootReducer } from '../../../../state/rootReducer';
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import './errorAlert.css';

export default function ErrorAlert() {
  const isErrorDisplayedState = useSelector<RootReducer, RootReducer['error']['isErrorDisplayed']>(
    (state) => state.error.isErrorDisplayed,
  );

  // prettier-ignore
  const displayError = () => (
    isErrorDisplayedState ? (
      <Alert severity="error" id="error-alert">
        {UNEXPECTED_ERROR_MESSAGE_PREFIX}
        <a href={UNEXPECTED_ERROR_MESSAGE_LINK} id="error-alert-text" target="_blank" rel="noreferrer">
          {UNEXPECTED_ERROR_MESSAGE_LINK}
        </a>
      </Alert>
    ) : null
  );

  return <div>{displayError()}</div>;
}
