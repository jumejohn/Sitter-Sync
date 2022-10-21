export const HANDLE_LOGOUT = "HANDLE_LOGOUT";

export const handleLogout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: HANDLE_LOGOUT });
};
