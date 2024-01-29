import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BaseUrl from '../config/BaseUrl';
import axios from 'axios';

export const GetAllMembersInfo = createAsyncThunk(
  'user/GetAllMembersInfo',
  async ({UserType, UserID}) => {
    try {
      const response = await axios.get(
        `${BaseUrl}LeadInfo/GetLeadsInformation?UserID=${UserID}&UserType=${UserType}&Status=0`,
      );
      return response.data.Data;
    } catch (error) {
      throw error;
    }
  },
);

export const GetPendingMembers = createAsyncThunk(
  'user/GetPendingMembers',
  async ({UserType, UserID}) => {
    try {
      const response = await axios.get(
        `${BaseUrl}LeadInfo/GetLeadsInformation?UserID=${UserID}&UserType=${UserType}&Status=1`,
      );
      return response.data.Data;
    } catch (error) {
      throw error;
    }
  },
);

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    getAllMembers: null,
    pendingMembers: null,
  },

  extraReducers: builder => {
    builder
      .addCase(GetAllMembersInfo.pending, state => {
        state.status = 'loading';
      })
      .addCase(GetAllMembersInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.getAllMembers = action.payload;
      })
      .addCase(GetAllMembersInfo.rejected, state => {
        state.status = 'failed';
      })
      .addCase(GetPendingMembers.pending, state => {
        state.status = 'loading';
      })
      .addCase(GetPendingMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pendingMembers = action.payload;
      })
      .addCase(GetPendingMembers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectGetAllMembers = state => state.user.getAllMembers;
export const selectPendingMembers = state => state.user.pendingMembers;

export default memberSlice.reducer;
