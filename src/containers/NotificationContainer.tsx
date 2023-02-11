import {useEffect} from "react";
import {useNavigate} from "react-router";
import NotificationChannelContainer from "../components/notification/NotificationChannelContainer";
import "./NotificationContainer.css"
import KeywordNotificationsContainer from "../components/notification/KeywordNotificationsContainer";
import NotificationList from "../components/notification/NotificationList";
import {Typography} from "@material-ui/core";
import mixpanel from "mixpanel-browser";

const NotificationContainer = () => {

    const navigate = useNavigate()

    useEffect(() => {

    },[])


    return (
        <div className={"notification-container"}>
            <Typography style={{fontWeight:"bold",marginBottom:"10px",cursor:"pointer"}}
            onClick={()=>{
                mixpanel.track(
                    "notificationDescriptionPageClick"
                );
                window.open(`https://bush-thorn-7ed.notion.site/2c4a74ce40a0496fac7f281c9efb96f2`, '_blank')
            }}
            >
                알림 사용법 Click!
            </Typography>
            <NotificationChannelContainer/>
            <div style={{margin:"20px",display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                <KeywordNotificationsContainer/>
                <NotificationList/>
            </div>
        </div>
    )
}

export default NotificationContainer