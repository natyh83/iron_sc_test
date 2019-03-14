const async = require('async');
const path = require('path');
const fs = require('fs');
const InstallersDAL = require('../../models/installers/InstallersDAL');
const EmailProvider = require('../../modules/email_provider/email_provider');


class InstallersSrv {
constructor(){
    this.localFilesPath = `${path.resolve(__dirname)}/../../files/`;
    this.installersDAL = new InstallersDAL();
    this.emailProvider = new EmailProvider();
}


    /**
     * /api/groups - Get groups by title
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async add(installersData) {
        return new Promise(async (resolve, reject) => {
            try {
                //save input
                //send email
                await this.saveInstallers(installersData);
                resolve();
            } catch (e) {
                reject(e);
            }
        })
    }

    async saveInstallers(installersData) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(`adding ${installersData.length} installers`);

                await async.forEachOf(installersData, async (installer, index) => {
                    const {url,fileContent} = installer;
                    let fileName = this.extractFileName(url);

                    const filePath = await this.installersDAL.addInstaller(installer, fileName);

                    const res = await fs.writeFileSync(`${this.localFilesPath}/${filePath}`, fileContent);
                    console.log(`file write success: ${fileName}`);
                }, async (e) => {
                    if (e) {
                        console.error(e);
                        return reject(e);
                    }else{
                        return resolve();
                    }

                })
            } catch (e) {
                reject(e);
            }
        })
    }


    extractFileName(filePath) {
        const filePathArr = filePath.split("/");
        return filePathArr[filePathArr.length - 1];
    }


    // async sendEmail(data) {
    //     try {
    //        this.emailProvider.send();
    //
    //     } catch (e) {
    //        reject(e);
    //     }
    // }
}

module.exports = InstallersSrv;