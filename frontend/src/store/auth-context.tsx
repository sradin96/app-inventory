import axios from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { User } from "../types/types";

type AuthContextProps = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: string;
  userId: number | undefined;
  token: string;
  role: string;
  setUser: Dispatch<SetStateAction<string>>;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
  setUserExist: Dispatch<SetStateAction<boolean>>;
  handleLogout: () => void;
  userIsAdmin: boolean;
  currentUser: User | undefined;
};

export const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  setIsAuth: () => {},
  userIsAdmin: false,
  user: "",
  token: "",
  role: "",
  userId: undefined,
  setUser: () => "",
  setCurrentUser: () => {},
  setUserExist: () => {},
  handleLogout: () => {},
  currentUser: {
    id: undefined,
    username: "",
    email: "",
    address: undefined,
    city: undefined,
    phone: undefined,
    zipcode: undefined,
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, removeCookie] = useCookies([
    "role",
    "token",
    "user",
    "userId",
  ]);
  const [isAuth, setIsAuth] = useState(!!cookies.token);
  const [user, setUser] = useState(cookies.user);
  const [userId, setUserId] = useState(cookies.userId);
  const token = cookies.token;
  const role = cookies.role;
  const userIsAdmin = role === "admin";
  const [userExist, setUserExist] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleLogout = useCallback(() => {
    removeCookie("token", "");
    removeCookie("user", "");
    removeCookie("role", "");
    setIsAuth(false);
    setUser(undefined);
    setUserId(undefined);
    navigate("/korisnik");
  }, [removeCookie]);

  useEffect(() => {
    const getUserFromCookies = () => {
      const userData = {
        user: cookies.user,
        role: cookies.role,
        userId: cookies.userId,
        token: cookies.token,
      };
      return userData;
    };

    const checkCookies = () => {
      const userData = getUserFromCookies();

      if (!userData.token) {
        setIsAuth(false);
        setUser(undefined);
        setUserExist(false);
        setUserId(undefined);
      } else {
        setIsAuth(true);
        setUser(userData.user);
        setUserExist(true);
        setUserId(userData.userId);
      }
    };

    checkCookies();

    const interval = setInterval(checkCookies, 1800000);

    return () => clearInterval(interval);
  }, [cookies.token, cookies.user, setIsAuth, setUser, setUserExist]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${userId}`
        );
        setCurrentUser(response.data as User);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [cookies.token, cookies.user]);

  const values = useMemo(() => {
    return {
      currentUser,
      setCurrentUser,
      userId,
      isAuth,
      setIsAuth,
      user,
      token,
      role,
      userExist,
      setUser,
      setUserExist,
      handleLogout,
      userIsAdmin,
    };
  }, [currentUser, userId, isAuth, user, userExist, role, token, userIsAdmin]);
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
