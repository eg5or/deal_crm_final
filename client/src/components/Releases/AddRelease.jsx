import React, {useState} from 'react';
// styles
import classes from './release.module.css'
import TextField from "@material-ui/core/TextField";
import {useFormik} from "formik";
import Button from "@material-ui/core/Button";


const AddRelease = ({addNewRelease}) => {
    // -----------------------------------------------------------------------------------------------------------------
    // Formik
    const formik = useFormik({
        initialValues: {
            title: '',
            text: '',
            item: '',
            version: '',
            date: '',
        }
    });

    const [array, setArray] = useState([])
    let [count, setCount] = useState(1)
    const onAddItem = () => {
        setArray(prevState => [...prevState, {id: count, item: formik.values.item}])
        setCount(count + 1)
        formik.values.item = ''
    }
    const items = array.map(i => <li key={i.id}>{i.id}: {i.item}</li>)
    const onAddRelease = () => {
        addNewRelease(formik.values.title, formik.values.text, array, formik.values.version, formik.values.date)
        setArray([])
        formik.values.title = ''
        formik.values.text = ''
        formik.values.item = ''
        formik.values.version = ''
        formik.values.date = ''
    }

    // -----------------------------------------------------------------------------------------------------------------
    return (
        <div className={classes.release}>
            <div className={classes.textFields}>
                <h2>Добавить</h2>
                <div className={classes.field}>
                    <TextField
                        id="title"
                        label="Заголовок"
                        fullWidth
                        rows={1}
                        defaultValue={''}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        variant="outlined"
                    />
                </div>
                <div className={classes.field}>
                    <TextField
                        id="text"
                        label="Текст релиза"
                        multiline
                        fullWidth
                        rows={10}
                        defaultValue={''}
                        value={formik.values.text}
                        onChange={formik.handleChange}
                        variant="outlined"
                    />
                </div>
                <div className={classes.field}>
                    <TextField
                        id="item"
                        label="Новое"
                        fullWidth
                        rows={1}
                        defaultValue={''}
                        value={formik.values.item}
                        onChange={formik.handleChange}
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary" onClick={onAddItem}>
                        Добавить
                    </Button>
                    <div className={classes.items}>
                        <ul>
                            {items}
                        </ul>
                    </div>
                </div>
                <div className={classes.field}>
                    <TextField
                        id="version"
                        label="Версия"
                        rows={1}
                        defaultValue={''}
                        value={formik.values.version}
                        onChange={formik.handleChange}
                        variant="outlined"
                    />
                </div>
                <div className={classes.field}>
                    <TextField
                        id="date"
                        label="Дата"
                        rows={1}
                        defaultValue={''}
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        variant="outlined"
                    />
                </div>
                <div className={classes.btn}>
                    <Button variant="contained" color="primary" onClick={onAddRelease}>
                        Сохранить
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default AddRelease;