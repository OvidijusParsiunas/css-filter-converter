// if there are too many new issues being created, change the below variables to the following:
// export const UNEXPECTED_ERROR_MESSAGE_PREFIX =
//   'Unexpected error has occurred, please report this by creating a new issue in the following link: ';

// export const UNEXPECTED_ERROR_MESSAGE_LINK = 'https://github.com/OvidijusParsiunas/css-filter-converter/issues';

export const UNEXPECTED_ERROR_MESSAGE_PREFIX =
  'Unexpected error has occurred, please report this by using the following link: ';

export const UNEXPECTED_ERROR_MESSAGE_LINK = 'https://github.com/OvidijusParsiunas/css-filter-converter/issues/new';

export const UNEXPECTED_ERROR_MESSAGE_INTRODUCTION = UNEXPECTED_ERROR_MESSAGE_PREFIX + UNEXPECTED_ERROR_MESSAGE_LINK;

export const DEFAULT_CONVERSION_ERROR_MESSAGE = 'Input value is invalid';

export const MUST_INSTALL_PUPPETEER =
  "To convert filter values to color in Node - you will first need to install 'puppeteer' by running:" +
  ' \n npm install puppeteer';
