// import 변수명 from '파일명 파일위치 js 기능명칭' => 변수명으로 기능을 사용해야할 때
// import 'css 파일 위치'                           => 가져오기만 진행할 때 사용
import React, {useState} from "react";
import axios from "axios";
import './ProductSearch.css';
import apiProductService from "./apiProductService";

const ProductSearch = () => {
    // 검색 변수 이름
    const [keyword, setKeyword] = useState("");
    //검색 결과 조회 목록 변수 이름
    const [products, setProducts] = useState([]);
    const [sugs, setSugs] = useState([]); // suggestions -> sugs 추천 검색어를 제안하는 리스트
    const [show, setShow] = useState(false); // 빈 값일 경우 제안 X 빈 값이 아닐경우 제안 OK


    const handleChange = (e) => {
        const value = e.target.value.trim(); // input 창에서 이벤트가 발생 이벤트가 발생한 특정 값을 공백제거하고 value 이름에 저장
        // if(!value.trim()){
        // alert("추천할 검색어가 없습니다")
        // }
        // 검색 추천은 추천일 뿐 필수로 추천을 해야할 이유가 없기 때문에 alert 사용 XXXXXX
        setKeyword(value); // input 가져온 value 값을 setKeyword 에 저장

        // value 값이 존재한다면 추천 검색어 제공
        if (value) {
            apiProductService.getSuggestions(value,setSugs,setShow);

        } else { //추천할 검색어가 없다면 한마디로 input 이 비어있다면!!
            setSugs([]); //추천 검색어 리스트 비우기
            setShow(false);

        }
    }

    const handleSug = (sugs) => {
        setKeyword(sugs);
        setShow(false);
    }


    const searchProducts = () => {
        // input 비어있는지 확인 후 비어있다면
        // "검색어를 입력하세요." 보여준 후 리턴
        if (!keyword.trim()) {
            alert("검색어를 입력하세요.");
            return;
        }
        apiProductService.getSearchProduct(keyword,setProducts);

    }


    return (
        <div className="productsearch-container">
            <h2>상품 검색</h2>
            {/*  input onChange 없음   */}
            <div>
                <input
                    type="text"
                    value={keyword}
                    onFocus={() => setShow(true)}
                    onChange={handleChange}
                    onBlur={() => setTimeout(() => setShow(false), 200)}
                />
                {
                    show && sugs.length > 0 && (
                        <ul>
                            {sugs.map(
                                (sugs, index) => (
                                    <li key={index} onMouseDown={ () => handleSug(sugs)}>
                                        {sugs}
                                    </li>
                                )
                            )}

                        </ul>
                    )
                }
            </div>
            <button onClick={searchProducts}>검색</button>

            <ul>
                {
                    products.length > 0 ?
                        (
                            products.map(
                                (product) => (
                                    <li key={product.productId}>
                                        이름 : {product.productName}<br/>
                                        카테고리 : {product.productCategory}<br/>

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