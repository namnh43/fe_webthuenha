import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Constants from "../../utils/constants";
import Stomp from "stompjs";
import { SnackbarProvider, useSnackbar } from 'notistack';
// import {connect_to_socket, connect_to_socket_then_booking} from "../../utils/websocket";

export default function WebsocketComponent() {
    const [login,setLogin] = useState(false);
    const [stompClient,setStompClient] = useState(null);
    const [displayAlert,setDisplayAlert] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const handle_booking = (message) => {
        console.log('handle result from booking 123'+ message);
        setDisplayAlert(true);

    }
    const connect_to_socket_then_booking = async (userId,callback) => {
        try {
            const socket =new SockJS(Constants.WS_URL);
            const stomp = Stomp.over(socket);
            stomp.connect({},()=> {
                setStompClient(stomp);
                const subscribeURL = "/users/" + userId + "/booking"
                stomp.subscribe(subscribeURL,callback);
            })
        }catch (error) {
            console.log("error when connect to socket");
            throw error;
        }
    }
    useEffect(()=> {
        //check if login
        const currentUserId = localStorage.getItem('currentUserId');
        connect_to_socket_then_booking(currentUserId, handle_booking).then(() => {
            console.log('finish booking');
        });
    },[])
    return (
        <>
        </>
    )

}