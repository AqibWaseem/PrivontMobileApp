import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import store from './App/store/store';
import {PendingLenderInfo, AllLenderInfo} from './App/store/userSlice';
import AppNavigation from './App/navigation/AppNavigation';

const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(PendingLenderInfo());
    dispatch(AllLenderInfo());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default AppWrapper;
