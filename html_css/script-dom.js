var b= (function(){
    var ARCTICLE_TEMPLATE;

    function renderPhotos(skip = 0, top = 10, filterConfig) {
        
        let main = document.querySelector('.main');
        main.textContent = '';
        ARCTICLE_TEMPLATE = document.querySelector('#post-template');
        utils.getPhotoPosts(skip, top, filterConfig).forEach(post => {
            var tmp = ARCTICLE_TEMPLATE;   
            tmp.content.querySelector('.post').dataset.id = post.id;
            tmp.content.querySelector('.author').textContent = post.author;
            tmp.content.querySelector('.post-content-image').src = post.photoLink;
            tmp.content.querySelector('.description').textContent = post.description;
            tmp.content.querySelector('.date-content').textContent = formatDate(post.createdAt);
            let t = tmp.content.querySelector('.hashtags');
            if(post.tags) {
                post.tags.forEach(element => {
                    let a = document.createElement('span');
                    a.textContent = element;
                    t.appendChild(a);
                });
            }
            main.appendChild(tmp.content.cloneNode(true)); 
        });
    };

    function formatDate(d) {
		return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear() + ' ' +
		d.getHours() + ':' + d.getMinutes();
	}
   
    function addPhotoPost(post) {
        utils.addPhotoPost(post);
        renderPhotos();
    };

    function editPhotoPost(id, post) {
        if(!utils.editPhotoPost(id, post)) return false;
       
        var postp = document.getElementById(id);
        var box = postp.querySelector('div.post-name');
        var name = box.getElementsByClassName("author")[0];
        if(post["author"]){
            name.textContent = post["author"];
       }

       var Cont = postp.querySelector('div.post-content');
       var descripContainer = Cont.querySelector('div.post-desc');
       var descrip = descripContainer.getElementsByClassName("description")[0];
       if(post["description"]){
        descrip.textContent = post["description"];
       }
       

       var footer = postp.querySelector('div.post-footer');
       var dateContainer = footer.querySelector('div.date');
       var date = dateContainer.getElementsByTagName("span")[0];
       if(post["createdAt"]){
        date.textContent = post["createdAt"];
       }

       var photo = Cont.getElementsByTagName("img")[0];
       if(post["photoLink"]){
       photo.setAttribute("src", post["photoLink"]);
       }

       return true;
    };

    function removePhotoPost(id) {
        utils.removePhotoPost(id);
       
        let g = document.querySelector('div.main');
        var post = document.getElementById(id);

        console.log(g);
        console.log(post);
        
        
        g.removeChild(post);
      };

      return{
          removePhotoPost: removePhotoPost,
          editPhotoPost: editPhotoPost,
          addPhotoPost: addPhotoPost,
          renderPhotos: renderPhotos
      }

})();
