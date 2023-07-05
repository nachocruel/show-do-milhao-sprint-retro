import { Server } from './server'

const server = Server.GetInstance();

export default async function (req, res) {
    const { uid, nickname, roomname, } = req.body;
    const room = server.GetRoom(roomname);
    const user =  room.GetUser(nickname);
    user.AddToListen(res);
}