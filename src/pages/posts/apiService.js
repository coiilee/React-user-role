
//데이터를 백엔드에서 가지고 왔을 때 왜 res.data로 작성하는가 ?
//res.data 에서 res 라는 명칭은 response 라고 작성해도 되고,
//abc,xyz,abc123 ...원하는 변수 이름으로 작성해도 OK
//왜냐하면 백엔드에서 작성되어있는 데이터를 담아서 가져오는 변수 이름일 뿐이기 때문
//백엔드 주소에서 담아온 데이터를 변수이름에서 가져와 사용할 때는
//변수이름.data 라는 명칭을 붙여줘야 함
//자바스크립트에서 변수이름에 들어있는 데이터를 확인할 때 .data 라는 명칭 사용하기 때문

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/posts";

const apiService = {
    getAllPosts: function (callback, errorCallback) {
        axios.get(API_BASE_URL)
            .then(
                (res)=>{
                if(res.data>0){
                   callback(res.data)
                }else{
                    alert("백엔드에서 가져올 데이터 없음");
                }})
            .catch(error => errorCallback(error));
    },

    getPostById: function (postId, callback, errorCallback) {
        axios.get(`${API_BASE_URL}/${postId}`)
            .then(response => callback(response.data))
            .catch(error => errorCallback(error));
    },

    searchPosts: function (keyword, callback, errorCallback) {
        axios.get(`${API_BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`)
            .then(response => callback(response.data))
            .catch(error => errorCallback(error));
    },

    suggestedPosts:
    function (value,setSugs,setShow){
        axios
            .get(`http://localhost:8080/api/posts/search?keyword=${value}`)
            .then((res)=>{
                const 제안리스트 = res.data?.map(post=>post.postTitle) || [];
                setSugs(제안리스트);
                setShow(true);
            })
            .catch( //백엔드에서 검색어를 입력했을 대 추천하는 검색 리스트 가져오기에 문제가 발생했을 때는
                //클라이언트한테 문제가 발생했음을 알려줄 필요 X
                //추천 검색어 리스트를 비우고 보여주지 않음 설정
                (err)=>{
                    setSugs([]);
                    setShow(false);
                })
    },

    createPost: function (postData, callback, errorCallback) {
        axios.post(API_BASE_URL, postData, {
            headers: { "Content-Type": "application/json" }
        })
            .then(response => callback(response.data))
            .catch(error => errorCallback(error));
    },

    updatePost: function (postId, postData, callback, errorCallback) {
        axios.put(`${API_BASE_URL}/${postId}`, postData, {
            headers: { "Content-Type": "application/json" }

        })

            .then((res)=>{
                if(res.data && res.data.updatedAt){

                    alert(callback); //게시물이 수정되었다 표기
                }else {
                    alert("변경된 내용이 없습니다.");
                }
            })

            .catch((err)=> {
                alert(errorCallback);
            });
    },

    //  PostDetail 에서 전달받은 매개변수 자리
    //           매 개 변 수는 전달 받은 값을 기능 내에서 사용할 수 있도록 설정한 이름일 뿐이기 때문에
    //           postId가 아니가 abc, xyz 와 같은 이름으로 작성 후 {} 내부에서 작성한 변수 이름을 활용
    // function (PostDetail 에서 apiService 를 호출하여 deletePost 기능을 실행했을 때 가져온 postId, callback, errorCallback) {
    deletePost: function (postId, callback, errorCallback) {
        axios.delete(`${API_BASE_URL}/${postId}`)
            .then(response => {
                callback(response.data)
                    alert("게시물이 삭제되었습니다.")
            }
            )
            .catch(
                //백엔드에서 삭제가 불가능할 때
                error => {
                    alert("백엔드에서 컨트롤러 연결에 실패했습니다.");
                    console.error("프론트엔드에서 확인할 에러 메세지 : ",error);
                });
    }
};

export default apiService;