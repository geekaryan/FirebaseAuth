import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Singup from "./components/Singup/Singup";
import { useState, useEffect } from "react";
import { auth } from "./firebase";

function App() {
  const [userName, setUserName] = useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home name={userName} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/singup",
      element: <Singup />,
    },
  ]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
      console.log(user);
    });
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
