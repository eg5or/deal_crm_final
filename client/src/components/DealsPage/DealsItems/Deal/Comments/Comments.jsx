import React, {useState} from "react";
import classes from "../deal.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import {useFormik} from "formik";


const Comments = ({commentManager, commentHead, editComment, loading, id, managerId, position}) => {
    // -----------------------------------------------------------------------------------------------------------------
    // Formik
    const formik = useFormik({
        initialValues: {
            commentManager: '',
            commentHead: ''
        }
    });
    // -----------------------------------------------------------------------------------------------------------------
    // Комментарии
    // менеджер
    const [editModeCM, setEditModeCM] = useState(false)
    const onEditModeCMOn = () => {
        setEditModeCM(true)
        formik.values.commentManager = commentManager
    }
    const onEditModeCMOff = () => {
        setEditModeCM(false)
        if (formik.values.commentManager !== commentManager) {
            onEditComment('CM')
        }
    }
    const onEditModeCMCancel = () => {
        setEditModeCM(false)
        formik.values.commentManager = commentManager
    }
    // руководитель
    const [editModeCH, setEditModeCH] = useState(false)
    const onEditModeCHOn = () => {
        setEditModeCH(true)
        formik.values.commentHead = commentHead
    }
    const onEditModeCHOff = () => {
        setEditModeCH(false)
        if (formik.values.commentHead !== commentHead) {
            onEditComment('CH')
        }
    }
    const onEditModeCHCancel = () => {
        setEditModeCH(false)
        formik.values.commentHead = commentHead
    }
    const onEditComment = (type) => {
        let text = ''
        switch (type) {
            case 'CM':
                text = formik.values.commentManager
                break
            case 'CH':
                text = formik.values.commentHead
        }
        editComment(id, type, text, managerId)
    }
    // validation
    let errorTextCM = false
    if (formik.values.commentManager.length > 165) {
        errorTextCM = true
    }
    let errorTextCH = false
    if (formik.values.commentHead.length > 165) {
        errorTextCH = true
    }
    // -----------------------------------------------------------------------------------------------------------------
    return (
        <>
            <div className={classes.commentsBlock}>
                <div className={`${classes.commentTitle} ${classes.commentTitleManager}`}>
                    Комментарий менеджера:
                    {loading.commentManager &&
                    <div className={classes.loadingComment}><CircularProgress color="secondary" size={13}/></div>}
                </div>
                <div className={`${classes.lengthTextManager}`}>
                    <div className={classes.errorText}>
                        {errorTextCM && 'Максимальная длина 165 символов!  '}
                    </div>
                    <div className={`${classes.currentLengthText} ${!editModeCM && classes.displayNone}`}>
                        {formik.values.commentManager.length}
                    </div>
                </div>
                {!editModeCM
                    ? (position === 'manager') &&
                    <div className={`${classes.editComment} ${classes.editCommentManager}`}
                         onClick={onEditModeCMOn}>редактировать</div>
                    : <div className={`${classes.editComment} ${classes.editCommentManager}`}
                           onClick={onEditModeCMOff}>сохранить</div>}
                {editModeCM && <div className={classes.cancelEditManager} onClick={onEditModeCMCancel}>Х</div>}
                <div className={`${classes.comment} ${classes.commentManager}`}>
                    {!editModeCM
                        ? commentManager
                        : <TextField
                            id="commentManager"
                            //label="commentManager"
                            multiline
                            fullWidth
                            size={'small'}
                            error={errorTextCM}
                            rowsMax={2}
                            value={formik.values.commentManager}
                            defaultValue={commentManager}
                            onChange={formik.handleChange}
                        />}
                </div>
                <div className={`${classes.commentTitle} ${classes.commentTitleHead}`}>
                    Комментарий руководителя:
                    {loading.commentHead &&
                    <div className={classes.loadingComment}><CircularProgress color="secondary" size={13}/></div>}
                </div>
                <div className={`${classes.lengthTextHead}`}>
                    <div className={classes.errorText}>
                        {errorTextCH && 'Максимальная длина 165 символов!  '}
                    </div>
                    <div className={`${classes.currentLengthText} ${!editModeCH && classes.displayNone}`}>
                        {formik.values.commentHead.length}
                    </div>
                </div>
                {!editModeCH
                    ? (position === 'chief') && <div className={`${classes.editComment} ${classes.editCommentHead}`}
                                                     onClick={onEditModeCHOn}>редактировать</div>
                    : <div className={`${classes.editComment} ${classes.editCommentHead}`}
                           onClick={onEditModeCHOff}>сохранить</div>}
                {editModeCH && <div className={classes.cancelEditHead} onClick={onEditModeCHCancel}>Х</div>}
                <div className={`${classes.comment} ${classes.commentHead}`}>
                    {!editModeCH
                        ? commentHead
                        : <TextField
                            id="commentHead"
                            //label="Multiline"
                            multiline
                            fullWidth
                            autoFocus={true}
                            size={'small'}
                            error={errorTextCH}
                            rowsMax={2}
                            value={formik.values.commentHead}
                            defaultValue={commentHead}
                            onChange={formik.handleChange}
                        />}
                </div>
            </div>
        </>
    )
}

export default Comments;