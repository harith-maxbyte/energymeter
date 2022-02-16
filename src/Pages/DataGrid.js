import React, { useEffect, useState } from "react";

import axios from "axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSelector } from "react-redux";




export default function DataGrid() {
    let useData = [];
    useEffect(() => {
        // axios
        //     .get("https://jsonplaceholder.typicode.com/users")
        //     .then((res) => {
        //         setData(res.data);
        //         console.log("Result:", data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

    }, []);
    let selectedButton = useSelector(state => { return state.loggedReducer.btn });
    let energyDay = useSelector(state => { return state.loggedReducer.energydaily });
    let energyWeek = useSelector(state => { return state.loggedReducer.energyweekly });
    let energyMonth = useSelector(state => { return state.loggedReducer.energymonthly });
    let energyYear = useSelector(state => { return state.loggedReducer.energyyearly });
    let energyCustom = useSelector(state => { return state.loggedReducer.energycustomly });

    if (selectedButton === "Day") {
        useData = energyDay
    }
    if (selectedButton === "Week") {
        useData = energyWeek
    }
    if (selectedButton === "Month") {
        useData = energyMonth
    }
    if (selectedButton === "Year") {
        useData = energyYear
    }
    if (selectedButton === "Custom") {
        useData = energyCustom
    }

    return (
        <TableContainer
            component={Paper}
            sx={{
                maxHeight: 295
            }}
        >
            <Table
                aria-label="simple table"
                stickyHeader
                sx={{
                    height: "max-content"
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Energy Consumption(kWh)</TableCell>
                        <TableCell align="center">Month Consumption(kWh)</TableCell>
                        <TableCell align="center">Cumulative Energy(kWh)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {useData.map((row) => (
                        <TableRow key={row.previousDt}>
                            {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                            <TableCell align="center">{row.previousDt}</TableCell>
                            <TableCell align="center">{row.energyConsumption}</TableCell>
                            <TableCell align="center">{row.cumEnergyVal}</TableCell>
                            <TableCell align="center">{row.monthConsumption}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
