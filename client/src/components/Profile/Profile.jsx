import React from 'react';
import classes from './Profile.module.css'
import Preloader from "../../common/Preloader/Preloader";

const Profile = (props) => {
    const onChanged = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <Preloader />
        </div>
    )
}

export default Profile;