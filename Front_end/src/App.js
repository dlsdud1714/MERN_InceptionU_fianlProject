import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginForm from "./components/authentication/LoginForm";

import RequireAuth from "./components/authentication/RequireAuth";
import LoginProvider from "./components/authentication/LoginProvider";

import MonthlyCalendar from "./components/calendar/monthlyCalendar/MonthlyCalendar";
// import DisplayHolidays from "./components/calendar/monthlyCalendar/DisplayHolidays"
import Calendar from "./pages/calendar/Calendar";
import Logout from "./components/authentication/Logout";
import ProfileSelection from "./components/authentication/LocationSelection";
import { StoreProvider } from "./components/authentication/StoreProvider";

import Messenger from "./pages/messanger/Messenger";

import AdminSchedule from "./pages/adminSchedule/AdminSchedule";
import MessageProvider, {
  MessageContext,
} from "./components/messaging/MessageContext";
import PrivateRoute from "./components/authentication/PrivateRoute";
import Contacts from "./pages/messanger/Contacts";

const SERVER = "http://localhost:4000";

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <StoreProvider>
          <MessageProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                {/* <Route path="/location" element={<Location />} /> */}
                <Route path="/selection" element={<ProfileSelection />} />

                <Route path="/coworkers" element={<Contacts />} />

                <Route path="/messenger" element={<Messenger />} />
                <Route
                  path="/calendar"
                  element={<Navigate replace to="/calendar/weekly" />}
                />
                {/* <Route
                  path="/calendar/*"
                  element={<PrivateRoute element={<Calendar />} />}
                /> */}
                <Route path="/calendar/*" element={<Calendar />} />

                <Route path="/" element={<LoginForm />} />
                <Route path="/logout" element={<Logout />} />

                {/* admin route */}
                {/* <Route
                  path="/admin/schedule"
                  mustBeAdmin
                  element={<PrivateRoute element={<AdminSchedule />} />}
                /> */}
                <Route path="/admin/schedule" element={<AdminSchedule />} />

                {/* <Route path="/events" element={<DisplayHolidays />} /> */}
              </Routes>
            </BrowserRouter>
          </MessageProvider>
        </StoreProvider>
      </LoginProvider>
    </div>
  );
}

export default App;
