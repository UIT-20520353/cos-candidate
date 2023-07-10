import AppRouter from "./config/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className={"w-full"}>
      <AppRouter />
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} closeOnClick={false} draggable={false} />
    </div>
  );
}

export default App;
