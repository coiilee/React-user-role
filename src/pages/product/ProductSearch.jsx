import React, {useEffect, useState} from "react";
import axios from "axios";
import './ProductSearch.css';
import apiProductService from "./apiProductService";
import {getProducts, getSuggestions} from "./apiProductService";
import apiService from "../posts/apiService"; //css처럼 기능을 넣지 않고 가져오기만 할때는 ''안에작성

const ProductSearch = () => {
    // 검색 변수 이름
    const [keyword, setKeyword] = useState("");
    //검색 결과 조회 목록 변수 이름
    const [products, setProducts] = useState([]);
    const[sugs,setSugs] = useState([]); //suggestions -> sugs 추천 검색어를 제안 리스트
    const [show,setShow] = useState(false); //빈값일 경우 제안 X, 빈 값이 아닐 경우 제안

    const searchProducts = () => {
        // input 비어있는지 확인 후 비어있다면
        // "검색어를 입력하세요." 보여준 후 리턴
        if (!keyword.trim()) {
            alert("검색어를 입력하세요.");  // 검색어가 비어있으면 메시지 표시
            return;  // 함수 종료
        }
    };
        apiProductService.getSearchProduct(keyword,setProducts);


    useEffect(()=>{
        apiProductService.getSuggestions(keyword)
    },[keyword]);

    //검색어 필터기능
    const handleChange= (e) => {
        const value = e.target.value.trim(); //input 창에서 이벤트가 발생. 이벤트가 발생한 특정 값을 공백제거하고 value 라는 이름에 저장
        //if(!value.trim()){
        //alert("추천할 검색어가 없습니다.")
        //  }
        //검색 추천은 추천일 뿐, 필수로 추천을 해야할 이유가 없기 때문에 alert 사용 XXXX

        setKeyword(value); //input 에서 가져온 value 값을 setKeyword 에 저장

        //value 값이 존재한다면, 추천 검색어를 제공
        if(value){
            // axios
            //     .get(`http://localhost:8080/api/products/search?keyword=${value}`)
            //     .then(
            //         (res)=> {
            //             // res.data 는 배열 형식으로 데이터를 가져올 수 없기 때문에 사용 불가
            //             /*
            //             const 제안리스트 = Array.isArray(res.data)
            //                 ?
            //                 res.data.map(
            //                     (p) => (
            //                         p.productName
            //                     )
            //                 )
            //                 :
            //                 [];
            //
            //              */
            //             const 제안리스트 = res.data?.map(p=>p.productName) || [];
            //             setSugs(제안리스트);//백엔드에서 가져온 제안리스트에서 이름만 sugs 변수 이름으로 전달
            //             setShow(true); //제안 리스트를 sugs 변수이름으로 전달했고, 전달한 값이 존재하면 추천 검색어 보여주기 설정
            //         }
            //     )
            //     .catch(
            //         (err)=>{
            //             console.error("추천 검색어 동작 실행 실패:" +err);
            //             setSugs([]); //새로운 input 값이 들어왔을 때, 문제가 발생하면 기존에 추천한 리스트를 모두 비우기
            //         }
            //     )
            apiProductService.getSuggestions(value,setSugs,setShow);

        } else {  //추천할 검색어가 없다면 , 한마디로 input이 비어있다면 !!!!
            setSugs([]); //추천 검색어 리스트 비우기
            setShow(false);

        }
    }

    const handleSug=(sugs)=>{
        setKeyword(sugs);
        setShow(false);
    }

    return (
        <div className="productsearch-container">
            <h2>상품 검색</h2>
            <div>
            <input
                type="text"
                value={keyword}
                onFocus={()=>setShow(true)}
                onChange={handleChange}
                onBlur={ ()=> setTimeout( ()=>setShow(false),200  )  }
            />
            {
                show && sugs.length > 0 && (
                    <ul>
                        {sugs.map((sugs, index) => (
                            <li key={index} onMouseDown={ ()=>handleSug(sugs)}>
                                {sugs}
                            </li>
                        ))}
                    </ul>
                )
            }
            </div>
            <button onClick={searchProducts}>검색</button>

            <ul>
                {/* 제품이 1개 이상 존재한다면 ? (
          이름 카테고리 가격 보여주기
        ) : (
          <p>검색 결과가 없습니다.</p>
        ) */}
                {products.length > 0
                    ?
                    (
                        products.map(
                            (product, index) => (
                                <li key={product.productId}>
                                    이름 : {product.productName}
                                    카테고리: {product.productCategory}
                                    가격: {product.productPrice}
                                </li>
                            )
                        )
                    )
                    :
                    (
                        <div>

                        {keyword} <p>검색 결과가 없습니다.</p>
                        </div>
                    )
                }
            </ul>
        </div>
    );
};

export default ProductSearch;