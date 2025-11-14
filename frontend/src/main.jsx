import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Login } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <>
          </>
          // <IsAuth>
          //   <Home />
          // </IsAuth>
        ),
      },
      {
        path: "/signup",
        element: (
          <>
          </>
          // <IsAuth>
          //   <SignUp />
          // </IsAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <Login />
          // <IsAuth>
          //   <Login />
          // </IsAuth>
        ),
      },
      {
        path: "/history",
        element: (
          <>
          </>
          // <IsAuth>
          //   <History />
          // </IsAuth>
        ),
      },
      {
        path: "/chat:chatID",
        element: (
          <>
          </>
          // <IsAuth>
          //   <Chat />
          // </IsAuth>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);
