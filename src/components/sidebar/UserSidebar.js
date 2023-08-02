import {Divider, ListItemIcon, List, ListItem, ListItemButton, Drawer, Toolbar} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
export default function UserSidebar() {
    // const drawerWidth = 240;
    const [selectedItem, setSelectedItem] = useState('user-list');
    const navigate = useNavigate();
    const drawer = (<div>
        <List>
            <ListItem className="">
                <span><p className="h4">My Accounts</p></span>
            </ListItem>
            <ListItemButton
                key='profile'
                selected={selectedItem == 'profile'}
                onClick={() => {
                    setSelectedItem('profile');
                    navigate('')
                }}
            >
                    <span className="me-3">
                      <AssignmentIndIcon/>
                    </span>
                <span className="hide-menu">Profile</span>
            </ListItemButton>
            <ListItemButton
                key='profile'
                selected={selectedItem == 'booking-history'}
                onClick={() => {
                    setSelectedItem('booking-history');
                    navigate('booking-history')
                }}
            >
                <span className="me-3">
                  <FormatListBulletedIcon/>
                </span>
                <span className="hide-menu">Booking History</span>
            </ListItemButton>
        </List>
    </div>);

    return (<>
        {drawer}
    </>)
}