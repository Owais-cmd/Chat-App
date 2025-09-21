var rooms =new Set()

export const isPresent=(roomId)=>{
    return rooms.has(roomId)
}

export const createRoom=()=>{
    let roomId = Math.random().toString(36).substring(2,7)
    while(isPresent(roomId)){
        roomId = Math.random().toString(36).substring(2,7)
    }
    rooms.add(roomId)
    return roomId
}