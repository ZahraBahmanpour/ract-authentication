import { createSlice } from "@reduxjs/toolkit";
import { CRUD_MODE_UPDATE } from "../../../config/constants";

const initialState = {
  tabs: [],
  activeKey: 1,
  crudMode: CRUD_MODE_UPDATE,
};
export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    openTab: (state, action) => {
      const exist = state.tabs.find((tab) => tab.id === action.payload.id);
      return {
        ...state,
        tabs: exist ? state.tabs : [...state.tabs, action.payload],
        activeKey: action.payload.id,
      };
    },
    closeTab: (state, action) => {
      const { id } = action.payload;
      const isActive = state.activeKey === id;
      return {
        ...state,
        tabs: state.tabs.filter((tab) => tab.id !== id),
        activeKey: isActive ? state.tabs[0].id : state.activeKey,
      };
    },
    closeAllTabs: (state) => {
      const unsavedTabs = state.tabs.filter((tab) => tab.unSaved === true);
      return {
        ...state,
        tabs: unsavedTabs.length > 0 ? state.tabs : [],
      };
    },
    activeTab: (state, action) => {
      const { id } = action.payload;
      if (id !== "close-all") {
        return { ...state, activeKey: id };
      }
    },
    updateTab: (state, action) => {
      const { id, tempBody, body } = action.payload;
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === id
            ? { ...tab, tempBody, unSaved: tempBody !== body ? true : false }
            : tab
        ),
      };
    },
    saveTab: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === id ? { ...tab, unSaved: false } : tab
        ),
      };
    },
    setCrudMode: (state, action) => {
      const { crudMode } = action.payload;
      return { ...state, crudMode };
    },
  },
});

export const {
  openTab,
  closeTab,
  updateTab,
  activeTab,
  saveTab,
  setCrudMode,
  closeAllTabs,
} = tabsSlice.actions;

export default tabsSlice.reducer;
