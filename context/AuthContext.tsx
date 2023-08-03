import { createContext, useEffect, useReducer } from "react";

let localUser = null;

if (typeof window !== 'undefined') {
    localUser = JSON.parse(localStorage.getItem("user") as string) || null;
}

const INITIAL_STATE = {
    user: localUser,
    loading: false,
    error: null,
    dispatch: null
};

type authContextType = {
    user: string | null,
    loading: boolean,
    error: string | null,
    dispatch: any
};

export const AuthContext = createContext<authContextType>(INITIAL_STATE);

const AuthReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
            }
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

type Props = {
    children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};