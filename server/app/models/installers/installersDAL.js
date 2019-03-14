const fs = require('fs');
const path = require('path');

class InstallersDAL {

    constructor(){
        this.dbPath = `${path.resolve(__dirname)}/../../db/installers.json`;
    }

    /**
     * adding db entry with filePath as index
     *
     * @param installer
     * @returns {Promise<any>}
     */
    addInstaller(installer, entry){
        return new Promise(async (resolve, reject) => {
            try {
                let {url, filePath} = installer;
                const installersDB = JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
                if (installersDB[entry]) {
                    let done = false;
                    let i = 1;
                    while (!done) {
                        const fileName = path.parse(entry).name;
                        const ext = path.parse(entry).ext;

                        entry = `${fileName}_${i}${ext}`;
                        if (!installersDB[entry]) {
                            installersDB[entry] = url;
                            done = true;
                        }
                        i++;
                    }
                } else {
                    installersDB[entry] = url;
                }
                fs.writeFileSync(this.dbPath, JSON.stringify(installersDB));
                resolve(entry);
            } catch (e) {
                reject(e);
            }
        })
    }


}

module.exports=InstallersDAL;