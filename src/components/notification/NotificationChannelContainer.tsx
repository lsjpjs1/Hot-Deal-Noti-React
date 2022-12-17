import {Button, Container, Modal, TextField, Typography} from "@material-ui/core";
import "./NotificationChannelContainer.css"
import HotDealSortingSelect from "../HotDealSortingSelect";
import ProductPurposeSelect from "../ProductPurposeSelect";
import ManufacturerSelect from "../ManufacturerSelect";
import SourceSiteCheckBoxGroup from "../SourceSiteCheckBoxGroup";
import React, {ChangeEvent, useEffect, useState} from "react";
import {postRecommendationProductFamily} from "../../api/recommendationApi";
import {checkEmailVerificationCode, getUserEmail, sendEmailVerificationCode} from "../../api/notificationApi";
import mixpanel from "mixpanel-browser";
import {useNavigate} from "react-router";

const NotificationChannelContainer = () => {

    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("authToken")!=null){
            getUserEmail().then((res) => {
                setUserEmail(res.data.userEmail)
            })
        }


    }, [])


    const [isEmailVerificationModalOpen, setIsEmailVerificationModalOpen] = useState(false);
    const [targetUserEmail, setTargetUserEmail] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [emailVerificationCode, setEmailVerificationCode] = useState("");
    const [showVerificationCodeContainer, setShowVerificationCodeContainer] = useState(false);

    const emailRE = new RegExp("^([\\w\\.\\_\\-])*[a-zA-Z0-9]+([\\w\\.\\_\\-])*([a-zA-Z0-9])+([\\w\\.\\_\\-])+@([a-zA-Z0-9]+\\.)+[a-zA-Z0-9]{2,8}$")

    const openEmailVerificationModal = () => {
        mixpanel.track(
            "emailVerificationModalButtonClick"
        );
        if (localStorage.getItem("authToken")==null){
            navigate("/login")
        }else{
            setIsEmailVerificationModalOpen(true)
        }
    }

    const onEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTargetUserEmail(event.target.value)
    }

    const onEmailVerificationCodeChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEmailVerificationCode(event.target.value)
    }

    const onEmailVerificationButtonClick = () => {
        mixpanel.track(
            "sendEmailVerificationCodeClick",
            {
                "email":targetUserEmail
            }
        );
        if (emailRE.exec(targetUserEmail) != null) {
            setShowVerificationCodeContainer(true)
            callSendEmailVerificationCode()
        } else {
            alert("이메일 형식을 확인해주세요.")
        }
    }

    const onEmailVerificationCodeResendButtonClick = () => {
        mixpanel.track(
            "resendEmailVerificationCodeClick",
            {
                "email":targetUserEmail
            }
        );
        callSendEmailVerificationCode()
    }

    const onEmailVerificationCodeCheckButtonClick = async () => {
        mixpanel.track(
            "checkEmailVerificationCodeClick",
            {
                "email":targetUserEmail,
                "verificationCode":emailVerificationCode
            }
        );
        if (emailVerificationCode != "") {
            await checkEmailVerificationCode(emailVerificationCode)
                .then((res) => {
                    window.location.reload()
                })
                .catch((error) => {
                    alert(error.response.data.message)
                })
        } else {
            alert("인증번호를 입력해주세요.")
        }

    }

    const clearModal = () => {
        setIsEmailVerificationModalOpen(false)
        setTargetUserEmail("")
        setShowVerificationCodeContainer(false)
    }

    const callSendEmailVerificationCode = async () => {
        await sendEmailVerificationCode(
            targetUserEmail
        ).then((res) => {

        }).catch((error) => {
            alert(error.response.data)
        })
    }

    return (
        <div className={"notification-channel-container"}>

            <div className={"email-channel-container"}>
                <Typography className={"channel-title-text"}>
                    이메일 알림:&nbsp;
                </Typography>

                {userEmail == "" &&
                    <Button id={"email-verification-open-button"}
                            onClick={openEmailVerificationModal}
                            color={"default"}
                            variant={"contained"}
                    >
                        이메일 등록
                    </Button>
                }

                {userEmail != "" &&
                    <div>
                        <Typography>
                            {userEmail} (인증 완료)
                            <Button id={"email-verification-open-button"}
                                    onClick={openEmailVerificationModal}
                                    color={"default"}
                                    variant={"contained"}
                            >
                                이메일 수정
                            </Button>
                        </Typography>

                    </div>

                }

            </div>

            <div className={"android-channel-container"}>
                <Typography className={"channel-title-text"}>
                    앱 푸쉬 알림:&nbsp;
                </Typography>

                <img className={"android-link-image"} onClick={() => {
                    mixpanel.track(
                        "androidLinkClickInNotificationPage"
                    );
                    window.open("https://play.google.com/store/apps/details?id=com.hotdealnoti", '_blank')
                }} src={require("../../image/get_it_on_google_play.png")}/>


            </div>


            <Modal
                className={"email-verification-modal"}
                open={isEmailVerificationModalOpen}
                onClose={() => {
                    clearModal()
                }}
            >
                <div className={"email-verification-modal-inner"}
                >

                    <Typography id={"register-email-text"}>
                        이메일 등록
                    </Typography>

                    <div className={"email-verification-container"}>
                        <Typography>
                            이메일 주소 :
                        </Typography>
                        <TextField
                            className={"email-verification-container-text-field"}
                            onChange={onEmailChange}
                            value={targetUserEmail}
                            disabled={showVerificationCodeContainer}
                        >
                        </TextField>
                        {!showVerificationCodeContainer &&
                            <Button
                                onClick={onEmailVerificationButtonClick}
                            >
                                인증번호 전송
                            </Button>
                        }

                    </div>

                    {showVerificationCodeContainer &&
                        <div className={"email-verification-code-validate-container"}>
                            <Typography>
                                인증번호 :
                            </Typography>
                            <TextField
                                className={"email-verification-container-text-field"}
                                onChange={onEmailVerificationCodeChange}
                                value={emailVerificationCode}
                            >
                            </TextField>
                            <Button
                                onClick={onEmailVerificationCodeCheckButtonClick}
                            >
                                확인
                            </Button>

                            <Button
                                onClick={onEmailVerificationCodeResendButtonClick}
                            >
                                재전송
                            </Button>
                        </div>
                    }


                </div>

            </Modal>
        </div>
    )
}

export default NotificationChannelContainer