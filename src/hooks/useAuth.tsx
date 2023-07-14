import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import useRequest from "./useRequest";

type AuthProvider = {
  userData: Partial<UserAttributes> | undefined,
  login: Function
  signUp: Function
  logout: Function
  loaded: Boolean
  hasError: Boolean
}

type AuthAttributes = {
  children: React.ReactElement
}

type Credentials = {
  email: string,
  password: string
}

type UserAttributes = {
  name: string
} & Credentials

const AuthContext = createContext({});

export function ProvideAuth({ children }: AuthAttributes) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext) as AuthProvider;
};

function useProvideAuth() {
  const { getRequest, postRequest } = useRequest();
  const [userData, setUserData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getRequest("api/users/authenticate", { withCredentials: true })
      .then((response) => setUserData(response.data.user))
      .catch(() => {})
      .finally(function () {
        setLoaded(true);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (credentials: Credentials, cb: Function) => {
    postRequest(
      "api/users/login",
      credentials,
      { withCredentials: true }
    )
      .then((response) => {
        setUserData(response.data.user);
        if (cb) cb();
      })
      .catch(() => setHasError(true))
      .finally(() => {
        setLoaded(true);
      });
  };

  const signUp = (userData: UserAttributes) => {
    postRequest(
      "api/users/register",
      userData,
      { withCredentials: true }
    )
      .then((response) => setUserData(response.data.user))
      .catch(() => setHasError(true))
      .finally(() => {
        setLoaded(true);
      });
  };

  const logout = useCallback(() => {
    postRequest("api/users/logout", {}, { withCredentials: true })
      .then(() => setUserData(undefined))
      .catch(() => setHasError(true))
  }, [postRequest]);

  // Return the user object and auth methods
  return {
    userData,
    login,
    signUp,
    logout,
    loaded,
    hasError,
  };
}
