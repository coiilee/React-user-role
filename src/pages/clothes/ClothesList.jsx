import {useEffect, useState} from "react";
import apiClothesService from "./apiClothesService";
import {Link, useNavigate} from "react-router-dom";



const ClothesList = () => {
    const [clothes, setClothes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiClothesService.getAllClothes(setClothes);
    }, []);


    const handleDelete = () => {
        alert("알람 메세지");
        window.confirm("확인 취소 메세지");

        if (window.confirm("정말 삭제하시겠습니까?")) {
            apiClothesService.deleteClothes(1,"삭제성공", "삭제실패");
            navigate("/");
        }
    }

    return (
        <div className="row mt-5">
            <button className="btn btn-success mb-3" onClick={() => navigate("/clothes/add")}>
                옷 추가
            </button>
            {clothes.map(
                (c) => (
                    <div className="col-3 mb-5" key={c.cid}>

                        <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                             alt="Fancy Product"/>
                        <div className="card-body p-4 text-center">
                            <h5 className="fw-bolder">
                                <Link to={`/clothes/${c.cid}`} className="text-decoration-none">{c.cname}</Link>
                            </h5>
                            {c.cprice}
                        </div>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <button className="btn btn-outline-dark mt-auto"
                                        onClick={() => handleDelete(c.cid)}>삭제
                                </button>
                            </div>
                        </div>

                    </div>
                )
            )}

        </div>
    )
}
{/*            {*/
}
{/*                clothes.map((c) => (*/
}
{/*                    <li>*/
}
{/*                        <Link to={`/clothes/:${c.cid}`}><p> {c.cname}</p></Link>*/}
{/*                        <p> {c.cbrand}</p>*/}
{/*                        <p> {c.ccolor}</p>*/}
{/*                        <p> {c.csize}</p>*/}
{/*                        <p> {c.cmaterial}</p>*/}
{/*                        <p> {c.cprice}</p>*/}
{/*                        <Link to={`/clothes/${c.cid}`}>상세보기</Link>*/}
{/*                        <button onClick={handleDelete}>삭제</button>*/}
{/*                    </li>*/}
{/*                ))*/}
{/*            }*/}
{/*        </ul>*/}
{/*    </div>*/}
{/*)*/}


export default ClothesList;