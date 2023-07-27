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
import OwnerAddHouseForm from "./components/OwnerAddHouseForm";
import {AdminPage2} from "./pages/AdminPage2";
import {UserPage} from "./pages/UserPage";
import {UserProfile} from "./components/user/UserProfileContent";
import BookingHistory from "./components/user/BookingHistory";
import FormWithImageUpload from "./components/demoFormUploadImg";
import OwnerEditHouseForm from "./components/user/OwnerEditHouseForm";
import {HouseDetailPage} from "./pages/HouseDetailPage";
import OwnerBookingList from "./components/OwnerBookingList";
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<HomePage/>}>
              <Route path='' element={<HouseList/>}/>
          </Route>
          <Route path='/houses/:id/detail' element={<HouseDetailPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/admin' element={<AdminPage2/>}>
                <Route path='users' element={<AdminUserList/>}/>
                <Route path='hosts' element={<AdminHostList/>}/>
                <Route path='waiting-hosts' element={<AdminWaitingHost/>}/>
          </Route>
          <Route path='/owner' element={<OwnerPage/>}>
              <Route path='' element={<OwnerHouseList/>}/>
              <Route path='add-house-form' element={<OwnerAddHouseForm/>}/>
              <Route path='edit-house-form/:houseId' element={<OwnerEditHouseForm/>}/>
              <Route path='booking' element={<OwnerBookingList/>}/>
          </Route>
          <Route path='/user' element={<UserPage/>}>
              <Route path='' element={<UserProfile/>}/>
              <Route path='booking-history' element={<BookingHistory/>}/>
          </Route>
          <Route path='/test' element={<FormWithImageUpload/>}/>
      </Routes>
    </div>
  );
}

export default App;
