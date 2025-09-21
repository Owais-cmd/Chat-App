import React, { use } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useClient } from '../store/useClient.js';
import {createRoom , isPresent} from '../utils/Rooms.js'

export const HomePage = () => {
    const {setRoomId, setName} = useClient();
    var userName = null;
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        if (room === "") {
            alert("Room ID is required");
            return;
        }
        if (!isPresent(room)) {
            alert("Room ID not present");
            return;
        }
        userName = prompt("Please enter your name:");
        if(userName === "" || userName === null){
            alert("Name is required");
            return;
        }
        setName(userName);
        setRoomId(room);
        navigate(`/room/${room}`);
    }

    const handleCreate = () => {
        const roomId = createRoom();
        userName = prompt("Please enter your name:");
         if(userName === "" || userName === null){
            alert("Name is required");
            return;
        }
        setName(userName);
        setRoomId(roomId);
        navigate(`/room/${roomId}`);
    }

    return (
        <div className="relative h-screen">

            <div className="absolute inset-0">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
                <div className="max-w-3xl text-center">
                    <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-slate-900">
                        Connect with
                        <span className="text-sky-900"> Friends</span>
                    </h1>
                    <p className="mx-auto mb-5 max-w-2xl text-lg text-slate-700">
                        chat application that allows users to connect and communicate in real-time.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <input type="text" name="roomId" onChange={(e) => {setRoom(e.target.value) }} placeholder="Room ID" className="w-60 rounded-lg border border-slate-200 px-4 py-3 text-slate-900 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500" />
                        <button className="rounded-lg px-6 py-3 font-medium bg-sky-900 text-white hover:bg-sky-800" onClick={handleClick}>
                            Join Room
                        </button>
                    </div>
                    
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-96 h-px my-2 bg-gray-200 border-0 dark:bg-sky-900"></hr>
                            <span className="absolute px-3 pb-1 font-medium text-sky-900 -translate-x-1/2 bg-white left-1/2 ">or</span>
                    </div>

                    <div className='flex justify-center gap-4 items-center mt-2'>
                        <button className="rounded-lg px-6 py-3 font-medium bg-sky-900 text-white hover:bg-sky-800 mb-4" onClick={handleCreate}>Create a Room</button>
                        <p className="text-lg text-slate-900 pb-3">Dont have a Room ?</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
