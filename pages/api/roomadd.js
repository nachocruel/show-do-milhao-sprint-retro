
import { Room } from './domain/rooms/room';
import { Server } from './server'

const rooms = []
rooms.push(new Room())
const server = Server.GetInstance();
server.AddRoom("sprint_retro");

export default async function (req, res) {
    let { roomname, username } = req.body;

    username = username || '';
    if (username.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "informe a username!",
            }
        });
        return;
    }

    const room = server.GetRoom(roomname);
    if(!room) {
        res.status(404).json({
            error: {
                message: "Room Not found"
            }
        });
        return;
    }

    try {
        room.addMember(username);
    } catch (error) {
        res.status(404).json({
            error: {
                message: error.message
            }
        });
    }

    res.status(200).json({result: JSON.stringify(room.getMembers())});
}