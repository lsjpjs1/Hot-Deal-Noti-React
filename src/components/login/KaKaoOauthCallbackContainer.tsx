import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {kakaoLogin} from "../../api/authApi";

const KaKaoOauthCallbackContainer = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        kakaoLogin(code,window.location.origin+window.location.pathname).then((res) => {
            localStorage.setItem("authToken",res.data.token)
            navigate("/")
        }).catch((error) => {
            console.log(error.response.data)
        })

    },[])

    return (
        <div>
        </div>
    )
}

export default KaKaoOauthCallbackContainer