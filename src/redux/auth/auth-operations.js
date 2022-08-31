import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const userApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    addUser: builder.mutation({
      query: newUser => ({
        url: '/users/signup',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    loginUser: builder.mutation({
      query: logUser => ({
        url: '/users/login',
        method: 'POST',
        body: logUser,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    currentUser: builder.query({
      query: () => '/users/current',
      providesTags: ['User'],
    }),
    getContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['User'],
    }),
    addContact: builder.mutation({
      query: newContact => ({
        url: '/contacts',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
        body: Notify.failure(`Contact is deleted!`),
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    changeContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useAddUserMutation,
  useLogoutUserMutation,
  useCurrentUserQuery,
  useGetContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
} = userApi;


