const request = require('request');
const async = require('async');

class CronsHandler {

    constructor(){
        this.inputUrl = "https://ic-ai.com/candidate/get_urls.php";
        this.destServerUrl = "http://localhost:8282/api/installers";
    }


    async callEndpoint(path) {
        return new Promise(async (resolve, reject) => {
            try {
                request(path, {json: true}, (err, res, body) => {
                    if (err || res.statusCode !== 200) {
                        console.error(err);
                        return reject();
                    } else {
                        resolve(res.body);
                    }
                })
            } catch (e) {
                reject(e)
            }
        })
    }

    async postData(body, url) {
        return new Promise(async (resolve, reject) => {
            try {
                body = JSON.stringify(body)
                request.post({
                        headers: {'content-type' : "application/json"},url, body
                    },
                    (e, response, body)=>{
                        if(e){
                            console.error(e)
                            return reject();
                        }else{
                            resolve();
                        }
                    });
            } catch (e) {
                reject(e)
            }
        })
    }



    async fetchInstallers() {
        return new Promise(async (resolve, reject) => {
            try {
                const installersUrls = await this.callEndpoint(this.inputUrl);
                const installers = [];

                await async.forEachOf(installersUrls, async (url) => {
                    try {
                        let fileContent = await this.callEndpoint(url);
                        installers.push({
                            url, fileContent
                        })
                    } catch (e) {
                        console.error(e);
                    }
                }, async (e) => {
                    if (e) {
                        console.error(e);
                    }
                    await this.postData(installers,this.destServerUrl);
                    resolve();
                })
            } catch (e) {
                reject(e)
            }
        })
    }

}

module.exports = CronsHandler;

// return new Promise(async (resolve, reject) => {
//     try {
//
//     } catch (e) {
//         reject(e)
//     }
// })

