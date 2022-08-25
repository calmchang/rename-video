#!/usr/bin/env node

let fs = require('fs');
const path = require('path');
var minimist = require('minimist');
var package = require('./package.json');

const cwd = process.cwd();
const exts = ['.mp4', '.mkv','.avi','.rmvb','.mov','.m4v','.wmv','.asf','.asx','.3gp','.flv'];
const root = cwd;

var options = minimist(process.argv.slice(2));


function rename(file){
  const match = file.match(/S(\d+)E(\d+)/);
  const ext = path.extname(file);
  const newName= `${match[0]}${ext}`;
  fs.renameSync(file,newName,(err)=>{
    if(err){
      console.log('出错')
    }else{
      console.log(newName)
    }
  })
}
function fileFilter(file) {
  fs.stat(file, (err, stats) => {
    if (err) return console.error(err);
    if (stats.isFile() && exts.includes(path.extname(file))) {
      rename(file); // console.log('可以压缩：' + file);
    }
  });
}

// 获取文件列表
function fileList(folder) {
  fs.readdir(folder, (err, files) => {
    if (err) console.error(err);
    files.forEach(file => {
      fileFilter(file);
    });
  });
}

if(options.v){
  console.log('v'+package.version);
}else{
  fileList(root);
}
