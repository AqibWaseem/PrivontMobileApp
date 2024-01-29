import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import memberReducer from './memberSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    member: memberReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
