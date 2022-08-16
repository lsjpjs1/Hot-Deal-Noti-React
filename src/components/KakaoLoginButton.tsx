import {Button} from "@material-ui/core";

const KakaoLoginButton = () => {

    const REST_API_KEY = process.env["REACT_APP_KAKAO_REST_API_KEY"]
    const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao"
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    return (
        <div>
            <Button onClick={e=>{e.preventDefault()
            window.location.href=kakaoLoginUrl}}>
                카카오 로그인
            </Button>
        </div>
    )
}

export default KakaoLoginButton