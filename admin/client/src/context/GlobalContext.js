import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  isNotificationVisible: false,
  notificationMessage: ''
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function showNotification(message) {
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: {
        visible: true,
        message
      },
    });
    setTimeout(() => {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          visible: false,
          message: ''
        },
        });
    }, 2000);
  }

  return (
    <GlobalContext.Provider
      value={{
        isNotificationVisible: state.isNotificationVisible,
        notificationMessage: state.notificationMessage,
        showNotification,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
