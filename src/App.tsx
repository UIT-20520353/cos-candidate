import AppRouter from "./config/AppRouter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userLogin } from "./pages/login/user.reducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("id")) {
      dispatch(userLogin({ id: localStorage.getItem("id"), name: localStorage.getItem("name") }));
    }
  }, []);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
