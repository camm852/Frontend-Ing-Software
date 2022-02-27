import Routes from "./routes";
import AuthProvider, { useAuth } from "./routes/auth-context";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </AuthProvider>
  );
}

export default App;
