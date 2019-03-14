const CronJob = require('cron').CronJob;
const CronsHandler = require('./crons_handler');

const cronsHandler = new CronsHandler();

const inputUrl = "https://ic-ai.com/candidate/get_urls.php";
// const inputUrl = "http://dnld.iccustapps.com.s3.amazonaws.com/Testing/malavida_Downloader_v1.0.15.29144_389.exe";

new CronJob('* 5 * * * *', cronsHandler.fetchInstallers(), null, true, null, null, true);