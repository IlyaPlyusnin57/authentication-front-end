import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import RequireAuth from "./RequireAuth";
import FormContainer from "./components/FormContainer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormContainer />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
