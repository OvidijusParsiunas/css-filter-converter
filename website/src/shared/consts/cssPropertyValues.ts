// these directly correspond to values inside column.css file
// the reason why they also exist inside that file is because they are used within @media queries
export const MIDDLE_COLUMN_WIDTH_NUMBER = 104;

export const MIDDLE_COLUMN_WIDTH_PX = `${MIDDLE_COLUMN_WIDTH_NUMBER}px`;

export const SIDE_COLUMN_WIDTH_PX = `calc(50% - ${MIDDLE_COLUMN_WIDTH_NUMBER / 2}px)`;
