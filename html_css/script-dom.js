var b= (function(){
    function getPhotoPosts(skip = 0, top = 10, filterConfig) {
       utils.getPhotoPosts(skip, top, filterConfig);
    };

    function getPhotoPost(id) {
        utils.getPhotoPost(id);
    };

    function validatePhotoPost(obj) {
        utils.validatePhotoPost(obj);
    };

    function addPhotoPost(post) {
        utils.addPhotoPost(post);
    };

    function editPhotoPost(id, post) {
        utils.editPhotoPost(id, post);
    };

    function removePhotoPost(id) {
        utils.removePhotoPost(id);
      };


})()
