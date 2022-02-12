import { BasicColorTypes } from '../consts/colorTypes';

export type FilterToColorResultType = Exclude<BasicColorTypes, BasicColorTypes.KEYWORD>;
