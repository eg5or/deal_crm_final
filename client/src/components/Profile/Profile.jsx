import React from 'react';
import classes from './Profile.module.css'

const Profile = (props) => {
    const onChanged = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <input type={'file'} onChange={onChanged} />
        </div>
    )
}

export default Profile;