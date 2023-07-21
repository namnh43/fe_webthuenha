import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router";
import {HomePage} from "./pages/HomePage";
import {HouseList} from "./components/HouseList";
import {RegisterPage} from "./pages/RegisterPage";
import {LoginPage} from "./pages/LoginPage";
import {AdminPage} from "./pages/AdminPage";
import OwnerPage from "./pages/OwnerPage";
import OwnerAddHouseForm from "./components/OwnerAddHouseForm";
import OwnerHouseList from "./components/OwnerHouseList";
import UploadImageField from "./UploadImageField";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<HomePage/>}>
              <Route path='' element={<HouseList/>}/>
          </Route>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/admin' element={<AdminPage/>}>

          </Route>
          <Route path='/owner' element={<OwnerPage/>}>
              <Route path='' element={<OwnerHouseList/>}/>
              <Route path='add-house-form' element={<OwnerAddHouseForm/>}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
