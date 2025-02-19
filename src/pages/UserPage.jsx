


const UserPage = ({user})  => {

    return(
        <div>
            <h1>유저페이지</h1>
            <p>환영합니다. {user.userName}님</p>
        </div>
    )

}

export  default  UserPage;