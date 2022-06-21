import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CreateReport from "./pages/CreateReport";
import Home from "./pages/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ReactRoutes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-report" element={<CreateReport />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
