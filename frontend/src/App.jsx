import { Outlet } from "react-router";
import { Container, Header } from "./components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "./axios/axios.js";
import { login } from "./features/authentication/authSlice.js";
import { Error } from "./components/Error.jsx";
import { Loading } from "./components/Loading.jsx";

function App() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsLoading(true);
      setError("");
      try {
        const currentUserResponse = await axiosInstance.get(
          "/api/v1/users/current-user"
        );
        if (currentUserResponse.status === 200) {
          dispatch(login({ userData: currentUserResponse?.data?.data }));
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCurrentUser();
  }, [dispatch]);
  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      {error && <Error error={error} />}
      <Header />
      <Outlet />
    </Container>
  );
}

export default App;
