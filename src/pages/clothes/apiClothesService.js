import axios from 'axios';
// API_URL 이름 사용 금지
const API_CLOTHES_URL = "http://localhost:8080/api/clothes";

// getAllClothes
/*
const 기능명칭 = {
1번기능 :
        function(){
        },
2번기능  :
        function(){
        },
3번기능  :
        function(){
        },
}
export default 기능명칭;
 */
const apiClothesService= {

    getAllClothes: function (setClothes) {
    axios.get(API_CLOTHES_URL)
        .then(
            (res) => {
                 setClothes(res.data)
                console.log("백엔드 연결 성공");
            }
        )
        .catch((err) => {
            alert("백엔드 데이터 불러오는데 에러 발생");
            console.err("백엔드 데이터 불러오는 에러 확인 : ", err);
        })
},
    getClothesById :
        function (id,setClothes){
        axios
            .get(API_CLOTHES_URL+"/"+id)
            .then(
                (res)=>{
                    setClothes(res.data);
                }
            )
            .catch((err)=>{
                alert("데이터 불러올 수 없음");
                console.error("error : ",err);
            })

    },
    insertClothes: function (clothesData,setClothes){
        axios.post(API_CLOTHES_URL,clothesData, {headers: { "Content-Type": "application/json" }})
            .then(
                (res)=>{
                    setClothes(res.data);
                }
            )
            .catch((err)=>{
                alert("추가 불가");
                console.error("Insert error : " , err);
            })

    },
    updateClothes : function (cid,setClothes,callback){
        axios
            .put(`${API_CLOTHES_URL}/${cid}`,setClothes)
            .then((res)=>{
                if(res.data && res.data.updatedAt){

                    alert(callback); //게시물이 수정되었다 표기
                }else {
                    alert("변경된 내용이 없습니다.");
                }
            })

            .catch((err)=> {
                alert("에러 발생");
            });

    },
    deleteClothes : function (id,callback){
        axios
            .delete(API_CLOTHES_URL+"/"+id)
            .then((res)=>{
                callback(res.data);
                alert("게시물이 삭제되었습니다.")
            })
            .catch((err)=>{
                alert("에러발생");
                console.error("err"+err);
                }
            )

    },
}
export default apiClothesService;
