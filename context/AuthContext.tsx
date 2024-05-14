"use client";
import { account } from "@/config/appwrite.config";
import {
  checkExistingUser,
  createUserAccount,
  getAccount,
  getCurrentUser,
  signOutAccount,
  emailSignIn,
  emailSignUp,
} from "@/lib/appwrite/api";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

type AuthProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthProps) => {
  const initialized = useRef(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const logout: () => void = async () => {
    await signOutAccount();
    setUser(null);
    router.push("/");
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await emailSignIn({ email, password });
    const res = await getAccount();
    fetchData({ res });
    //console.log(res);
  };

  const signup = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    await emailSignUp({ email, password, name });
    const res = await getAccount();
    fetchData({ res });
    //console.log(res);
  };

  const fetchData = async ({ res }: { res: any }) => {
    const userExists = await checkExistingUser({ currentAccount: res });
    const fetchCurrentUser = await getCurrentUser({ currentAccount: res });

    if (!userExists) {
      createUserAccount({ currentUser: res }).then((data) => {
        setUser(data);
        setLoading(false);
      });
    } else {
      setUser(fetchCurrentUser);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // make use effect render only once
      getAccount()
        .then((res) => {
          //console.log(res);
          if (res === undefined) {
            setUser(null);
            alert("there was some error from Apprite");
            setLoading(false);
          } else {
            fetchData({ res });
          }
        })
        .catch((err) => {
          console.log(err);
          setUser(null);
          router.push("/");
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
