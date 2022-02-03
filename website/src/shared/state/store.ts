import { rootReducer } from './reducers/rootReducer';
import { createStore } from 'redux';

export const store = createStore(rootReducer);
