import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  isToasterVisible: false,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function showToaster() {
    dispatch({
      type: "SHOW_TOASTER",
      payload: true,
    });
    setTimeout(() => {
      dispatch({
        type: "SHOW_TOASTER",
        payload: false,
      });
    }, 3000);
  }

  return (
    <GlobalContext.Provider
      value={{
        isToasterVisible: state.isToasterVisible,
        showToaster,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
