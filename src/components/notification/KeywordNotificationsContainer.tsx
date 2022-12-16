import "./KeywordNotificationsContainer.css"
import {Button, Card, IconButton, Modal, TextField, Typography} from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import {postKeyword} from "../../api/notificationApi";
import NotificationKeywords from "./NotificationKeywords";
import {useNavigate} from "react-router";

const KeywordNotificationsContainer = () => {

    const PRICE_LIMIT = 50000000
    const [isAddKeywordModalOpen, setIsAddKeywordModalOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [minPrice, setMinPrice] = useState<number>(null);
    const [maxPrice, setMaxPrice] = useState<number>(null);

    const navigate = useNavigate()

    const onModalClose = () => {
        clearState()
    }

    const clearState = ()=>{
        setIsAddKeywordModalOpen(false)
        setKeyword("")
        setMinPrice(null)
        setMaxPrice(null)
    }

    const openAddKeywordModal = () =>{
        if (localStorage.getItem("authToken")==null){
            navigate("/login")
        }else{

            setIsAddKeywordModalOpen(true)
        }
    }

    const onAddKeywordInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>{
        setKeyword(event.target.value)
    }

    const onMinPriceInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>{
        if (event.target.value==""){
            setMinPrice(null)
        }else {
            const removeComma = event.target.value.replaceAll(",","")
            const input = Number.parseInt(removeComma)
            if (isNaN(input)){
                alert("숫자만 입력해주세요.")
            }else {
                setMinPrice(input<=PRICE_LIMIT?input:PRICE_LIMIT)
            }
        }

    }

    const onAddKeywordButtonClick = async () =>{
        await postKeyword({
            keyword: keyword,
            minPrice: minPrice,
            maxPrice: maxPrice
        }).then((res) => {
            window.location.reload()
        })
            .catch((error) => {
                alert(error.response.data.message)
            })
    }



    const onMaxPriceInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>{
        if (event.target.value==""){
            setMaxPrice(null)
        }else {
            const removeComma = event.target.value.replaceAll(",","")
            const input = Number.parseInt(removeComma)
            if (isNaN(input)){
                alert("숫자만 입력해주세요.")
            }else {
                setMaxPrice(input<=PRICE_LIMIT?input:PRICE_LIMIT)
            }
        }

    }


    return (
        <Card className={"keyword-notifications-container"}>

            <div
                className={"keyword-list-header"}
            >
                <div className={"keyword-list-text-container"}>
                    <Typography id={"keyword-list-text"}>
                        키워드 목록
                    </Typography>
                </div>

                <div className={"open-add-keyword-modal-button-container"}>
                    <IconButton id={"open-add-keyword-modal-button"}
                    onClick={openAddKeywordModal}>
                        <AddIcon/>
                    </IconButton>
                </div>

            </div>

            <div className={"notification-keywords-list-container"}>
                <NotificationKeywords/>
            </div>


            <Modal
                className={"add-keyword-modal"}
                open={isAddKeywordModalOpen}
                onClose={onModalClose}
            >
                <div className={"add-keyword-modal-inner"}
                >
                    <Typography id={"register-keyword-text"}>
                        키워드 등록
                    </Typography>

                    <div className={"add-keyword-input-container"}>
                        <Typography>
                            키워드 :
                        </Typography>
                        <TextField
                            className={"add-keyword-input-text-field"}
                            onChange={onAddKeywordInputChange}
                            value={keyword}
                        placeholder={"ex) 그램, 리전, 3060 등"}
                        >
                        </TextField>
                    </div>

                    <div className={"price-limit-input-container"}>
                        <Typography>
                            가격 제한(선택) :
                        </Typography>
                        <TextField
                            className={"price-limit-input-text-field"}
                            onChange={onMinPriceInputChange}
                            value={minPrice==null?"":minPrice.toLocaleString()}
                        >
                        </TextField>
                        <Typography>
                            원 이상
                        </Typography>

                        <TextField
                            className={"price-limit-input-text-field"}
                            onChange={onMaxPriceInputChange}
                            value={maxPrice==null?"":maxPrice.toLocaleString()}
                        >
                        </TextField>
                        <Typography>
                            원 이하
                        </Typography>
                    </div>


                    <div className={"add-keyword-button-container"}>
                        <Button
                            color={"default"}
                            variant={"contained"}
                            onClick={onAddKeywordButtonClick}
                        >
                            등록
                        </Button>
                    </div>

                </div>

            </Modal>
        </Card>
    )
}

export default KeywordNotificationsContainer