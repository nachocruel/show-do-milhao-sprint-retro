import { User } from '../users/user'
export class Room {
    admin;
    roomname;
    members;
    index = 1;
    constructor(roomname='sprint_retro') {
        this.roomname = roomname;
        this.members = [];
    }

    addMember(username) {
        if(this.members.find(user => user.username == username))
            throw Error(`NickName '${username}' Already exist in the Room`);

        if(this.members.length == 0) 
        {
            this.admin = new User(username, false, true);
            this.members.push(this.admin);
        }
        else if(this.members.length == 1)
            this.members.push(new User(username, true));
        else
            this.members.push(new User(username))
    }

    GetUser(username) {
        return this.members.find(user => user.username == username);
    }

    getMembers() {
        return this.members;
    }

    GetUserThatIsTurn() {
        return this.members.find(user => user.turn == true);
    }

    SetNext() {
        if(this.members.length <= 2)
            throw Error("It must have at least 3 members room.");

        if(this.index < this.members.length - 1)
        {
            this.members[this.index].turn = false;
            this.index++;
            this.members[this.index].turn = true;
        } else {
            this.members[this.index].turn = false;
            this.index = 1;
            this.members[this.index].turn = true;
        }
    }

}