import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  industries: [
    {
      industryId: 1,
      name: 'Technology',
    },
    {
      industryId: 2,
      name: 'Healthcare',
    },
    {
      industryId: 3,
      name: 'Finance',
    },
    {
      industryId: 4,
      name: 'Real Estate',
    },
    {
      industryId: 5,
      name: 'Retail',
    },
    {
      industryId: 6,
      name: 'Energy',
    },
    {
      industryId: 7,
      name: 'Manufacturing',
    },
    {
      industryId: 8,
      name: 'Construction',
    },
    {
      industryId: 9,
      name: 'Education',
    },
    {
      industryId: 10,
      name: 'Transportation',
    },
    {
      industryId: 11,
      name: 'Entertainment',
    },
    {
      industryId: 12,
      name: 'Agriculture',
    },
    {
      industryId: 13,
      name: 'Hospitality',
    },
    {
      industryId: 14,
      name: 'Telecommunications',
    },
    {
      industryId: 15,
      name: 'Professional Services',
    },
  ],
  selectedIndustryId: 1,
};

const Industries = createSlice({
  name: 'industries',
  initialState: initialState,
  reducers: {
    resetIndustries: () => {
      return initialState;
    },
    updateSelectedIndustryId: (state, action) => {
      state.selectedIndustryId = action.payload;
    },
  },
});

export const {resetIndustries, updateSelectedIndustryId} = Industries.actions;

export default Industries.reducer;
