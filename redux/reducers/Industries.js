import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  industries: [],
  selectedIndustryId: 0, // Set initial industry to the first one (index 0)
};

const Industries = createSlice({
  name: 'industries',
  initialState,
  reducers: {
    setIndustries: (state, action) => {
      state.industries = action.payload;
    },
    updateSelectedIndustryId: (state, action) => {
      state.selectedIndustryId = action.payload;
    },
  },
});

export const { setIndustries, updateSelectedIndustryId } = Industries.actions;

export default Industries.reducer;
