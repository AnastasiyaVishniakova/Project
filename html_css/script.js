var a = (
  photoPosts = [
    {
      id: '1',
      descriprion: 'Я в Турции',
      createdAt: new Date('2017-02-23T23:00:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:\УП\html_css\assets\01.jpg'
    },

    {
      id: '2',
      descriprion: 'Я дома в шапке',
      createdAt: new Date('2016-01-23T23:10:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:\УП\html_css\assets\02.jpg'
    },

    {
      id: '3',
      descriprion: 'Я дома в шапке',
      createdAt: new Date('2018-01-23T23:10:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:\УП\html_css\assets\03.jpg'
    },

    {
      id: '4',
      descriprion: 'Я дома в шапке',
      createdAt: new Date('2015-01-23T23:10:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:\УП\html_css\assets\04.jpg'
    },

    {
      id: '5',
      descriprion: 'Я в Турции',
      createdAt: new Date('2017-02-23T23:00:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:\УП\html_css\assets\01.jpg'
    },

    {
      id: '6',
      descriprion: 'Я дома в шапке',
      createdAt: new Date('2016-01-23T23:10:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:\УП\html_css\assets\02.jpg'
    },

    {
      id: '7',
      descriprion: 'Я дома в шапке',
      createdAt: new Date('2018-01-23T23:10:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:\УП\html_css\assets\03.jpg'
    },

    {
      id: '8',
      descriprion: 'Я дома в шапке',
      createdAt: new Date('2015-01-23T23:10:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:\УП\html_css\assets\04.jpg'
    },

    {
      id: '9',
      descriprion: 'Я в Турции',
      createdAt: new Date('2017-02-23T23:00:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:\УП\html_css\assets\01.jpg'
    },

    {
      id: '10',
      descriprion: 'Я дома в шапке',
      createdAt: new Date('2016-01-23T23:10:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:\УП\html_css\assets\02.jpg'
    },

    {
      id: '11',
      descriprion: 'Я дома в шапке',
      createdAt: new Date('2018-01-23T23:10:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:\УП\html_css\assets\03.jpg'
    },

    {
      id: '12',
      descriprion: 'Я дома в шапке',
      createdAt: new Date('2015-01-23T23:10:00'),
      author: 'Вишнякова Анастасия',
      photoLink: 'E:\УП\html_css\assets\04.jpg'
    }
  ],

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
  },

  function getPhotoPost(id) {
    var res = null;
    photoPosts.forEach(function (item) {
      if (item.id === id) res = item;
    });
    return res;
  },

  validator = {
    id: function (id) { return id && typeof id === 'string' },
    descriprion: function (descriprion) { descriprion && typeof descriprion === 'string' },
    createdAt: function (createdAt) { createdAt && typeof createdAt.getMonth === 'function' },
    author: function (author) { author && typeof author === 'string' },
    photoLink: function (photoLink) { photoLink && typeof photoLink === 'string' },
  },

  function validatePhotoPost(obj) {
    var res = true;
    Object.keys(obj).forEach(key => {
      if (!validator[key](obj[key])) res = false;
    })
    return res;
  },

  function addPhotoPost(post) {
    if (post.validatePhotoPost() === true) {
      photoPosts.push(post);
      return true;
    }
    return false;
  },

  function editPhotoPost(id, post) {
    if (!validatePhotoPost(post)) return false;
    photoPosts = photoPosts.map(function (item) {
      if (item.id === id) {
        Object.keys(post).forEach(function (key) {
          item[key] = post[key];
        });
      }
      return item;
    })
    return true;
  },

  function removePhotoPost(id) {
    var index = -1;
    photoPosts = photoPosts.forEach(function (item, i) {
      if (item.id === id) {
        index = i;
      }
    });
    photoPosts.splice(index, 1);
  }
)();