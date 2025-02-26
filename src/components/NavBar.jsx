import {Link} from "react-router-dom";

const NavBar = ({user}) => {
    return (
        <div className="NavBar-container">
            <Link to="/home">홈</Link>
            <Link to="/">메인</Link>
            <Link to="/posts">게시글목록</Link>
            <Link to="/posts/search">게시글 검색</Link>
            <Link to="/posts/create">게시물 작성</Link>
            <Link to="/products">제품리스트</Link>
            <Link to="/products/search">제품 검색</Link>
            {/*    사용자 권한에 따른 메뉴 표시*/}
            {user.role === 1 && (
                <Link to="/admin">관리자페이지</Link>
            )}  
            {user.role === 2 && (
                <Link to="/company">회사 페이지</Link>
            )} 
            {user.role === 3 && (
                <Link to="/admin">유저 페이지</Link>
            )}
        </div>
    )

};

export default NavBar;