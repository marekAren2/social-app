import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
/* import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup'; */



function App() {
  return (
    <div className="App" >
      {/* //dlaczego Appnav przed AppRoutes? */}
      <AppNav/>
      <AppRoutes/> 
    </div>
  );
}

export default App;
    {/* <Home/>;
      <Login/>;
      <Signup/>; */}
