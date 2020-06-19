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
    case "SHOW_TOASTER":
      return {
        ...state,
        isToasterVisible: action.payload
      }
    default:
      return state;
  }
};
