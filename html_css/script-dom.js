var b= (function(){
    function getPhotoPosts(skip = 0, top = 10, filterConfig) {
       var array = utils.getPhotoPosts(skip, top, filterConfig);

       var containerMain = document.querySelector('div.main');
       for(let i=0; i < photoPosts.length; ++i) {
        let node = photoPosts[i];
        containerMain.removeChild(node);
    }
    
     for(let i=0; i < array.length; ++i) {
        let node = array[i];
        addPhotoPost(node);
    }

    };

    function getPhotoPost(id) {
        utils.getPhotoPost(id);
    };

    function validatePhotoPost(obj) {
        utils.validatePhotoPost(obj);
    };

    function addPhotoPost(post) {
        utils.addPhotoPost(post);

        //Будет ли этот фото пост выглядеть, как уже созданные с помощью html и css? C кнопками edit, delete, лайком и т.д.?
        var containerMain = document.querySelector('div.main');
        var postContainer = containerMain.createElement('div.post');
        var author = postContainer.createElement('div.post-name');
        author.textContent = post[author];

        var postContent = postContainer.createElement('div.post-content');
        var link = postContent.createElement('img');
        link.setAttribute(src, post[photoLink]);

        var descripContainer = postContent.createElement('div.post-desc');
        var descrip = descripContainer.createElement('span');
        descrip.textContent = post[description];

        var footer = postContainer.createElement('div.post-footer');
        var date = footer.createElement('div.date');
        
        date.textContent = (new Date()).toString();

        containerMain.appendChild(postContainer);
    };

    function editPhotoPost(id, post) {
        utils.editPhotoPost(id, post);
       
       var container = document.querySelector('div.main');
       var post = container.getElementById(id);
       var box = post.querySelector('div.post-name');
       var name = box.getElementByTagName("span");
       name.textContent = photoPosts[author];

       var descripContainer = post.querySelector('div.post-desc');
       var descrip = descripContainer.getElementByTagName("span");
       descrip.textContent = photoPosts[description];

       var footer = post.querySelector('div.post-footer');
       var dateContainer = footer.querySelector('div.date');
       var date = dateContainer.getElementByTagName("span");
       date.textContent = photoPosts[createdAt];

       var photoContainer = post.querySelector('div.post-content');
       var photo = photoContainer.getElementByTagName("img");
       photo.setAttribute("src", photoPosts[photoLink]);
    };

    function removePhotoPost(id) {
        utils.removePhotoPost(id);
        var containerMain = document.querySelector('div.main');
        var postContainer = containerMain.querySelector('div.post');
        var post = postContainer.getElementById(id);

        post && containerMain.removeChild(post);
      };


})()
