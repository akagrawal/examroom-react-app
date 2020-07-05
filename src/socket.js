
import {Socket} from "../node_modules/phoenix/assets/js/phoenix.js"
console.log("someone entered")
let socket = new Socket("ws://localhost:4000/socket", {params: {"user": "123"}})
socket.connect()
let lobbychannel = socket.channel("room:lobby", {})
    lobbychannel.join()
    .receive("ok", ()=>{console.log("someone joined lobby")})
export {socket, lobbychannel}
