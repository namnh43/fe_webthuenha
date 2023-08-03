import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import {fetchData} from "../../utils/api";
import {HostProfileContent} from "../roles/user/HostProfileContent";

export default function UserProfileDialog({open, onClose, id}) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchDataAsync = async () => {
            console.log('id',id)
            try {
                const url = 'http://localhost:8080/user/'+id; // Thay thế URL bằng API bạn muốn lấy dữ liệu
                console.log('url',url)
                const params = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }; // Các tham số truyền cho API (nếu cần)
                const fetchedData = await fetchData(url, params);
                console.log('fetchedData',fetchedData)
                setUser(fetchedData);
            } catch (error) {
                console.log(error)
            }
        }
        if (id) {
            console.log('get data')
            fetchDataAsync();
        }

    },[id])
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"

        >
            <DialogTitle id="alert-dialog-title">
                {"User Profile"}
            </DialogTitle>
            <DialogContent>
                <HostProfileContent {...user}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>OK</Button>
            </DialogActions>
        </Dialog>
    );
}
