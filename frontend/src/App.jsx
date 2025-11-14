import { Outlet } from "react-router";
import { Container, Header } from "./components";

function App() {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default App;
