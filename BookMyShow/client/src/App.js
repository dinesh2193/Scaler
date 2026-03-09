import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedComponent from './components/ProtectedRoute';
import { Provider } from "react-redux";
import store from "./redux/store";
import Admin from './pages/Admin';
import Partner from './pages/Partner';
import Profile from './pages/User';
import SingleMovie from './pages/Home/SingleMovie';
import BookShow from './pages/Home/BookShow';
import ForgotPassword from './pages/Login/ForgotPassword';
import ResetPasswordPage from './pages/Login/ResetPassword';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <ProtectedComponent>
                <Home />
              </ProtectedComponent>
              } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:email" element={<ResetPasswordPage />} />
            <Route path="/admin" element={
              <ProtectedComponent>
                <Admin />
              </ProtectedComponent>
            } />
            <Route path="/partner" element={
              <ProtectedComponent>
                <Partner />
              </ProtectedComponent>
            } />
            <Route path="/profile" element={
              <ProtectedComponent>
                <Profile />
              </ProtectedComponent>
            } />
            <Route path="/movie/:id" element={
              <ProtectedComponent>
                <SingleMovie />
              </ProtectedComponent>
            } />
            <Route path="/book-show/:showId" element={
              <ProtectedComponent>
                <BookShow />
              </ProtectedComponent>
            } />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
