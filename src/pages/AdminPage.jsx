


const AdminPage = ({user})  => {

    return(
        <div>
            <h1>관리자페이지</h1>
            <p>환영합니다. {user.userName}님</p>
        </div>
    )

}

export  default  AdminPage;