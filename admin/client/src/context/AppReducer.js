export default (state, action) => {
  switch (action.type) {
    // case "GET_MAPPING_DEFINITION":
    //   return {
    //     ...state,
    //     mappingsDefinitions: action.payload,
    //   };
    // case "DELETE_MAPPING_DEFINITION":
    //   return {
    //     ...state,
    //     mappingsDefinitions: state.mappingsDefinitions.filter(
    //       (mappingsDefinition) => mappingsDefinition.id !== action.payload
    //     ),
    //   };
    // case "ADD_MAPPING_DEFINITION":
    //   return {
    //     ...state,
    //     mappingsDefinitions: [action.payload, ...state.mappingsDefinitions],
    //   };
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        isNotificationVisible: action.payload.visible,
        notificationMessage: action.payload.message
      }
    default:
      return state;
  }
};
