import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Route, Router, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
function App() {
  const { user } = useContext(Context);
  return (
    <>
      <TopBar />

      <Routes>
        <Route
          index
          element={
            <>
              <Home />
            </>
          }
        />
        <Route path={"/login"} element={user ? <Home /> : <Login />} />
        <Route path={"/register"} element={user ? <Home /> : <Register />} />
        <Route path={"/write"} element={user ? <Write /> : <Register />} />
        <Route
          path={"/settings"}
          element={user ? <Settings /> : <Register />}
        />
        <Route path={"/posts/:postID"} element={<Single />} />
      </Routes>
    </>
  );
}
export default App;
