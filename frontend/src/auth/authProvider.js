import { useContext, useEffect, useReducer } from "react";
import { getUser } from "./authActions";
import AuthContext from "./authContext";
import { reducer } from "./authReducer";

export const AuthProvider = ({ children }) => {
  const initialState = {
    currentUser: {},
    errorMessage: "",
    isLoading: true,
    isUserLoggedIn: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getUser(dispatch);
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth should be within a AuthProvider");
  }
  return context;
}
