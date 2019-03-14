const InstallersSrv = require('../../services/installers/installers_srv');

class InstallersCtrl {

    constructor(server){
        this.app = server.app;
        this.routes();
        this.installersSrv = new InstallersSrv();
    }

    /**
     * /api/groups - Get groups by title
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
     async add(req, res){
        try {
            const res = await this.installersSrv.add(req.body);
            return res.status(200).json({code: 200});
        } catch (e) {
            console.error(e);
            return res.status(200).json({code: 400, error: ""});
        }
    }

    routes() {
        this.app.post('/api/installers', async (req, res) => {
            await this.add(req, res);
        });
    }
}

module.exports=InstallersCtrl;