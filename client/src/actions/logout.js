export const HANDLE_LOGOUT = "HANDLE_LOGOUT";

export const handleLogout = () => (dispatch) => {
  localStorage.removeItem("token");
  window.location.href = "/";

  dispatch({ type: HANDLE_LOGOUT });
};
