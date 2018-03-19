var utils = (function(){
  photoPosts = [
    {
      id: '1',
      description: 'Doge',
      tags: ['#tag', '#123'],
      createdAt: new Date('2017-02-23T23:00:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'assets/01.jpg'
    },

    {
      id: '2',
      description: 'Doge',
      tags: ['#tag', '#123'],
      createdAt: new Date('2016-01-23T22:10:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:/УП/html_css/assets/02.jpg'
    },

    {
      id: '3',
      description: 'Doge',
      tags: ['#tag', '#123'],
      createdAt: new Date('2018-01-23T23:50:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:/УП/html_css/assets/03.jpg'
    },

    {
      id: '4',
      description: 'Doge',
      tags: ['#tag', '#123'],
      createdAt: new Date('2015-01-23T11:10:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:/УП/html_css/assets/04.jpg'
    },

    {
      id: '5',
      description: 'Doge',
      tags: ['#tag', '#123'],
      createdAt: new Date('2017-02-23T23:05:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:/УП/html_css/assets/05.jpg'
    }
  ];

  function getPhotoPosts(skip = 0, top = 10, filterConfig) {
    var arr = photoPosts;

    if (filterConfig && filterConfig.author) {
      arr = arr.filter(function (a) {
        return a.author === filterConfig.author;
      })
    }

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
    description: function (description) { return description && typeof description === 'string' },
    tags: function (tags) {
       if(tags) return tags instanceof array && tags.every(element => typeof element === 'string');
       return true;
     },
    createdAt: function (createdAt) { return createdAt && typeof createdAt.getMonth === 'function' },
    author: function (author) { return author && typeof author === 'string' },
    photoLink: function (photoLink) { return photoLink && typeof photoLink === 'string' },
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
  

  function addPhotoPost(post) {
    if (utils.validatePhotoPost(post)) {
      post.id = photoPosts[photoPosts.length - 1].id + 1;
      photoPosts.push(post);
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
    })
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
    return true;
  };

  return {
    getPhotoPosts,
    getPhotoPost,
    validatePhotoPost,
    addPhotoPost,
    editPhotoPost,
    removePhotoPost,
    size: photoPosts.length,
  }

}());

