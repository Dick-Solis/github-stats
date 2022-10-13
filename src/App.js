import "./App.css";
import AuthenticatedApp from "./AuthenticatedApp";
import { useAuth } from "./context/auth-context";
// import { SearchUsers } from "./pages/search-users";
import UnauthenticatedApp from "./UnauthenticatedApp";

function App() {
  const { user } = useAuth();
  
  return user ? (
    <AuthenticatedApp/>
  ) : (
    <UnauthenticatedApp/>
  );
}

export default App;
