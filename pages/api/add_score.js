import { Server } from './server';
const server = Server.GetInstance();

export default async function (req, res) {
    console.log(req.body)
    const { username, roomname, score } = req.body;
    if (username.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please informe username",
            }
        });
        return;
    }

    if (roomname.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please informe roomname",
            }
        });
        return;
    }


    const room = server.GetRoom(roomname);
    const user = room.GetUserThatIsTurn();
    user.AddScore(score);
    try {
        room.SetNext();
        res.status(200).json(room.getMembers())
    } catch (error) {
        console.error(error)
        res.status(400).json({
            error: {
                message: error.message,
            }
        });
    }
}