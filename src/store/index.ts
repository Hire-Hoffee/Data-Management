import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import dataSlice from "./dataSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      data: dataSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();