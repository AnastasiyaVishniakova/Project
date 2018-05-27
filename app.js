const multer = require('multer');
const upload = multer();
const express = require('express');
const bodyParser = require('body-parser');
const Utils = require('./utils.js');
let fs = require('fs');
const app = express();

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(express.static('public'));

let posts = JSON.parse(fs.readFileSync('./server/data/posts.json','utf8'), function(key, value){
  if(key === 'createdAt'){
    return new Date(value);
  }
  return value;
});

const data = Utils(posts);


//fs.writeFileSync('./server/data/posts.json',JSON.stringify(photoPosts));

//работает через фидлер
app.post('/photoPosts', (req,res) => {
  //console.log(req.body);
  let arr = data.getPhotoPosts(req.query.skip, req.query.top, req.body);
  arr ? res.send(arr) : res.status(404).end();
  res.status(200).end();
});

app.get('/photoPost', (req, res) => {
  let post = data.getPhotoPost(req.query.id);
  post ? res.send(post) : res.status(404).end();
});


app.post('/addPhotoPost', (req, res) => {
  data.addPhotoPost(req.body);
  console.log(data.getPhotoPosts().length);
  res.status(200).end();
});

app.put('/editPhotoPost', (req,res) => {
  data.editPhotoPost(req.query.id, req.body);
  res.status(200).end();
});

app.delete('/removePhotoPost', (req,res) => {
  const result = data.removePhotoPost(req.query.id);
  result ?
    res.status(200).end() : res.status(404).end();
});

app.listen('5000', () => {
  console.log('Server is running');
});

