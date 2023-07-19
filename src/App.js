import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router";
import {Home} from "./pages/Home";
import {HouseList} from "./components/HouseList";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Home/>}>
              <Route path='' element={<HouseList/>}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
