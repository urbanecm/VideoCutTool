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
  var in_location = '/home/gopavasanth/projects/'+req.body.in_location
  var out_location = '/home/gopavasanth/projects/'+req.body.out_location
  shell.echo(" "+from_time+" "+to_time+" "+in_location+" "+ out_location);

  //shell.exec(comandToExecute, {silent:true}).stdout;
    // var cmd = '. /home/gopavasanth/projects/VideoCutTool/server/routes/script.sh '+from_time+' '+to_time+' '+in_location+' '+out_location;
    var cmd = 'ffmpeg -i ' + in_location +' -ss ' + from_time + ' -t '+ to_time + ' -async 1 ' + out_location;
    console.log("Command" +  cmd);
    shell.echo(cmd);
    if ( shell.exec(cmd,
  (error, stdout, stderr) => {
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

router.post('/download',function(req,res,next){
  var fs = require('fs');
  var url = require('url');
  var http = require('http');
  var exec = require('child_process').exec;
  var spawn = require('child_process').spawn;

// App variables
var file_url = req.body.url;
var DOWNLOAD_DIR = './downloads/';

// We will be downloading the files to a directory, so make sure it's there
// This step is not required if you have manually created the directory
var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
var child = exec(mkdir, function(err, stdout, stderr) {
    if (err) throw err;
    else download_file_httpget(file_url);
});

// Function to download file using HTTP.get
var download_file_httpget = function(file_url) {
var options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname
};

var file_name = url.parse(file_url).pathname.split('/').pop();
console.log("File Name: "+ file_name)
var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

  http.get(options, function(res) {
      res.on('data', function(data) {
              file.write(data);
          }).on('end', function() {
              file.end();
              console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
          });
      });
  };
  res.render('insert', { videosrc: DOWNLOAD_DIR + file_name })
})
module.exports = router;
