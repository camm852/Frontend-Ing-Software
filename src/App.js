import Routes from "./routes";
import AuthProvider, { useAuth } from "./routes/auth-context";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
