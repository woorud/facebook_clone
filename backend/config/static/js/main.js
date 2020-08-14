// 선택자: document(div, body, header...)에 접근해야 한다.
window.addEventListener('DOMContentLoaded', function(){
    // 로딩이 끝남과 동시에 아래 명령을 실행
    const bell = document.querySelector('.bell');
    const leftbox = document.querySelector('.left_box');
    const rightbox = document.querySelector('.right_box');
    const feed = document.querySelector('#contents_container');
    const text = document.querySelector('#comment37');

    console.log(bell);

    // 함수 만들기
    function notification(){
        // console.log('clicked!');
        this.classList.toggle('on');
        // css를 먼저 만들고 jsp를 사용, this: 클릭한 대상
        // toggle: 스위치, 없으면 넣고, 있으면 빼고        
    }
    
    // console.log('documentHeight: ' + documentHeight);
    // console.log('scrollHeight: ' + scrollHeight);
    // 스크롤을 위한 화면의 크기 구하기

    function addMorePostajax(data){
        feed.insertAdjacentHTML('beforeend', data);
    }

    function callMorePostAjax(page_value){
        if(page_value > 5){
            return;
        }
        $.ajax({
            type: 'get',
            url: 'data/post.html',
            data: page_value,
            dataType: 'html',
            success: addMorePostajax,
            error: ()=>{
                alert('문제가 발생했습니다.')
            }
        })
    }

    function scrollfunc(){
        let documentHeight = document.body.scrollHeight;
        let scrollHeight = pageYOffset + window.innerHeight;
        
        if (scrollHeight >= documentHeight){
            let pager = document.querySelector('#page');
            let page_value = document.querySelector('#page').value;
            
            pager.value = parseInt(page_value) + 1;
            // parseInt: 정수 값을 만들어 줌

            callMorePostAjax(page_value);

            if(page_value > 5){
                return;
            }
        }
    }

    leftbox.style.right = `${innerWidth * 0.5 + 430}px`;
    rightbox.style.left = `${innerWidth * 0.5 + 90}px`;
    // 밖에서 선언하지 않는다면 로딩이 되자마자 기준점이 없으므로 위치를 잡지 못한다.
    function resizefunc(){
        console.log(innerHeight);
        console.log(innerWidth);
        
        leftbox.style.right = `${innerWidth * 0.5 + 430}px`;
        rightbox.style.left = `${innerWidth * 0.5 + 90}px`;
        // ${}: 변수 설정, ``: template, 액션태그, 동작

        console.log('resize');
    }

    function delegation(e){
        let elem = e.target;
        console.log(elem);

        while (!elem.getAttribute('data-name')){
        // element에 data-name이 없으면
            elem = elem.parentNode;
            if(elem.nodeName === 'BODY'){
                elem = null;
                return;
            }
        }
        
        if(elem.matches("[data-name='like']")){
            console.log('좋아요!')
            elem.classList.toggle('active');

            let pk = elem.getAttribute('data-name');
            $.ajax({ 
            //jquery: $.({})
                type: 'get',
                url: 'data/like.json',
                data: {pk},
                dataType: 'json',
                success: (response)=>{
                    let likeCount = document.querySelector('#like-count-37');
                    likeCount.innerHTML = response.like_count;
                },
                error: ()=>{
                    alert('로그인이 필요합니다!');
                    window.location.replace('http://www.naver.com');
                }  
            })
        }else if(elem.matches("[data-name='more']")){
            console.log('더보기!')
            elem.classList.toggle('active');

        }else if(elem.matches("[data-name='send']")){
            $.ajax({
                type: 'get',
                url: 'data/comment.html',
                data: '',
                dataType: 'html',
                success: (data)=>{
                    document.querySelector('.comment_container').insertAdjacentHTML('beforeend', data);
                    // insertAdjacentHTML: 삽입(위치지정, 삽입할 요소)
                },
                error: ()=>{
                    alert('로그인이 필요합니다!');
                    window.location.replace('http://www.naver.com');
                }
            })
            text.value = '';
            // 통신 완료된 후 빈 값, 초기화
        
        }else if(elem.matches("[data-name='delete']")){
            if(confirm('정말 삭제하시겠습니까?') === true){
                $.ajax({
                    type: 'get',
                    url: 'data/delete.json',
                    data: '',
                    dataType: 'json',
                    success: (response)=>{
                        if(response.status){
                            let comt = document.querySelector('.comment-37');
                            comt.remove();
                        }
                    },
                    error: ()=>{
                        alert('로그인이 필요합니다!');
                        window.location.replace('http://www.naver.com');
                    }
                })
            }
            
        }
    }


    bell.addEventListener('click', notification);
    feed.addEventListener('click', delegation);

    window.addEventListener('scroll', scrollfunc);
    window.addEventListener('resize', resizefunc);
})

