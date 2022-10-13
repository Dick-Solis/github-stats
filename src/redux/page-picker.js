export default function pagePickerRdx(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        page:
          state.page * state.per_page >= state.total ? state.page : state.page + 1,
      };
    case "decrement":
      return { ...state, page: state.page > 1 ? state.page - 1 : state.page };
    default:
      if (!isNaN(action.type)) return { ...state, page: action.type };
      throw new Error();
  }
}