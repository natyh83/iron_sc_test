const Server = require('./modules/http/server');
const InstallersCtrl = require('./controllers/installers/installers_ctrl');

class MyServer {
    constructor() {
        this.server = new Server();
        new InstallersCtrl(this.server);
    }

    start() {
        return new Promise((resolve, reject) => {
            this.server.bindHeaders();
            this.server.listen();
        })
    }
}

module.exports = MyServer;