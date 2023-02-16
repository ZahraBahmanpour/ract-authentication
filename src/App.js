import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tabs from "./components/tabs/Tabs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Container className="mt-2">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path=":id" element={<Tabs />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
