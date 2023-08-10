import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Constants from "./constants";
// export const connect_to_socket_then_booking = async (userId,callback) => {
//     try {
//         const socket =new SockJS(Constants.WS_URL);
//         const stomp = Stomp.over(socket);
//         stomp.connect({},()=> {
//             const subscribeURL = "/users/" + userId + "/booking"
//             stomp.subscribe(subscribeURL,callback);
//         })
//
//     }catch (error) {
//         console.log("error when connect to socket");
//         throw error;
//     }
// }