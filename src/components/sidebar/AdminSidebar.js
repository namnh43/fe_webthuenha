import {List, ListItem, ListItemButton} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import VillaIcon from '@mui/icons-material/Villa';

export function AdminSidebar() {
    // const drawerWidth = 240;
    const [selectedItem, setSelectedItem] = useState('user-list');
    const navigate = useNavigate();
    const drawer = (<div>
        <List>
            <ListItem className="">
                <span><p className="h4">USERS</p></span>
            </ListItem>
            <ListItemButton
                key='user-list'
                selected={selectedItem === 'user-list'}
                onClick={() => {
                    setSelectedItem('user-list');
                    navigate('users')
                }}
            >
                    <span className="me-3">
                      <GroupOutlinedIcon/>
                    </span>
                <span className="hide-menu">User List</span>
            </ListItemButton>
            <ListItemButton
                key='user-list'
                selected={selectedItem === 'host-list'}
                onClick={() => {
                    setSelectedItem('host-list');
                    navigate('hosts')
                }}
            >
                <span className="me-3">
                  <VillaIcon/>
                </span>
                <span className="hide-menu">Host List</span>
            </ListItemButton>
            <ListItemButton
                key='user-list'
                selected={selectedItem === 'waiting-list'}
                onClick={() => {
                    setSelectedItem('waiting-list');
                    navigate('waiting-hosts');
                }}
            >
                    <span className="me-3">
                      <AccessAlarmIcon/>
                    </span>
                <span className="hide-menu">Waiting Lounge</span>
            </ListItemButton>
        </List>
    </div>);

    return (<>
        {drawer}
    </>)
}