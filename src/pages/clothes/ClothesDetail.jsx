import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiClothesService from "./apiClothesService";

const ClothesDetail = () => {

    const {cid}=useParams();
    const [clothes, setClothes] = useState(null);

    useEffect(() => {
        apiClothesService.getClothesById(cid,setClothes)
    }, [cid]);

    return (
        <div className="ClothesDetail-container">
            <h2>{clothes.cname}</h2>
            <p>{clothes.ccategory}</p>
            <p>{clothes.cprice}</p>
            <p>{clothes.cbrand}</p>
            <Link to={`/clothes/${clothes.cid}`}><button>수정</button></Link>
        </div>
    )

};

export default ClothesDetail;