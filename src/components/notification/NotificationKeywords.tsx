import "./NotificationKeywords.css"
import {useEffect} from "react";
import {deleteKeyword, getKeywords, getUserEmail} from "../../api/notificationApi";
import {useDispatch, useSelector} from "react-redux";
import {callGetNotificationKeywords} from "../../modules/keywordNotification";
import {RootState} from "../../modules";
import {Button, Card, IconButton, Typography} from "@material-ui/core";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {notDeepEqual} from "assert";

const NotificationKeywords = () => {

    const dispatch = useDispatch()

    const notificationKeywords = useSelector((state: RootState) => state.keywordNotificationReducer.notificationKeywords);

    useEffect(() => {
        if (localStorage.getItem("authToken") != null) {
            // @ts-ignore
            dispatch(callGetNotificationKeywords())
        }
    }, []);

    const onDeleteKeywordClick = async (notificationKeywordId: number) => {
        await deleteKeyword(notificationKeywordId).then((res) => {
            window.location.reload()
        })
            .catch((error) => {
                alert(error.response.data.message)
            })
    }

    const keywordElements = notificationKeywords.map((notificationKeyword) => {
        return (
            <Card className={"notification-keyword-item"}>
                <div className={"notification-keyword-item-text-container"}>
                    <Typography>
                        {notificationKeyword.keywordNotificationBody}
                    </Typography>

                    {(notificationKeyword.minPrice != null || notificationKeyword.maxPrice != null) &&
                        <Typography className={"price-limit-text"}>
                            {notificationKeyword.minPrice != null &&
                                <Typography className={"price-limit-text"} display={"inline"}>
                                    {notificationKeyword.minPrice.toLocaleString()} 원
                                </Typography>
                            }
                            &nbsp;~&nbsp;
                            {notificationKeyword.maxPrice != null &&
                                <Typography className={"price-limit-text"} display={"inline"}>
                                    {notificationKeyword.maxPrice.toLocaleString()} 원
                                </Typography>
                            }
                        </Typography>
                    }
                </div>

                <div className={"notification-keyword-item-delete-button-container"}>
                    <IconButton id={"notification-keyword-item-delete-button"}
                    onClick={()=>{
                        onDeleteKeywordClick(notificationKeyword.keywordNotificationId)
                    }}
                    >
                        <CloseRoundedIcon/>
                    </IconButton>
                </div>


            </Card>
        )
    })

    return (
        <div className={"notification-keywords-container"}>
            {keywordElements}
            {keywordElements.length==0&&
            <div>
                <Typography>
                    원하시는 제품의 특가가 아직 없나요?<br/>
                    키워드를 등록하고, 특가 알림을 받아보세요!
                </Typography>
            </div>
            }
        </div>
    )
}

export default NotificationKeywords