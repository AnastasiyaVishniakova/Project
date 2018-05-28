
var b = (function(){
    let POST_TEMPLATE;
    let skip = 0;

    let filterConfig = {tags: []};
    

    let more = document.getElementById('more');
    let filterOk = document.getElementById('login');
    filterOk.addEventListener('click', increseSkip);
    more.addEventListener('click', increseSkip);



    function increseSkip(){
        //result - строка
        httpincreseSkip()
        .then((result)=>{
            renderPhotos(JSON.parse(result, function (key, value) {
                if(key === 'createdAt') return new Date(value);
                return value;
            }));
        });
    };

    function httpincreseSkip(){
        console.log('jhecje');
        //resolve - 'удачное обещание', reject - 'неудачное обещание'
        skip += 10;

        let authorF = document.getElementById('name');
        filterConfig['author'] = authorF.value;
        let tags = document.getElementById('hashtag');
        let tagString = tags.value;
        if(tagString){
            filterConfig['tags'][0] = tagString;
        }
        let day = document.getElementById('date');
        filterConfig['createdAt'] = day.valueAsDate;

        return new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();
            let params = 'skip=' + 0 + '&top=' + skip;
            xhr.open('POST','/photoPosts?'+params,true); //запрос на сервер
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload=function() {
                if(this.status === 200){
                    resolve(this.response);
                }else{
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };
            xhr.send(JSON.stringify(filterConfig));
        });
    };

    function loadMainPage(){
        document.querySelector('#fil').style.display = "block";

        increseSkip();
    }

    function renderPhotos(posts) {
        
        //убрать всё из main
        while (main.firstChild!=null) {
            main.removeChild(main.firstChild);
        }

        let friends = document.createElement("div");
        friends.className = 'friends';
        friends.innerHTML = "<span>Friends' new photos</span>";
        main.appendChild(friends);

        POST_TEMPLATE = document.querySelector('#post-template');
        posts.forEach(post => {
            let tmp =   POST_TEMPLATE;   
            tmp.content.querySelector('.post').dataset.id = post.id;
            tmp.content.querySelector('.author').textContent = post.author;
            tmp.content.querySelector('.post-content-image').src = post.photoLink;
            tmp.content.querySelector('.description').textContent = post.description;
            tmp.content.querySelector('.date-content').textContent = formatDate(post.createdAt);
            let t = tmp.content.querySelector('.hashtags');
            t.textContent = '';
            if(post.tags) {
                post.tags.forEach(element => {
                    let a = document.createElement('span');
                    a.textContent = '#' + element;
                    t.appendChild(a);
                });
            }
            main.appendChild(tmp.content.cloneNode(true)); //мы вставили не сам template, а его клон
        });
        var more = document.createElement('div');
        more.className = 'mor';
        more.id = 'm';
        //console.log(more);
        var pic = document.createElement('img');
        pic.id = 'more';
        pic.src = 'assets/More-button.png';
        more.appendChild(pic);
        main.appendChild(more);
    };

    function formatDate(d) {
		return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear() + ' ' +
		d.getHours() + ':' + d.getMinutes();
	}

    let addButton = document.getElementById('plus');
    
    addButton.addEventListener('click', addPhotoPost);


    function sendPost(){
        const postTemp={tags: []};
        
        const input = document.querySelector('.select-file');
        const formData = new FormData();
        formData.append('file', input.files[0]);

        //если нет ссылки, то экран ошибки или оповещение
        const description = document.querySelector('.description-input');
        postTemp['description'] = description.value;
        const tags = document.querySelector('.hashtags-input');

        const tagString = tags.value;
        postTemp['createdAt'] = new Date();
        postTemp['author'] = 'Вишнякова Анастасия';
        const arr = tagString.split('# ');

        for (let i = 0; i < arr.length; i++) {
            postTemp['tags'].push(arr[i]);
        }

        formData.append('post', JSON.stringify(postTemp));
        
        const promise = new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/addPhotoPost', true); //запрос на сервер
            xhr.onload = () => {
                resolve();
            };
            xhr.send(formData);
        });
        promise.then(loadMainPage);
    };

    function addPhotoPost() {

        let filter = document.getElementById("fil");
        filter.style.display = "none";
        
        //убрать всё из main
        while (main.firstChild!=null) {
            main.removeChild(main.firstChild);
        }

        ADD_TEMPLATE = document.querySelector('#add-photo-template');
        let tmp = ADD_TEMPLATE;
        main.appendChild(tmp.content.cloneNode(true));
        document.querySelector('.push-her').addEventListener('click', sendPost);

    };


    document.querySelector('.main').addEventListener('click', handleEditPost);
    //мы должны понять, на какой пост мы кликнули, чтобы потом его данные вынести в окно редактирования
    function handleEditPost(event){
        let clickObject = event.target; 
        if(clickObject.parentNode.tagName.toLowerCase() === 'button')
            clickObject = clickObject.parentNode;
        if(clickObject.tagName.toLowerCase() != 'button')
            return;
        
        let post = clickObject.parentNode.parentNode.parentNode; 
        let id = post.dataset.id;

        if(clickObject.className === 'edit')  
            editPhotoPost(id);
        if(clickObject.className === 'delete')
            removePhotoPost(id);
    }

    
    function editPhotoPost(id) {

        const request = new Promise((res, rej) => {
            const xhr = new XMLHttpRequest();
            const params = 'id='+id;
            xhr.open('GET', '/photoPost?'+params,true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) {
                    return;
                }
                if (xhr.status !== 200) {
                    rej(console.log(xhr.status + ': ' + xhr.statusText));
                } else {    
                    res(JSON.parse(xhr.responseText));
                }
            }
            xhr.send();
        });
        request.then(post => {
            let filter = document.getElementById("fil");
            filter.style.display = "none";
            
            //убрать всё из main
            while (main.firstChild!=null) {
                main.removeChild(main.firstChild);
            }
     
            ADD_TEMPLATE = document.querySelector('#edit-photo-template');
            let tmp = ADD_TEMPLATE;
    
            let postTemp={tags: []};
    
            let description = tmp.content.querySelector('.description-input');
            description.value = post['description'];
            let tags = tmp.content.querySelector('.hashtags-input');
    
            var arr = post['tags'];
            var tagString = arr.join(' #');
            tags.value = tagString;
            main.appendChild(tmp.content.cloneNode(true));
            document.querySelector('.push-her').addEventListener('click', sendEditedPost);
        });

        function sendEditedPost(){
            let postTemp={tags: []};

            //если нет ссылки, то экран ошибки или оповещение
            let description = document.querySelector('.description-input');
            postTemp['description'] = description.value;
            let tags = document.querySelector('.hashtags-input');
    
            var tagString = tags.value;
            postTemp['createdAt'] = new Date();
            postTemp['author'] = 'Вишнякова Анастасия';
            var arr = tagString.split('# ');
    
            for (var i = 0; i < arr.length; i++) {
                postTemp['tags'].push(arr[i]);
            }
            //resolve - 'удачное обещание', reject - 'неудачное обещание'
            var promise = new Promise(function(resolve, reject) {
                let xhr = new XMLHttpRequest();
                xhr.open('PUT','/editPhotoPost?id='+id,true); //запрос на сервер
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload=function() {
                    if(this.status === 200){
                        resolve(this.response);
                    }else{
                        let error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };
                xhr.send(JSON.stringify(postTemp));
               
                //loadMainPage();
            });
            promise.then(loadMainPage);
        };
       return true;
    };

    function removePhotoPost(id) {
        var promise = new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE','/removePhotoPost?id='+id,true); //запрос на сервер
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload=function() {
                if(this.status === 200){
                    resolve(this.response);
                }else{
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };
            xhr.send();
           
            //loadMainPage();
        });
        promise.then(loadMainPage);

      };
})();
