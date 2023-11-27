import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
/* import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup'; */



function App() {
  // 18:25 user setUser
  //22:17 przy starcie pobieram z localStorage w f12/aplikacja
  return (
    <div className="App" >
      {/* //dlaczego Appnav przed AppRoutes? */}
      <AppNav/>
      <AppRoutes/> 
      {/* //do routes przepuszczam */}
    </div>
  );
}

export default App;
    {/* <Home/>;
      <Login/>;
      <Signup/>; */}
