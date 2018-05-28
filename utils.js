let fs = require('fs');

const Utils = function(photoPosts){
  function getPhotoPosts(skip = 0, top = 10, filterConfig) {
    let arr = photoPosts;
    if(!filterConfig || (filterConfig.author == '' && filterConfig.tags.length == 0 && filterConfig.createdAt === '')) filterConfig = undefined;

    if (filterConfig && filterConfig.author !== '') {
      console.log(filterConfig);
      arr = arr.filter(function (a) {
        return a.author === filterConfig.author;
      });
    }
    
    if(filterConfig && filterConfig.tags.length != 0){
     
      arr = arr.filter(function (a) {
        for (var i = 0; i < a.tags.length; i++) {
           if( a.tags[i] === filterConfig.tags[0]){
             return true;
           }
        }
        return false;
      });
    }
    /*
    if(filterConfig && filterConfig.createdAt !== ''){     
      var date = new Date(filterConfig.createdAt);
      arr = arr.filter(function (a) {
        return valueOf(a.createdAt) === valueOf(date);
      });
    }
    */
    arr = arr.slice(skip, skip + top);
    arr.sort(function (a, b) {
      return (a.createdAt > b.createdAt) ? 1 : (a.createdAt < b.createdAt) ? -1 : 0;
    });
    
    return arr;
  };

  function getPhotoPost(id) {
    var res = null;
    photoPosts.forEach(function (item) {
      if (item.id === id) res = item;
    });
    return res;
  };

  validator = {
    description(description) { return description && typeof description === 'string' },
    tags(tags) {
       if(tags) return tags instanceof Array && tags.every(element => typeof element === 'string');
       return true;
     },
    createdAt(createdAt) { return createdAt },
    author(author) { return author && typeof author === 'string' },
    photoLink(photoLink) { return photoLink && typeof photoLink === 'string' },
  };

  function validatePhotoPost(obj) {
    var res = true;
    Object.keys(validator).forEach(key => {
      if (!validator[key](obj[key])) res = false;
    });
    Object.keys(obj).forEach(key => {
      if (!validator[key]) res = false;
    });
    return res;
  };
  

  function addPhotoPost(post, file) {
    post.photoLink = '/assets/' + post.photoLink;
    if (validatePhotoPost(post)) {
      post.id = photoPosts[photoPosts.length - 1].id + 1;
      post.photoLink = `/assets/${post.id}.${require('mime').extension(file.mimetype)}`;
      fs.writeFile('public' + post.photoLink, file.buffer, (err) => console.log(err));
      photoPosts.push(post);
      fs.writeFile('./server/data/posts.json', JSON.stringify(photoPosts),'utf8');
      return true;
    }
    return false;
  };

  function editPhotoPost(id, post) {
    //if (!validatePhotoPost(post)) return false;
    photoPosts = photoPosts.map(function (item) {
      if (item.id === id) {
        Object.keys(post).forEach(function (key) {
          item[key] = post[key];
        });
      }
      return item;
    });
    fs.writeFile('./server/data/posts.json', JSON.stringify(photoPosts),'utf8');
    return true;
  };

  function removePhotoPost(id) {
    var index = -1;
    var template = photoPosts;
    template = template.forEach(function (item, i) {
      if (item.id === id) {
        index = i;
      }
    });
    if(index != -1){
      photoPosts.splice(index, 1);
    }
    else{
      return false;
    }
    fs.writeFile('./server/data/posts.json', JSON.stringify(photoPosts),'utf8');
    return true;
  };

  return {
    getPhotoPosts,
    getPhotoPost,
    validatePhotoPost,
    addPhotoPost,
    editPhotoPost,
    removePhotoPost,
  }

};

module.exports = Utils;