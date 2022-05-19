import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenicated-app";

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {
        user
          ? <AuthenticatedApp />
          : <UnauthenticatedApp />
      }
    </div>
  );
}

export default App;
