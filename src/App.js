import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router";
import {HomePage} from "./pages/HomePage";
import {HouseList} from "./components/HouseList";
import {RegisterPage} from "./pages/RegisterPage";
import {LoginPage} from "./pages/LoginPage";
import {AdminPage} from "./pages/AdminPage";
import OwnerPage from "./pages/OwnerPage";
import OwnerHouseList from "./components/OwnerHouseList";
import {AdminUserList} from "./components/AdminUserList";
import {AdminHostList} from "./components/AdminHostList";
import {AdminWaitingHost} from "./components/AdminWaitingHost";
import {HouseDetail} from "./components/HouseDetail";
import TestJS from "./components/test";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<HomePage/>}>
              <Route path='' element={<HouseList/>}/>
              <Route path='/detail/:id' element={<HouseDetail/>}/>
          </Route>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/admin' element={<AdminPage/>}>
                <Route path='users' element={<AdminUserList/>}/>
                <Route path='hosts' element={<AdminHostList/>}/>
                <Route path='waiting-hosts' element={<AdminWaitingHost/>}/>
          </Route>
          <Route path='/owner' element={<OwnerPage/>}>
              <Route path='' element={<OwnerHouseList/>}/>
          </Route>
          <Route path='/test' element={<TestJS/>}/>
      </Routes>
    </div>
  );
}

export default App;
