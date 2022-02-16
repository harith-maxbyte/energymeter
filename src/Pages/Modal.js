import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import { connect } from 'react-redux';
import { useDispatch } from "react-redux";

import DatePicker from '@mui/lab/DatePicker';


import { AiFillCloseCircle } from "react-icons/ai";
import { Box } from '@mui/system';
import "./Modalstyles.css";
import { EnergyDaily, ShiftDaily, EnergyWeekly, ShiftWeekly, selectedBtn, EnergyMonthly, ShiftMonthly, EnergyYear, ShiftYear, EnergyCustom, ShiftCustom } from '../store/actions/index';
import moment from 'moment';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//         // backgroundColor: "red",

//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//         //    backgroundColor: "green"
//     },
//     "& .MuiDialog-container": {
//         display: "flex",
//         justifyContent: "flex-end",
//         alignItems: "flex-start",

//     }
// }));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
//     const { reportSettings: {
//         dateTo
//     }
//  } = this.props;
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <AiFillCloseCircle />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function Modal() {

    const dispatch = useDispatch();
    const buttons = ["Day", "Week", "Month", "Year", "Custom"]


    const [open, setOpen] = useState(false);
    const [side, setSide] = useState(false);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    // const [startDate, setStartDate] = useState(new Date());
    const [clickedId, setClickedId] = useState(-1);
    const [clickedbtn, setClickedbtn] = useState("Day");

    // const [energyday, setEnergyday] = useState([]);
    const textInput = useRef(null);

    useEffect(() => {
        // textInput.current.focus();

        setClickedId(0);
        setSide(false);
        setClickedbtn("Day")
        dispatch(selectedBtn(clickedbtn))
    }, [])

    useEffect(() => {
        dispatch(selectedBtn(clickedbtn))
        if (clickedbtn === "Day") {
            dispatch(EnergyDaily())
            dispatch(ShiftDaily())
        }

        if (clickedbtn === "Week") {
            dispatch(EnergyWeekly())
            dispatch(ShiftWeekly())
        }

        if (clickedbtn === "Month") {
            dispatch(EnergyMonthly())
            dispatch(ShiftMonthly())
        }

        if (clickedbtn === "Year") {
            dispatch(EnergyYear())
            dispatch(ShiftYear())
        }

    }, [clickedbtn])

    useEffect(() => {
        dispatch(selectedBtn(clickedbtn))

        if (clickedbtn === "Custom") {
            var fr = moment.utc(from).format('MM/DD/YY')
            var t = moment.utc(to).format('MM/DD/YY')
            // console.log(fr, t)
            dispatch(EnergyCustom(fr, t))
            dispatch(ShiftCustom(fr, t))
        }
    }, [from, to])


    const handleClick = (event, id) => {
        setClickedId(id);
        setSide(false);
        setClickedbtn(event.target.name)
    };


    const customHandleClick = (event, id) => {
        setClickedId(id);
        setSide(true);
        setClickedbtn(event.target.name)
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ marginLeft: "55rem" }}>

            {buttons.map((buttonLabel, i) => {
                if (buttonLabel === "Day") {
                    return (<button
                        ref={textInput}
                        key={i}
                        name={buttonLabel}
                        onClick={(event) => handleClick(event, i)}
                        className={i === clickedId ? "customButton active" : "customButton"}
                        style={{ borderRadius: "30% 0% 0% 29% / 29% 0% 0% 28%" }}
                    >
                        {buttonLabel}
                    </button>)
                }
                else if (buttonLabel === "Custom") {
                    return (<button
                        key={i}
                        name={buttonLabel}
                        onClick={(event) => customHandleClick(event, i)}
                        className={i === clickedId ? "customButton active" : "customButton"}
                        style={{ borderRadius: "0% 25% 23% 0% / 0% 27% 30% 28%" }}
                    >
                        {buttonLabel}
                    </button>)
                }
                else {
                    return (
                        <button
                            key={i}
                            name={buttonLabel}
                            onClick={(event) => handleClick(event, i)}
                            className={i === clickedId ? "customButton active" : "customButton"}
                        >
                            {buttonLabel}
                        </button>)
                }
            })}
            {
                side && <span style={{ backgroundColor: "lightred", padding: 0, margin: 0 }} >
                    {/* <h4 style={{ margin: 20, padding: 0, display: "inline" }}>To <BsCalendarMonth /></h4> */}

                    <h4 style={{ margin: 0, padding: 0, height: "2px", color: "#fff", fontWeight: "normal", color: "#fff", fontFamily: "Nunito, sans-serif" }}>From
                        {/* <span style={{ margin: 0, padding: 0,  }}> */}
                        <div style={{ display: "inline-block", width: "10%", margin: 0, padding: 0, left: "-5px", position: "relative", bottom: "-3px" }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}
                            >
                                <DatePicker
                                    hintText="Choose Date"
                                    container="inline"
                                    inputStyle={{ textAlign: 'center' }}
                                    label="From"
                                    value={from}
                                    onChange={(newValue) => {
                                        setFrom(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 0 }}>
                                            <input ref={inputRef} {...inputProps} style={{ padding: "8%", width: "6rem", marginLeft: "1rem", marginRight: 0, marginTop: ".5rem", borderRadius: ".5rem", outline: "1px solid #e6ebeb", border: "none" }} />
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />

                            </LocalizationProvider>
                        </div>
                        {/* </span> */}
                    </h4>
                    <h4 style={{ margin: 0, padding: 0, display: "inline-block", height: "2px", marginLeft: "11rem", fontWeight: "normal", color: "#fff", fontFamily: "Nunito, sans-serif" }}>To
                        <span style={{ margin: 0, padding: 0, display: "inline-block", width: "10%" }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="To"
                                    value={to}
                                    onChange={(newValue) => {
                                        setTo(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <input ref={inputRef} {...inputProps} style={{ padding: "8%", width: "6rem", marginLeft: ".5rem", marginRight: 0, marginTop: ".5rem", borderRadius: ".5rem", outline: "1px solid #e6ebeb", border: "none" }} />
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />

                            </LocalizationProvider>
                        </span>
                    </h4>

                </span>



            }


        </div>
    );
}

export default Modal;