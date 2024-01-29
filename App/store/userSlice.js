import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BaseUrl from '../config/BaseUrl';
import axios from 'axios';
console.log(BaseUrl);
export const AllLenderInfo = createAsyncThunk(
  'user/AllLenderInfo',
  async ({UserID}) => {
    try {
      const response = await axios.get(
        ` ${BaseUrl}LenderInfo/GetFavouriteLenderVIARealEstateAgentId?RealEstateAgentId=${UserID}`,
      );
      return response.data.Data;
    } catch (error) {
      throw error; // This will be caught by the rejected case in extraReducers
    }
  },
);

export const PendingLenderInfo = createAsyncThunk(
  'user/PendingLenderInfo',
  async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}LenderInfo/GetLenderInfo?Status=1`,
      );
      return response.data.Data;
    } catch (error) {
      throw error;
    }
  },
);

export const UserProfile = createAsyncThunk(
  'user/UserProfile',
  async ({UserType, UserID}) => {
    try {
      const response = await axios.get(
        `${BaseUrl}UserProfile/UserProfileInfo?UserID=${UserID}&UserType=${UserType}`,
      );
      return response.data.Data;
    } catch (error) {
      throw error;
    }
  },
);
export const UsersReview = createAsyncThunk(
  'user/UsersReview',
  async ({UserType, UserID, VendorID}) => {
    try {
      const response = await axios.get(
        `${BaseUrl}FeedBackInfo/GetFeedBackInfo?UserID=${VendorID}&UserTypeID=5&EntryUserID=${UserID}&EntryUserTypeID=${UserType}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
export const GetReferredMembersDetails = createAsyncThunk(
  'user/GetReferredMembersDetails',
  async ({UserType, UserID, TypeOfUser}) => {
    try {
      const response = await axios.get(
        `${BaseUrl}InvitationReference/GetReferredMembersDetails?UserID=${UserID}&UserType=${UserType}&TypeOfUser=${TypeOfUser}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
export const GetAllOrganization = createAsyncThunk(
  'user/GetAllOrganization',
  async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}OrganizationInfo/GetAllOrganization`,
      );
      return response.data.Data;
    } catch (error) {
      throw error;
    }
  },
);

