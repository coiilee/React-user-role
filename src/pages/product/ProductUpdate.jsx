import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiProductService from "./apiProductService";

const ProductUpdate = () => {
    const {productId}=useParams();
    const navigate= useNavigate();
    const [product,setProduct]= useState({
                  productName:"",
                  productCategory:"",
                  productPrice:"",
                  productStock:"",
                  productDescription:"",
        }); //수정할 내용이 product 니까 product 불러오고, 수정한 내용을 담을 그릇이 setProduct
            //useState 로 기본 상태 값 설정해 두는 것

    useEffect(() => {
        apiProductService.getProductById(productId);
    }, []);

    const handleUpdate = () => {
        apiProductService.updateProduct(productId,product); //현재 상태값인 product를 api로 전달
    }

    const handleChange=(e)=>{
        const{name,value} = e.target; //입력된 input 요소의 name과 value를 가져옴
                //name:어떤 입력 필드에서 값이 변경됐는지 식별 위함
                //value:사용자가 입력한 새로운 값
        setProduct(
            {...product, [name]:value} //기존 product 객체를 전개연산자인(...product)로 복사하고,
                                            // 변경된 값만 업데이트 (현재 입력된 name을 가진 속성만 value로 업데이트 )
        )
    }
    return (
        <div className="-container">
            <h2>상품수정</h2>
            <div className="mb-3">
                <label className="form-label">
                    상품명
                </label>
                <input type="text" className="form-control" name="productName"
                       value={product.productName} onChange={handleChange}/>


                <label className="form-label">
                    카테고리
                </label>
                <input type="text" className="form-control" name="productCategory"
                       value={product.productCategory} onChange={handleChange}/>


                <label className="form-label">
                    가격
                </label>
                <input type="number" className="form-control" name="productPrice"
                       value={product.productPrice} onChange={handleChange}/>


                <label className="form-label">
                    재고
                </label>
                <input type="text" className="form-control" name="productStock"
                       value={product.productStock} onChange={handleChange}/>


                <label className="form-label">
                    상품 설명
                </label>
                <input type="text" className="form-control" name="productDescription"
                       value={product.productDescription} onChange={handleChange}/>


                <button className="btn-btn-primary" onClick={handleUpdate}>수정</button>
            </div>
        </div>
    )

};

export default ProductUpdate;