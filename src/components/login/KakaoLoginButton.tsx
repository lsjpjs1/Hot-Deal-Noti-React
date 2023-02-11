import {Button} from "@material-ui/core";

const KakaoLoginButton = () => {

    const REST_API_KEY = process.env["REACT_APP_KAKAO_REST_API_KEY"]
    const REDIRECT_URI = window.location.origin+"/oauth/callback/kakao"
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    return (
        <div style={{textAlign:"center"}}>
            <img style={{width:"200px", cursor:"pointer"}} src={"/image/kakao_login_large_narrow.png"}
                 onClick={e=>{e.preventDefault()
                     window.location.href=kakaoLoginUrl}}
            />

        </div>
    )
}

export default KakaoLoginButton