// Importing the createSlice function from the Redux Toolkit
import {createSlice} from '@reduxjs/toolkit';

// Defining the initial state for the user slice of the store
const initialState = {
  isLoggedIn: false,
  profileImage: require('../../assets/images/legasi_logo_naranja.png'),
  role: '',
  profile: {},
};

// Creating a new slice of the store named "user" with its own set of reducers
export const User = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logIn: (state, action) => {
      return {
        ...state,
        ...{
          isLoggedIn: true,
          role: action.payload.role,
          profile: action.payload.profile,
          profileImage:
          action.payload.profileImage || require('../../assets/images/legasi_logo_naranja.png'),
        },
        ...action.payload,
      };
    },
    resetToInitialState: () => {
      return initialState;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = {...state.profile, ...action.payload};
    },
    updateRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

// Exporting the reducers here from the "User" slice
// makes them available to other parts of the app that want to use it
export const {logIn, resetToInitialState, updateToken, updateProfile, updateRole} = User.actions;
export default User.reducer;
