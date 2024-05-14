import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginRegisterProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading }: any = useAuthContext();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    router.push("/");
  }
  return <div>{children}</div>;
};

export default LoginRegisterProvider;
