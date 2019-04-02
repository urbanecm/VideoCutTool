var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VideoCutTool' });
});

const shell = require('shelljs');

router.post('/send', function(req, res, next) {
  console.log('Hit')
  var from_time = req.body.from_time
  var to_time = req.body.to_time
  var in_location = '/home/gopavasanth/projects/VideoCutTool/server/routes/videos/'+req.body.in_location
  var out_location = '/home/gopavasanth/projects/VideoCutTool/server/routes/cropped/'+req.body.out_location
  shell.echo(" "+from_time+" "+to_time+" "+in_location+" "+ out_location);

  //shell.exec(comandToExecute, {silent:true}).stdout;
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
  //shell.exec('./test.sh')
  res.render('index', { message:"success" });
});

router.get('/insert', function(req, res, next) {
  res.sendFile(path.join(__dirname+"/"+"htmlfiles/insert.html"));
});

// Download API
router.post('/download',function(req,res,next){

  var file_url = req.body.url;
  var download_file_wget = function(file_url) {

      // extract the file name
      var file_name = url.parse(file_url).pathname.split('/').pop();
      // compose the wget command
      var wget = 'wget -P ' + DOWNLOAD_DIR + ' ' + file_url;
      // excute wget using child_process' exec function

      var child = exec(wget, function(err, stdout, stderr) {
          if (err) throw err;
          else console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
      });
  };
  res.sendFile(path.join(__dirname+"/"+"htmlfiles/insert.html"));
})

'use strict'

const Fs = require('fs')
const Path = require('path')
const Listr = require('listr')
const Axios = require('axios')

/**
 * Start tasks to prepare or destroy data in MongoDB
 *
 * @param  {Listr} tasks  Listr instance with tasks
 * @return {void}
 */
function kickoff (tasks) {
  tasks
    .run()
    .then(process.exit)
    .catch(process.exit)
}

/**
 * Entry point for the NPM "pumpitup" and "cleanup" scripts
 * Imports movie and TV show sample data to MongoDB
 */
if (process.argv) {
  const tasks = [
    {
      title: 'Downloading images with axios',
      task: async () => {
        const url = 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Theodore_Roosevelt%27s_arrival_in_Africa.webm'
        const path = Path.resolve(__dirname, 'videos', 'video.mp4')
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
}

// router.get('/api/settings', (req, res) => ) {
//
// });
// router.post('/download', function (req, res, next) {
//     var filepathing = 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Theodore_Roosevelt%27s_arrival_in_Africa.webm';
//     var file_nameing = 'video.mp4'; // The default name the browser will use
//     console.log("Executing")
//     res.download(filepathing, file_nameing);
// });

module.exports = router;
