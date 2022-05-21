import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenicated-app";
import { ErrorBoundary } from "components/error-bundary";
import { FullPageErrorFullback } from "components/lib";

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFullback}>
        {
          user
            ? <AuthenticatedApp />
            : <UnauthenticatedApp />
        }
      </ErrorBoundary>
    </div>
  );
}

export default App;
