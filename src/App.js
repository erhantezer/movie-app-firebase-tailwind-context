import AuthContextProvider from "./context/AuthContextProvider";
import AppRouter from "./router/AppRouter";


function App() {

  return (
    <div className="dark:bg-[#23242a]">
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
    </div>

  );
}

export default App;
