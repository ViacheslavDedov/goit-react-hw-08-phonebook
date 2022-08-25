import { createSlice } from '@reduxjs/toolkit';
import { userApi } from './auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoading: false,
  isFetchingCurrent: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addMatcher(
      userApi.endpoints.addUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      userApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = true;
      }
    );
    builder.addMatcher(userApi.endpoints.logoutUser.matchFulfilled, state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoading = false;
    });
    builder.addMatcher(userApi.endpoints.currentUser.matchPending, state => {
      state.isFetchingCurrent = false;
    });
    builder.addMatcher(
      userApi.endpoints.currentUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.isLoading = true;
        state.isFetchingCurrent = true;
      }
    );
  },
});

export default authSlice.reducer;