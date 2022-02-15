import { Alert } from '@mui/material';
import './errorAlert.css';

export default function ErrorAlert() {
  const erorrLink = 'https://github.com/OvidijusParsiunas/css-filter-converter/issues/new';
  return (
    <Alert severity="error" id="error-alert">
      Unexpected error has occurred, please report it by using the following link: &nbsp;
      <a href={erorrLink} id="error-alert-text" target="_blank" rel="noreferrer">
        {erorrLink}
      </a>
    </Alert>
  );
}
