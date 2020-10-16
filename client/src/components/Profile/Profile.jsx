import React from 'react';
import classes from './Profile.module.css'
import MailIcon from '@material-ui/icons/Mail';
import ApartmentIcon from '@material-ui/icons/Apartment';
import CallIcon from '@material-ui/icons/Call';
import CakeIcon from '@material-ui/icons/Cake';
import PhoneLockedIcon from '@material-ui/icons/PhoneLocked';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import RowingIcon from '@material-ui/icons/Rowing';
import PersonIcon from '@material-ui/icons/Person';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AvatarDefault from '../../assets/images/avatar_default.jpg'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

const Profile = ({profileData: {name, position, head, intel, tel, location, birthday, email, avatar}}) => {
    let positionRU = ''
    switch (position) {
        case 'manager':
            positionRU = 'Менеджер'
            break
        case 'chief':
            positionRU = 'Нач.отдела'
            break
        case 'secretary':
            positionRU = 'Офис.менеджер'
            break
        case 'director':
            positionRU = 'Директор'
            break
        default:
            break
    }
    let locationRU = ''
    switch (location) {
        case 'korolev':
            locationRU = 'г.Королёв'
            break
        case 'tushino':
            locationRU = 'г.Москва Тушино'
            break
        default:
            break
    }

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className={classes.profilePage}>
            <div className={classes.title}><h1>Профиль</h1></div>
            <div className={classes.table}>
                <div className={classes.row}>
                    <div className={classes.icon}><PersonIcon /></div>
                    <div className={classes.label}>Имя</div>
                    <div className={classes.value}>{name}</div>
                </div>
                <div className={classes.row}>
                    <div className={classes.icon}><RowingIcon /></div>
                    <div className={classes.label}>Должность</div>
                    <div className={classes.value}>{positionRU}</div>
                </div>
                <div className={classes.row}>
                    <div className={classes.icon}><MailIcon /></div>
                    <div className={classes.label}>Почта</div>
                    <div className={classes.value}>{email}</div>
                </div>
                <div className={classes.row}>
                    <div className={classes.icon}><CallIcon /></div>
                    <div className={classes.label}>Телефон</div>
                    <div className={classes.value}>{tel}</div>
                </div>
                <div className={classes.row}>
                    <div className={classes.icon}><ApartmentIcon /></div>
                    <div className={classes.label}>Офис</div>
                    <div className={classes.value}>{locationRU}</div>
                </div>
                <div className={classes.row}>
                    <div className={classes.icon}><EventSeatIcon /></div>
                    <div className={classes.label}>Руководитель</div>
                    <div className={classes.value}>{head.name}</div>
                </div>
                <div className={classes.row}>
                    <div className={classes.icon}><PhoneLockedIcon /></div>
                    <div className={classes.label}>Внутренний телефон</div>
                    <div className={classes.value}>{intel}</div>
                </div>
                <div className={classes.row}>
                    <div className={classes.icon}><CakeIcon /></div>
                    <div className={classes.label}>День рождения</div>
                    <div className={classes.value}>{birthday}</div>
                </div>
            </div>
            <div className={classes.avatarBlock}>
                <div className={classes.avatar}><img src={avatar === '' ? 'images/avatars/default.png' : avatar} /></div>
                <div className={classes.changeAvatar}>
                    <div className={classes.uploadAvatar}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            startIcon={<PhotoCameraIcon />}
                        >
                            Загрузить
                        </Button>
                    </div>
                </div>
            </div>
            <div className={classes.changePassword}>
                <div className={classes.titlePassword}>Сменить пароль</div>
                <div className={classes.labelPassword}>Введите новый пароль:</div>
                <div className={classes.inputPassword}>
                    <FormControl  variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default Profile;