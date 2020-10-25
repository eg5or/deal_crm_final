import React, {useState} from 'react';
import { ResponsiveBar } from '@nivo/bar'
// styles
import classes from './stats.module.css'
import AssignmentIcon from '@material-ui/icons/Assignment';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useFormik} from "formik";
import Button from "@material-ui/core/Button";
import BarChartIcon from '@material-ui/icons/BarChart';

const Stats = (props) => {
    const stats = [
        {date: '02.10.2020', delta: 15223},
        {date: '05.10.2020', delta: 8745},
        {date: '07.10.2020', delta: 20010},
        {date: '12.10.2020', delta: 3245},
        {date: '19.10.2020', delta: 10097},
        {date: '22.10.2020', delta: 29110},
        {date: '30.10.2020', delta: 59507},
    ]
    // -----------------------------------------------------------------------------------------------------------------
    // Formik для контроля графиков
    const formik = useFormik({
        initialValues: {
            year: '',
            month: '',
        }
    });
    console.log(formik.values.year)
    console.log(formik.values.month)
    // -----------------------------------------------------------------------------------------------------------------
    return (
        <div className={classes.statsPage}>
            <div className={classes.title}><h1>Статистика</h1></div>
            <div className={classes.statsContent}>
                <div className={classes.managerBlock}>
                    <div className={classes.name}>Енот Енотов</div>
                </div>
                <div className={classes.infoBlock}></div>
                <div className={classes.generalStats}>
                    <div className={classes.titleGS}>Общая статистика</div>
                    <div className={classes.tableGS}>
                        <div className={classes.rowsGS}>
                            <div className={classes.iconGS}><AssignmentIcon/></div>
                            <div className={classes.labelGS}>Всего сделок</div>
                            <div className={classes.valueGS}>15</div>
                        </div>
                        <div className={classes.rowsGS}>
                            <div className={classes.iconGS}><AccountBalanceWalletIcon/></div>
                            <div className={classes.labelGS}>Всего дельты</div>
                            <div className={classes.valueGS}>1 856 340 ₽</div>
                        </div>
                        <div className={classes.rowsGS}>
                            <div className={classes.iconGS}><FilterHdrIcon/></div>
                            <div className={classes.labelGS}>Самая большая дельта</div>
                            <div className={classes.valueGS}>150 000 ₽</div>
                        </div>
                        <div className={classes.rowsGS}>
                            <div className={classes.iconGS}><AccountBalanceIcon/></div>
                            <div className={classes.labelGS}>Сумма всех продаж</div>
                            <div className={classes.valueGS}>15 750 200 ₽</div>
                        </div>
                        <div className={classes.rowsGS}>
                            <div className={classes.iconGS}><MonetizationOnIcon/></div>
                            <div className={classes.labelGS}>БН</div>
                            <div className={classes.valueGS}>10 250 000 ₽</div>
                        </div>
                        <div className={classes.rowsGS}>
                            <div className={classes.iconGS}><MoneyOffIcon/></div>
                            <div className={classes.labelGS}>НН</div>
                            <div className={classes.valueGS}>5 150 200 ₽</div>
                        </div>
                    </div>
                </div>
                <div className={classes.graph}>
                    <div className={classes.control}>
                        <div className={classes.year}>
                            <FormControl variant="outlined" className={classes.yearControl}>
                                <InputLabel id="year">Год</InputLabel>
                                <Select
                                    labelId="year"
                                    id="year"
                                    value={formik.values.year}
                                    onChange={formik.handleChange}
                                    label="year"
                                    inputProps={{
                                        name: 'year',
                                        id: 'year',
                                    }}
                                >
                                    <MenuItem value={2020}>2020</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.month}>
                            <FormControl variant="outlined" className={classes.monthControl}>
                                <InputLabel id="month">Месяц</InputLabel>
                                <Select
                                    labelId="month"
                                    id="month"
                                    value={formik.values.month}
                                    onChange={formik.handleChange}
                                    label="month"
                                    inputProps={{
                                        name: 'month',
                                        id: 'month',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Все</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Январь</MenuItem>
                                    <MenuItem value={2}>Февраль</MenuItem>
                                    <MenuItem value={3}>Март</MenuItem>
                                    <MenuItem value={4}>Апрель</MenuItem>
                                    <MenuItem value={5}>Май</MenuItem>
                                    <MenuItem value={6}>Июнь</MenuItem>
                                    <MenuItem value={7}>Июль</MenuItem>
                                    <MenuItem value={8}>Август</MenuItem>
                                    <MenuItem value={9}>Сентябрь</MenuItem>
                                    <MenuItem value={10}>Октябрь</MenuItem>
                                    <MenuItem value={11}>Ноябрь</MenuItem>
                                    <MenuItem value={12}>Декабрь</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.button}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<BarChartIcon />}
                            >
                                Обновить
                            </Button>
                        </div>
                    </div>
                    <div className={classes.result}>
                        <div className={classes.rowsR}>
                            <div className={classes.labelR}>Дельта:</div>
                            <div className={classes.valueR}>150 000 ₽</div>
                        </div>
                        <div className={classes.rowsR}>
                            <div className={classes.labelR}>Кол-во сделок:</div>
                            <div className={classes.valueR}>7</div>
                        </div>
                        <div className={classes.rowsR}>
                            <div className={classes.labelR}>Самая большая дельта:</div>
                            <div className={classes.valueR}>59 000 ₽</div>
                        </div>
                    </div>
                    <div className={classes.bar}>
                        <ResponsiveBar
                            data={stats}
                            keys={['delta']}
                            indexBy="date"
                            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                            padding={0.3}
                            colors={{ scheme: 'nivo' }}
                            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Дни',
                                legendPosition: 'middle',
                                legendOffset: 32
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Дельта',
                                legendPosition: 'middle',
                                legendOffset: -50
                            }}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                            legends={[
                                {
                                    dataFrom: 'keys',
                                    anchor: 'bottom-right',
                                    direction: 'column',
                                    justify: false,
                                    translateX: 120,
                                    translateY: 0,
                                    itemsSpacing: 2,
                                    itemWidth: 100,
                                    itemHeight: 20,
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 0.85,
                                    symbolSize: 20,
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemOpacity: 1
                                            }
                                        }
                                    ]
                                }
                            ]}
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats;