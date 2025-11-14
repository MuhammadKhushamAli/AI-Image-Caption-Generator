import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export function AuthLayout({ children, isAuthReuired = false }) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state?.auth?.loginStatus);
  useEffect(() => {
    if (isAuthReuired && !isLoggedIn) {
      navigate("/login");
    }
  }, [isAuthReuired, isLoggedIn, navigate]);

  return <>{children}</>;
}
