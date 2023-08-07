import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router";
import {HomePage} from "./pages/HomePage";
import {HouseList} from "./components/houses/HouseList";
import {RegisterPage} from "./pages/RegisterPage";
import {LoginPage} from "./pages/LoginPage";
import OwnerPage from "./pages/OwnerPage";
import OwnerHouseList from "./components/roles/owner/OwnerHouseList";
import {AdminUserList} from "./components/roles/admin/AdminUserList";
import {AdminHostList} from "./components/roles/admin/AdminHostList";
import {AdminWaitingHost} from "./components/roles/admin/AdminWaitingHost";
import OwnerAddHouseForm from "./components/roles/owner/OwnerAddHouseForm";
import {AdminPage2} from "./pages/AdminPage2";
import {UserPage} from "./pages/UserPage";
import {UserProfile} from "./components/roles/user/UserProfileContent";
import BookingHistory from "./components/roles/user/BookingHistory";
import FormWithImageUpload from "./components/demoFormUploadImg";
import OwnerEditHouseForm from "./components/roles/owner/OwnerEditHouseForm";
import {HouseDetailPage} from "./pages/HouseDetailPage";
import OwnerBookingList from "./components/roles/owner/OwnerBookingList";
import OwnerMaintenanceList from "./components/roles/owner/OwnerMaintenanceList";
import {SearchPage} from "./pages/SearchPage";
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<HomePage/>}>
              <Route path='' element={<HouseList/>}/>
          </Route>
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/houses/:id' element={<HouseDetailPage/>}/>
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
              <Route path='maintenance' element={<OwnerMaintenanceList/>}/>
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
