var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VideoCutTool' });
});

const Fs = require('fs')
const Path = require('path')
const Listr = require('listr')
const Axios = require('axios')
const shell = require('shelljs');


/**
 * Start tasks to prepare or destroy data in MongoDB
 *
 * @param  {Listr} tasks  Listr instance with tasks
 * @return {void}
 */
function kickoff (tasks) {
    tasks.run()
    tasks.then(console.log("downloaded."))
    .catch(process.exit)
}

router.post('/send', function(req, res, next) {
  console.log('Hit')
  var from_time = req.body.from_time
  var to_time = req.body.to_time
  var inputVideoUrl = req.body.inputVideoUrl

  var hash_name = 'unique_hash'
  const tasks = [
    {
      title: 'Downloading your video',
      task: async () => {
        const url = req.body.inputVideoUrl
        const path = Path.resolve(__dirname, 'videos',  hash_name + '.mp4')
        const writer = Fs.createWriteStream(path)

        const response = await Axios({
          url,
          method: 'GET',
          responseType: 'stream'
        })

        response.data.pipe(writer)

        return new Promise((resolve, reject) => {
          writer.on('finish', resolve)
          writer.on('error', reject)
        })
      }
    }
  ]

  kickoff(new Listr(tasks))

  var in_location = '/home/gopavasanth/projects/VideoCutTool/server/routes/videos/'+ unique_hash + '.mp4'
  var out_location = '/home/gopavasanth/projects/VideoCutTool/server/routes/cropped/'+ unique_hash + '_trimmed.mp4'
  shell.echo(" "+from_time+" "+to_time+" "+in_location+" "+ out_location);

  // shell.exec(comandToExecute, {silent:true}).stdout;
    // var cmd = '. /home/gopavasanth/projects/VideoCutTool/server/routes/script.sh '+from_time+' '+to_time+' '+in_location+' '+out_location;
    var cmd = 'ffmpeg -i ' + in_location +' -ss ' + from_time + ' -t '+ to_time + ' -async 1 ' + out_location;
    console.log("Command" +  cmd);
    shell.echo(cmd);
    if ( shell.exec(cmd,(error, stdout, stderr) => {
            console.log(stdout);
            console.info("Program Started");
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
  }).code !== 0 ) {
    shell.echo("Error");
  }
  res.render('index', { message:"success" });
});

router.get('/insert', function(req, res, next) {
  res.sendFile(path.join(__dirname+"/"+"htmlfiles/insert.html"));
});

module.exports = router;
