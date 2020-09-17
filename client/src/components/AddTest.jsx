import React, {useState} from 'react';
import classes from './AddTest.module.css'
import {testAPI} from "../API/api";

const AddTest = (props) => {
    const [form, setForm] = useState({
        name: '',
        sum: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const sendHandler = async () => {
        try {
            testAPI.postTest(form)
            console.log(form)
        } catch (e) {

        }
    }

    return (
        <div className={classes.addTestBlock}>
            <h1>AddTest</h1>
            <div>
                <label htmlFor='name'>Имя:</label>
                <input placeholder="Введите имя"
                       id="name"
                       type="text"
                       name="name"
                       onChange={changeHandler}
                />
            </div>
            <div>
                <label htmlFor='sum'>Сумма:</label>
                <input placeholder="Введите имя"
                       id="sum"
                       type="text"
                       name="sum"
                       onChange={changeHandler}
                />
            </div>
            <div>
                <button onClick={sendHandler}>Отправить</button>
            </div>




        </div>
    )
}

export default AddTest;