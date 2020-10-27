import React from "react";
import classes from './chat.module.css'
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useFormik} from "formik";
import TextField from "@material-ui/core/TextField";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const Chat = (props) => {
    const formik = useFormik({
        initialValues: {
            newMessageText: '',
        }
    });
    const material = useStyles();
    return (
        <div className={classes.chatContainer}>
            <div className={classes.titleArea}>
                <div className={classes.title}><ChatIcon/><div className={classes.titleText}>Чат</div></div>
                <div className={classes.usersOnline}>
                    <AvatarGroup max={5}>
                        <Avatar className={material.small} alt="Egor" src="/images/avatars/kot.jpg"/>
                        <Avatar className={material.small} alt="Egor" src="/images/avatars/enot.jpg"/>
                        <Avatar className={material.small} alt="Egor" src="/images/avatars/lisa.jpg"/>
                        <Avatar className={material.small} alt="Egor" src="/images/avatars/medved.jpg"/>
                    </AvatarGroup>
                </div>
            </div>
            <div className={classes.messagesArea}>
                <div className={`${classes.message} ${classes.incoming}`}>
                    <div className={classes.avatar}>
                        <Avatar className={material.small} alt="Egor" src="/images/avatars/kot.jpg"/>
                    </div>
                    <div className={classes.messageText}>Привет всем</div>
                    <div className={classes.timestamp}>18:47</div>
                </div>
                <div className={`${classes.message} ${classes.outgoing}`}>
                    <div className={classes.avatar}>
                        <Avatar className={material.small} alt="Egor" src="/images/avatars/enot.jpg"/>
                    </div>
                    <div className={classes.messageText}>Добрый вечер!</div>
                    <div className={classes.timestamp}>19:17</div>
                </div>
                <div className={`${classes.message} ${classes.incoming}`}>
                    <div className={classes.avatar}>
                        <Avatar className={material.small} alt="Egor" src="/images/avatars/enot.jpg"/>
                    </div>
                    <div className={classes.messageText}>Вчера не смог добавить сделку! Лиза, посмотри пожалуйста, я
                        только что ее добавил
                    </div>
                    <div className={classes.timestamp}>19:22</div>
                </div>
                <div className={`${classes.message} ${classes.incoming}`}>
                    <div className={classes.avatar}>
                        <Avatar className={material.small} alt="Egor" src="/images/avatars/lisa.jpg"/>
                    </div>
                    <div className={classes.messageText}>Хорошо, посмотрю</div>
                    <div className={classes.timestamp}>20:01</div>
                </div>
            </div>
            <div className={classes.inputTextArea}>
                <div className={classes.avatarInput}>
                    <Avatar className={material.small} alt="Egor" src="/images/avatars/kot.jpg"/>
                </div>
                <TextField
                    id="newMessageText"
                    color='secondary'
                    className={classes.inputText}
                    fullWidth
                    multiline
                    rowsMax={3}
                    value={formik.values.newMessageText}
                    onChange={formik.handleChange}
                />
            </div>
        </div>
    )

}

export default Chat;