import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TEmployee } from "@/types";

const initialState: { companyData: TEmployee[]; newItem: boolean } = {
  companyData: [],
  newItem: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<TEmployee[]>) {
      const sorted = action.payload.sort((a, b) => (a.documentName > b.documentName ? 1 : -1));
      state.companyData = sorted;
    },
    filterData(state, action: PayloadAction<string>) {
      state.companyData = state.companyData.filter((item) => item.id !== action.payload);
    },
    createNewItem(state, action: PayloadAction<boolean>) {
      state.newItem = action.payload;
    },
    addItem(state, action: PayloadAction<TEmployee>) {
      const newSortedData = [...state.companyData, action.payload].sort((a, b) =>
        a.documentName > b.documentName ? 1 : -1
      );
      state.companyData = newSortedData;
    },
  },
});

export const { setData, filterData, createNewItem, addItem } = dataSlice.actions;

export default dataSlice.reducer;