export const GetPriceRange = createAsyncThunk(
  'user/GetPriceRange',
  async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}InvitationReference/GetPriceRange`,
      );
      return response.data.Data;
    } catch (error) {
      throw error;
    }
  },
);
export const GetReferType = createAsyncThunk('user/GetReferType', async () => {
  try {
    const response = await axios.get(
      `${BaseUrl}InvitationReference/GetReferType`,
    );
    return response.data.Data;
  } catch (error) {
    throw error;
  }
});
export const GetFavLender = createAsyncThunk('user/GetFavLender', async () => {
  try {
    const response = await axios.get(
      `${BaseUrl}LenderInfo/GetAllLendersExceptFavourite?RealEstateAgentID=1`,
    );
    return response.data.Data;
  } catch (error) {
    throw error;
  }
});
export const GetFeaturedVendors = createAsyncThunk(
  'user/GetFeaturedVendors',
  async ({UserType, UserID}) => {
    try {
      const response = await axios.get(
        `${BaseUrl}VendorInfo/GetVendorInfo?VendorID=0&UserID=${UserID}&UserTypeID=${UserType}`,
      );
      return response.data.Data;
    } catch (error) {
      throw error;
    }
  },
);
export const GetFavVendors = createAsyncThunk(
  'user/GetFavVendors',
  async ({UserType, UserID}) => {
    try {
      const response = await axios.get(
        `${BaseUrl}VendorInfo/GetFavouriteVendorInfo?UserID=${UserID}&UserType=${UserType}`,
      );
      return response.data.Data;
    } catch (error) {
      throw error;
    }
  },
);

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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isLoggedIn: false,
    darkMode: false,
    status: 'idle',
    currentCircle: null,
    pendingCircle: null,
    pendingMembers: null,
    getAllOrganization: null,
    priceRange: null,
    referType: null,
    favLender: null,
    featuredVendors: null,
    favVendors: null,
    usersReview: null,
    VendorID: null,
    userReferDetails: null,
    getReferredMembersDetails: null,
    getAllMembers: null,
    pendingMembers: null,
    choosenColorText: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    setVendorID: (state, action) => {
      state.VendorID = action.payload;
      state.isLoggedIn = true;
    },
    setChoosenColorAction: (state, action) => {
      state.choosenColorText = action.payload;
      state.isLoggedIn = true;
    },
    setUserReferDetails: (state, action) => {
      state.userReferDetails = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: state => {
      state.data = null;
      state.isLoggedIn = false;
    },
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(AllLenderInfo.pending, state => {
        state.status = 'loading';
      })
      .addCase(AllLenderInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentCircle = action.payload;
      })
      .addCase(AllLenderInfo.rejected, state => {
        state.status = 'failed';
      })
      .addCase(PendingLenderInfo.pending, state => {
        state.status = 'loading';
      })
      .addCase(PendingLenderInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pendingCircle = action.payload;
      })
      .addCase(PendingLenderInfo.rejected, state => {
        state.status = 'failed';
      })
      .addCase(UserProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(UserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userProfile = action.payload;
      })
      .addCase(UserProfile.rejected, state => {
        state.status = 'failed';
      })
      .addCase(UsersReview.pending, state => {
        state.status = 'loading';
      })
      .addCase(UsersReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usersReview = action.payload;
      })
      .addCase(UsersReview.rejected, state => {
        state.status = 'failed';
      })
      .addCase(GetAllOrganization.pending, state => {
        state.status = 'loading';
      })
      .addCase(GetAllOrganization.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.getAllOrganization = action.payload;
      })
      .addCase(GetAllOrganization.rejected, state => {
        state.status = 'failed';
      })
      .addCase(GetPriceRange.pending, state => {
        state.status = 'loading';
      })
      .addCase(GetPriceRange.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.priceRange = action.payload;
      })
      .addCase(GetPriceRange.rejected, state => {
        state.status = 'failed';
      })
      .addCase(GetReferType.pending, state => {
        state.status = 'loading';
      })
      .addCase(GetReferType.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.referType = action.payload;
      })
      .addCase(GetReferType.rejected, state => {
        state.status = 'failed';
      })
      .addCase(GetFavLender.pending, state => {
        state.status = 'loading';
      })
      .addCase(GetFavLender.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favLender = action.payload;
      })
      .addCase(GetFavLender.rejected, state => {
        state.status = 'failed';
      })
      .addCase(GetFeaturedVendors.pending, state => {
        state.status = 'loading';
      })
      .addCase(GetFeaturedVendors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.featuredVendors = action.payload;
      })
      .addCase(GetFeaturedVendors.rejected, state => {
        state.status = 'failed';
      })
      .addCase(GetFavVendors.pending, state => {
        state.status = 'loading';
      })
      .addCase(GetFavVendors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favVendors = action.payload;
      })
      .addCase(GetFavVendors.rejected, state => {
        state.status = 'failed';
      })
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
      })
      .addCase(GetReferredMembersDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(GetReferredMembersDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.getReferredMembersDetails = action.payload;
      })
      .addCase(GetReferredMembersDetails.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const {
  setUser,
  clearUser,
  toggleDarkMode,
  setVendorID,
  setUserReferDetails,
  setChoosenColorAction,
} = userSlice.actions;
export const selectUserData = state => state.user.data;
export const selectIsLoggedIn = state => state.user.isLoggedIn;
export const selectDarkMode = state => state.user.darkMode;
export const selectCurrentCircle = state => state.user.currentCircle;
export const selectPendingCircle = state => state.user.pendingCircle;
export const selectUserProfile = state => state.user.userProfile;
export const selectGetAllOrganization = state => state.user.getAllOrganization;
export const selectGetPriceRange = state => state.user.priceRange;
export const selectGetReferType = state => state.user.referType;
export const selectGetFavLender = state => state.user.favLender;
export const selectGetFeaturedVendors = state => state.user.featuredVendors;
export const selectGetFavVendors = state => state.user.favVendors;
export const selectUsersReview = state => state.user.usersReview;
export const selectVendorID = state => state.user.VendorID;
export const selectUserReferDetails = state => state.user.userReferDetails;
export const selectGetAllMembers = state => state.user.getAllMembers;
export const selectPendingMembers = state => state.user.pendingMembers;
export const selectGetReferredMembersDetails = state =>
  state.user.getReferredMembersDetails;
export const selectFetchStatus = state => state.user.status;

export default userSlice.reducer;
