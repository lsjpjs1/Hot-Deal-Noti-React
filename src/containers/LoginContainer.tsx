import MainHeader from "../components/header/MainHeader";
import KakaoLoginButton from "../components/login/KakaoLoginButton";
import "./LoginContainer.css"
import {Typography} from "@material-ui/core";
const LoginContainer = () => {
    return(
        <div>
            <MainHeader/>


            <div className={"login-buttons-container"}>

                <div className={"login-buttons-container2"}>
                    <Typography id={"login-title"}>
                        로그인
                    </Typography>
                    <KakaoLoginButton/>
                </div>
            </div>

        </div>
    )
}

export default LoginContainer