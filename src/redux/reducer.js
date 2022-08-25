import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { changeFilter } from './actions';

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});
export default combineReducers({
  filter,
});