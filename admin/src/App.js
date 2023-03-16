import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import ListHotel from "./pages/listHotel/ListHotel";
import SingleHotel from "./pages/singleHotel/SingleHotel";
import ListRoom from "./pages/listRoom/ListRoom";
import SingleRoom from "./pages/singleRoom/SingleRoom";
import UpdateUser from "./pages/updateUser/UpdateUser";
import UpdateHotel from "./pages/updateHotel/UpdateHotel";
import UpdateRoom from "./pages/updateRoom/UpdateRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:userId"
                element={
                  <ProtectedRoute>
                    <UpdateUser inputs={userInputs} title="Update User"/>
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    {/* <List columns={hotelColumns} /> */}
                    <ListHotel columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="find/:hotelId"
                element={
                  <ProtectedRoute>
                    <SingleHotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel  />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:hotelId"
                element={
                  <ProtectedRoute>
                    <UpdateHotel title="Update Hotel"/>
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    {/* <List columns={roomColumns} /> */}
                    <ListRoom columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":roomId"
                element={
                  <ProtectedRoute>
                    <SingleRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom  />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:roomId"
                element={
                  <ProtectedRoute>
                    <UpdateRoom title="Update Room"/>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
