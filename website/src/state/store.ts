import { rootReducer } from './rootReducer';
import { createStore } from 'redux';

export const store = createStore(rootReducer);
