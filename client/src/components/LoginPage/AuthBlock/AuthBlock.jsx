import React from "react";
import classes from './AuthBlock.module.css'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const AuthBlock = (props) => {

    let newEmailElement = React.createRef()
    let newPasswordElement = React.createRef()

    let onRegister = () => {
        props.register(props.newEmailText, props.newPasswordText)
    }

    let onLogin = () => {
        props.login(props.newEmailText, props.newPasswordText)
    }

    let onEmailChange = () => {
        let text = newEmailElement.current.value
        props.newEmailTextAC(text)
    }

    let onPasswordChange = () => {
        let text = newPasswordElement.current.value
        props.newPasswordTextAC(text)
    }

    return (
        <div className={classes.AuthBlock}>
            <TextField
                id="email"
                label="E-mail"
                type='text'
                name='email'
                inputRef={newEmailElement}
                onChange={onEmailChange}
                value={props.newEmailText}
                size="small"
                fullWidth={true}
            />
            <TextField
                id="password"
                label="Password"
                type='password'
                name='password'
                inputRef={newPasswordElement}
                onChange={onPasswordChange}
                value={props.newPasswordText}
                size='medium'
                margin='dense'
                fullWidth={true}
            />
            <div className={classes.btnBlock}>
                <ButtonGroup disableElevation variant="contained">
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={onLogin}
                    >Войти</Button>
                    {/*<Button
                        size="small"
                        variant="contained"
                        onClick={onRegister}
                    >Регистрация</Button>*/}
                </ButtonGroup>
            </div>
        </div>
    )
}

export default AuthBlock;