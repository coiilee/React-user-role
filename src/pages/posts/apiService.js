import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/posts";

const apiService = {
    getAllPosts: function (callback, errorCallback) {
        axios.get(API_BASE_URL)
            .then(response => callback(response.data))
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
            .then(response => callback(response.data))
            .catch(error => errorCallback(error));
    },

    deletePost: function (postId, callback, errorCallback) {
        axios.delete(`${API_BASE_URL}/${postId}`)
            .then(response => callback(response.data))
            .catch(error => errorCallback(error));
    }
};

export default apiService;