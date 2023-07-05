export class User {
    uid;
    username;
    totalScore;
    turn;
    is_admin;
    response_listen = [];

    constructor(username, turn=false, is_admin=false) {
        this.username = username;
        this.totalScore = 0;
        this.turn = turn;
        this.is_admin = is_admin;
        this.uid = this.generateUserId();
    }

    generateUserId() {
        var w = () => { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }
        return  `${w()}${w()}-${w()}-${w()}-${w()}-${w()}${w()}${w()}`;
    }

    AddToListen(res) {
        this.response_listen(res);
    }

    GetResponse() {
        return this.response_listen.pop();
    }

    AddScore(score) {
        this.totalScore += score;
    }
}