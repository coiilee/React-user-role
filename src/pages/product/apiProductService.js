//ProductSearch
//ProductDetail
//작성된 api 호출
//분리하여 기능 사용

// 1. getProducts(keyword)
// 2. getSuggestions(keyword)
// 3. getProductById(keyword)

import axios from "axios";

const API_PRODUCT_URL = "http://localhost:8080/api/products";

const apiProductService = {
    getProducts: function (callback, errCallback) {
        axios.get(API_PRODUCT_URL)
            .then( //백엔드와 연결 성공
                (res) => {
                    callback(res.data);
                }
            )
            .catch((err) => { //백엔드 연결 시류ㅐ
                alert("에러 발생");
                errCallback("제품 목록 보기 실패했습니다.");
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

    getProductById: function (productId, setProduct, err) {
        axios
            .get(`${API_PRODUCT_URL}/${productId}`)
            .then( //백엔드 연결 성공
                (res) => {
                    if (res.data) {
                        //데이터가 존재할경우, setProduct 로 전달
                        setProduct(res.data);
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
}
export default apiProductService;

