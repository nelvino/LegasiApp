import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedBusinessId: null,
};

const Businesses = createSlice({
  name: 'businesses',
  initialState,
  reducers: {
    setBusinesses: (state, action) => {
      state.items = action.payload;
    },
    updateSelectedBusinessId: (state, action) => {
      state.selectedBusinessId = action.payload;
    },
  },
});

export const {setBusinesses, updateSelectedBusinessId} = Businesses.actions;
export default Businesses.reducer;
