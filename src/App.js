import AuthContextProvider from "./context/AuthContextProvider";
import AppRouter from "./router/AppRouter";


function App() {

  return (
    <div>
    <AuthContextProvider>
      <AppRouter/>
    </AuthContextProvider>
      
    </div>
  );
}

export default App;
