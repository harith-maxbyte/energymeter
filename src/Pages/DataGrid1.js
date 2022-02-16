import React, { useEffect, useState } from "react";

import axios from "axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSelector } from "react-redux";

function createData(name, username, email, phone, website) {
    return { name, username, email, phone, website };
}

const rows = [];

export default function DataGrid1() {
    // const [data, setData] = useState([]);
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
    let shiftDay = useSelector(state => { return state.loggedReducer.shiftdaily });
    let shiftWeek = useSelector(state => { return state.loggedReducer.shiftweekly });
    let shiftMonth = useSelector(state => { return state.loggedReducer.shiftmonthly });
    let shiftYear = useSelector(state => { return state.loggedReducer.shiftyearly });
    let shiftCustom = useSelector(state => { return state.loggedReducer.shiftcustomly });

    if (selectedButton === "Day") {
        useData = shiftDay
    }
    if (selectedButton === "Week") {
        useData = shiftWeek
    }
    if (selectedButton === "Month") {
        useData = shiftMonth
    }
    if (selectedButton === "Year") {
        useData = shiftYear
    }
    if (selectedButton === "Custom") {
        useData = shiftCustom
    }
    return (
        <TableContainer component={Paper}
        sx={{
            maxHeight: 295
        }}>
            <Table aria-label="simple table" stickyHeader
                sx={{
                    height: "max-content"
                }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Shift</TableCell>
                        <TableCell align="center">Energy Consumption(kWh)</TableCell>
                        <TableCell align="center">Cumulative Energy(kWh)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {useData.map((row) => (
                        <TableRow key={row.cumEnergyVal}>
                            {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                            <TableCell align="center">{row.edate}</TableCell>
                            <TableCell align="center">{row.shiftName}</TableCell>
                            <TableCell align="center">{row.shiftEnergyVal}</TableCell>
                            <TableCell align="center">{row.cumEnergyVal}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
