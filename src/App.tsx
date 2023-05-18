import AppRouter from "./config/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
