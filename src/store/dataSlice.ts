import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TEmployee } from "@/types";

const initialState: { companyData: TEmployee[] } = {
  companyData: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<TEmployee[]>) {
      const sorted = action.payload.sort((a, b) => (a.documentName > b.documentName ? 1 : -1));
      state.companyData = sorted;
    },
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
