import { Outlet } from "react-router";
import { Container, Header } from "./components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "./axios/axios.js";
import { login } from "./features/authentication/authSlice.js";
import { Error } from "./components/Error.jsx";

function App() {
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(async () => {
    setError('');
    try {
      const currentUserResponse = await axiosInstance.get("/api/v1/users/current-user");
      
      if(currentUserResponse.statusCode === 200)
      {
        dispatch(login({userData: currentUserResponse?.data}));
      }
      
    } catch (error) {
      setError(error);
    }
  }, [])
  return (
    <Container>
      {error && <Error error={error} />}
      <Header />
      <Outlet />
    </Container>
  );
}

export default App;
