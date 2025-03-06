//ProductSearch
//ProductDetail
//작성된 api 호출
//분리하여 기능 사용

// 1. getProducts(keyword)
// 2. getSuggestions(keyword)
// 3. getProductById(keyword)

import axios from "axios";
import {useNavigate} from "react-router-dom";

const API_PRODUCT_URL = "http://localhost:8080/api/products";


/*

에러 내용 : 4apiProductService.js:10  Uncaught (in promise) TypeError: errCallback is not a function
at apiPproductService.js:27:1

errCallback -> 함수가 아니면 문제 발생
err 의 경우 매개변수 이름으로 전달 받아서 작성 XX

AI 학습의 도움을 받을 경우

기능명칭 :
        function(callback, errCallback) {
        // 메인기능명칭을 호출할 경우 수행할 기능 작성
        }

        ==> 여기서 errCallback 의 경우 백엔드에서 문제가 생겼을 때 해결해야 할 문제임
            매개변수 명칭으로 받아오지 않음

바른 예제 :
        기능명칭 :
        function(keyword) {
         //메인기능명칭을 호출할 경우 수행할 기능 작성
         }

 */


const apiProductService
    = {

    getProducts: function (setProducts) {
        axios.get(API_PRODUCT_URL)
            .then( //백엔드와 연결 성공
                (res) => {
                    console.log("백엔드 연결 성공");
                    setProducts(res.data);
                }
            )
            .catch((err) => { //백엔드 연결 시류ㅐ
                alert("에러 발생");
                console.error("err 발생한 문제를 개발자만 확인할 수 있도록 설정", err);
            })
    },

    getSuggestions: function (value, setSugs, setShow, err) {
        axios
            .get(`${API_PRODUCT_URL}/search?keyword=${value}`)
            .then((res) => {

                    const 제안리스트 = res.data?.map(p => p.productName) || [];
                    setSugs(제안리스트);
                    setShow(true);
                }
            )
            .catch((err) => {
                alert("데이터 가져오기 실패");
                console.error("에러 발생: ", err);
                setSugs([]);
            })
    },

    getProductById: function (productId, setProduct) {
        axios
            .get(`${API_PRODUCT_URL}/${productId}`)
            .then( //백엔드 연결 성공
                (res) => {
                    if (res.data) {
                        //res 로 데이터를 1개이상 가져오고 가져온 데이터를 활용해서
                        // 프론트엔드 UI로 출력할 변수 명칭 작성할 때 활용
                        console.log("res",res.data)
                        setProduct(res.data);
                    }else{
                        console.log("res :", res); //백엔드 연결은 됐지만 문제있는 res 데이터 출력
                    }
                })
            .catch((err) => { //백엔드 연결 실패
                alert("데이터를 불러올 수 없습니다.");
                console.error("error code : ", err);
            });
    },

    getSearchProduct : function (keyword,setProducts){
        axios
            .get(`http://localhost:8080/api/products/search?keyword=${keyword}`)
            .then((res) => {
                setProducts(res.data);
            })
            .catch(
                (err) => {
                    console.log("검색실패 :",err)
                    setProducts([]);
                }
            );
    },
    updateProduct:function (productId, productData){
        axios.put(`http://localhost:8080/api/products/${productId}`,productData)
            .then(
                (res)=>{
                    if(res.data){
                        alert("상품이 성공적으로 수정되었습니다.");
                    } else {
                        alert("변경된 내용이 없습니다.");
                    }
                }
            )
            .catch((err)=>{
                console.error("error: ", err);
                alert("데이터 수정에 에러 발생");
            })

    },

    deleteProduct:function (productId,navigate){
        axios.delete(`http://localhost:8080/api/products/${productId}`)
            .then(
                ()=>{
                    alert("삭제가 완료되었습니다.");
                    navigate("/products");
                }
            )
            .catch(
                (err)=>{
                    alert("상품을 삭제할 수 없습니다.");
                    console.error("error",err);
                }
            )
    },

}
export default apiProductService;