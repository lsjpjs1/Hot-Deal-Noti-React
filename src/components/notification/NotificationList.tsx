import "./NotificationList.css"
import {Card, IconButton, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, {useEffect} from "react";
import NotificationKeywords from "./NotificationKeywords";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../modules";
import {callGetNotificationKeywords, callGetNotifications} from "../../modules/keywordNotification";
import {deleteKeyword} from "../../api/notificationApi";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const NotificationList = () =>{

    const dispatch = useDispatch()

    const notifications = useSelector((state: RootState) => state.keywordNotificationReducer.notifications);

    useEffect(() => {
        if (localStorage.getItem("authToken") != null) {
            // @ts-ignore
            dispatch(callGetNotifications())
        }
    }, []);

    const onNotificationCardClick = (hotDealId: number) =>{
        window.open(`/hot-deals/${hotDealId}`, '_blank')
    }

    const notificationElements = notifications.map((notification) => {
        return (
            <Card className={"notification-item"}
            onClick={()=>{
                onNotificationCardClick(notification.notificationItemId)
            }}
            >
                <div className={"notification-keyword-item-text-container"}>
                    <Typography id={"notification-title-text"}>
                        {notification.notificationTitle}
                    </Typography>

                    <Typography id={"notification-title-body"}>
                        {notification.notificationBody}
                    </Typography>


                </div>



            </Card>
        )
    })

    return (
        <Card className={"notification-list-container"}>
            <div
                className={"keyword-list-header"}
            >
                <div className={"keyword-list-text-container"}>
                    <Typography id={"keyword-list-text"}>
                        알림 목록
                    </Typography>
                </div>

            </div>

            <div className={"notification-keywords-list-container"}>
                <div className={"notification-keywords-container"}>
                    {notificationElements}
                    {notificationElements.length==0&&
                        <div>
                            <Typography>
                                아직 알림이 없습니다.
                            </Typography>
                        </div>
                    }
                </div>
            </div>
        </Card>
    )
}


export default NotificationList