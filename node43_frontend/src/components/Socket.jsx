import React from 'react'

import { io } from "socket.io-client";

// yarn add socket.io-client

// đối tượng socket client
const socket = io("ws://localhost:8081");

socket.on("send-socket-id", (data) => {
    // document.querySelector("#noiDung").innerHTML += data + " đã kết nối <br/> "
})

socket.on("send-number", (number) => {
    document.querySelector("#noiDung").innerHTML = number
})

const Socket = () => {
    return (
        <div className='text-white'>

            <button onClick={() => {

                socket.emit("send-click", "")

            }} >Click</button>
            <p id="noiDung">
                0
            </p>

        </div>
    )
}

export default Socket