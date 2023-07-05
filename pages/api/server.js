import { Room } from "./domain/rooms/room";

export class Server {
    server = null;
    rooms = []
    static GetInstance() {
        if(this.server==null)
            this.server = new Server();
        return this.server;
    }

    GetRoom(name) {
        return this.rooms.find(room => room.roomname == name)
    }

    ClearRooms() {
        this.rooms = [];
    }

    AddRoom(roomname) {
        this.rooms.push(new Room(roomname))
    }
}