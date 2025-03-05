import {Link} from "react-router-dom";
import React, { useState } from "react";
import apiClothesService from "../clothes/apiClothesService";
import FormInput from "./FormInput";

/*
<FormInput key={field.id}{...field}/> 로 inputFields 를 가져와서 활용하는 방법

1.React 가 각 값을 구별할 수 있도록 index 대신 key 라는 명칭으로 숫자를 가져올 수 있도록 설정
각 키에 해당하는 id를 가져오고 가져온 아이디에 해당하는 모든속성을 FromInput 전달

{...field} -> inputFields 에서 key 순서에 해당하는 id,label,placeholder 값을 FormInput 으로 전달

onChange 이벤트 핸들러를 사용하지 않아도 되는가 ?!
FormInput 내부에 onChange 를 추가해서 상태 관리를 해야함

onChange 가 없으면 사용자가 입력한 값을 저장할 수 없음
         가 하는 역할 : 사용자가 입력한 값을 임시저장 -> 저장해놓은 값을 백엔드로 전달

 */

const AddClothes = () => {
    // 의류 정보 상태 관리
    const [formData,setFormData] =useState({
        cName : "",
        cCategory : "",
        cBrand : "",
        cColor : "",
        cSize : "",
        cMaterial : "",
        cPrice : "",
        cStock : "",
        cGender : "",
        cSeason : "",
    })

    //입력 값 변경 시 상태 업데이트
    const handleChange = (e) => {
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }
    /*

    const [ cName, setCName] = useState("");
    const [ cCategory, setCCategory] = useState("");
    const [ cBrand, setCBrand] = useState("");
    const [ cColor, setCColor] = useState("");
    const [ cMaterial, setCMaterial] = useState("");
    const [ cPrice, setCPrice] = useState("");
    const [ cStock, setCStock] = useState("");
    });

     */

    const inputFields = [
        {id:"cname",label:"의류명칭",placeholder:"의류 명칭을 입력하세요"},
        {id:"cCategory",label:"카테고리",placeholder:"카테고리(예: 티셔츠,바지,자켓) 입력하세요"},
        {id:"cBrand",label:"브랜드",placeholder:"브랜드를 입력하세요"},
        {id:"cColor",label:"색상",placeholder:"색상을 입력하세요"},
        {id:"cSize",label:"사이즈",placeholder:"사이즈를 입력하세요"},
        {id:"cMaterial",label:"소재",placeholder:"소재를 입력하세요"},
        {id:"cPrice",label:"가격",placeholder:"가격을 입력하세요"},
        {id:"cStock",label:"재고",placeholder:"재고를 입력하세요"},
        {id:"cGender",label:"성별",placeholder:"성별을 입력하세요"},
        {id:"cSeason",label:"시즌",placeholder:"시즌을 입력하세요"},
    ]

    // const handleSubmit = (e) => {
    //     apiClothesService.insertClothes(setClothes, (res) => {
    //         alert("옷이 성공적으로 추가되었습니다!");
    //     });
    // };

    return (
        <div className="container px-5">
            <div className="bg-light rounded-4 py-5 px-4 px-md-5">
                <div className="text-center mb-5">
                    <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i
                        className="bi bi-envelope"></i></div>
                    <h1 className="fw-bolder">의류 등록하기</h1>
                    <p className="lead fw-normal text-muted mb-0">판매할 옷을 등록해주세요!</p>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-8 col-xl-6">
                        <form id="contactForm">
                            {inputFields.map(
                                (field) => (
                                    <FormInput key={field.id} {...field} />
                                )


                            )}
                            <div className="d-none"
                                 id="submitSuccessMessage">
                                <div className="text-center mb-3">
                                    <div className="fw-bolder">
                                        등록 성공했습니다.
                                    </div>
                                    등록한 제품 확인하기
                                    <br/>
                                    <Link to={"/clothesList"}>의류 목록 페이지 이동하기</Link>
                                </div>
                            </div>

                            <div className="d-none" id="submitErrorMessage">
                                <div className="text-center text-danger mb-3">
                                    의류를 등록하는데 문제가 발생했습니다.
                                </div>
                            </div>

                            <div className="d-grid">
                                <button className="btn btn-primary btn-lg disabled"
                                        id="submitButton"
                                        type="submit">
                                    등록하기
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

};
export default AddClothes;