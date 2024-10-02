import { createContext, useCallback, useEffect, useReducer } from "react";
import { authApi } from "../../api/auth";
import { Issuer } from "@/utils/auth";

const TOKEN_KEY = "access_token";

const ActionType = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: !user,
      isInitialized: true,
      user,
    };
  },
  SIGN_IN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: !user,
      user,
    };
  },
  SIGN_UP: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: !user,
      user,
    };
  },
  SIGN_OUT: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: false,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  issuer: Issuer.JWT,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      let accessToken = globalThis.localStorage.getItem(TOKEN_KEY);

      if (accessToken) {
        const res = await authApi.me();
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            user: res.data.user,
            token: accessToken,
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = useCallback(
    async (email, password) => {
      const response = await authApi.signIn({ email, password });
      localStorage.setItem(TOKEN_KEY, response.data.access_token);
      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user: response.data.user,
          isAuthenticated: true,
        },
      });
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (email, password, firstName, lastName, password_confirm) => {
      let accessToken = "";
      let user = {};
      try {
        await authApi
          .signUp({
            email,
            password,
            name: firstName,
            last_name: lastName,
            phone,
            password_confirm,
          })
          .then((response) => {
            console.log(response);
            accessToken = response.token;
            user = response.user;
          });

        localStorage.setItem(TOKEN_KEY, accessToken);

        dispatch({
          type: ActionType.SIGN_UP,
          payload: {
            user,
            isAuthenticated: true,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem(TOKEN_KEY);

    dispatch({
      type: ActionType.SIGN_OUT,
      payload: {
        isAuthenticated: false,
        isInitialized: false,
        user: null,
        token: null,
      },
    });
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: Issuer.JWT,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
