import axios from "axios";
import UserService from "../services/UserService";

export async function getUser(dispatch) {
  try {
    const user = await UserService.getProfile();

    if (user) {
      dispatch({ type: "VERIFIED_SUCESS", payload: { user: user } });
    } else {
      dispatch({ type: "VERIFIED_ERROR", error: "Connection Error" });
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        dispatch({
          type: "VERIFIED_ERROR",
          error: err.response.data,
        });
        return;
      }
    }
    dispatch({ type: "VERIFIED_ERROR", error: err.message });
  }
}

export async function loginUser(dispatch, payload) {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    const authResponse = await UserService.login(payload);
    const { access } = authResponse.details;

    if (access) {
      dispatch({ type: "LOGIN_SUCCESS" });
      localStorage.setItem("accessToken", access);
    }
  } catch (err) {
    dispatch({ type: "LOGIN_ERROR", error: err.response.data });
  }
}

export function logoutUser(dispatch) {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
}

export async function registerUser(dispatch, payload) {
  try {
    dispatch({
      type: "SIGNUP_REQUEST",
    });

    const {
      data: { user, tokens },
    } = await UserService.signUp(payload);

    if (user) {
      dispatch({ type: "SIGNUP_SUCCESS", payload: { user: user } });
      localStorage.setItem("token", tokens.accessToken);
    }
  } catch (err) {
    dispatch({ type: "SIGNUP_ERROR", error: err.response.data });
  }
}
