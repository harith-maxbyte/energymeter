import React, { Component } from 'react';
import { Grid, Card, Divider, IconButton, Tooltip, tooltipClasses } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import Chart from 'react-apexcharts'
// import axios from 'axios';
import { BsCalendarMonth } from "react-icons/bs"
import { AiOutlineClockCircle } from "react-icons/ai"
import { Link } from "react-router-dom";
import Modal from './Modal';
import moment from 'moment';

import { styled } from '@mui/material';

import Dashstyles1 from './Dashboardstyles1'
// import axios from 'axios';
import DataGrid from './DataGrid';
import DataGrid1 from './DataGrid1';
import { connect } from 'react-redux';
import { EnergyMonthly, ShiftMonthly, ShiftDaily, ShiftWeekly, ShiftYear, ShiftCustom } from "../store/actions/index";



const LightTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.common.white,
		color: "rgba(0, 0, 0, 0.87)",
		boxShadow: theme.shadows[1],
		fontSize: 12
	}
}));

/**
 * @class
 * Class representing Dashboard component
 */
let useBtn = []
class Dashboard1 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			useData: [],
			day: [],
			energymonthdata: [],

		};
	}
	componentDidMount() {
		this.props.dispatch(EnergyMonthly())

		this.props.dispatch(ShiftDaily())
		this.props.dispatch(ShiftWeekly())
		this.props.dispatch(ShiftMonthly())
		this.props.dispatch(ShiftYear())
		// this.props.dispatch(ShiftCustom())


	}
	/**
	* @function
	* all required functions.
	*/
	timeConverter = (t) => {
		let newDate = moment.utc(t).format('MM/DD/YY');
		return newDate
	}

	energyConsumptionChart = (selectedButton, energyDailyChart, energyWeeklyChart, energyMonthlyChart, energyCustomChart, energyYearlyData, shiftYearlyData) => {

		let data = []
		if (selectedButton === "Day") {
			data = energyDailyChart
		}
		if (selectedButton === "Week") {
			data = energyWeeklyChart
		}
		if (selectedButton === "Month") {
			data = energyMonthlyChart
		}
		if (selectedButton === "Year") {
			data = energyYearlyData
		}
		if (selectedButton === "Custom") {
			data = energyCustomChart
		}
		let time = []
		let seriesData = []
		var series = []

		data.map((v => {
			time.push(this.timeConverter(v.previousDt))
			seriesData.push(v.energyConsumption.toFixed(2))
		}))
		series = [
			{ name: "Energy Consumption", data: seriesData }
		]
		var options = {

			xaxis: {
				type: 'date',
				categories: time,
				tickPlacement: 8,
			},
			stroke: {
				width: 2,
				curve: 'smooth',
			},
			dataLabels: {
				enabled: false,
				dropShadow: {
					enabled: true
				}
			},
			title: {
				text: "Energy Consumption",
				align: 'left',
				offsetX: 7,
				offsetY: 7,
				style: {
					fontSize: '17px',
					fontWeight: "bold",
					color: "rgb(33, 33, 33)",
					fontFamily: "Roboto, sans-serif",
				},
			},
			tooltip: {
				theme: "dark",
			},

			// fill: {
			// 	opacity: 1
			// },
			fill: {
				opacity: [0.85, 0.25, 1],
				gradient: {
					inverseColors: false,
					shade: 'light',
					type: "vertical",
					opacityFrom: 0.85,
					opacityTo: 0.55,
					stops: [0, 100, 100, 100]
				}
			},
			legend: {
				position: 'bottom',
				showForSingleSeries: true,
				fontWeight: "bold",
				onItemClick: {
					toggleDataSeries: true
				}
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'],
					opacity: 0.5
				},
			},
			chart: {
				toolbar: {
					show: true,
					zoom: {
						enabled: true,
					}
				},
				dropShadow: {
					enabled: true,
					color: '#000',
					top: 18,
					left: 7,
					blur: 10,
					opacity: 0.1
				},
			},
			plotOptions: {
				bar: {
					horizontal: false,
					borderRadius: 0,
					columnWidth: '30%',
					barHeight: '10%',
					distributed: false,
					rangeBarOverlap: true,
					rangeBarGroupRows: false,
					colors: {
						ranges: [{
							from: 0,
							to: 0,
							color: undefined
						}],
						backgroundBarColors: [],
						backgroundBarOpacity: 1,
						backgroundBarRadius: 0,
					},
					dataLabels: {
						position: 'top',
						maxItems: 100,
						hideOverflowingLabels: true,
					}
				}
			},
			colors: ['#eb5255', '#FFA500', '#33b2df'],
		};
		return (
			<Chart options={options} series={series} type="bar" height={380} />
		)
	}

	shiftA = (a) => {
		let shifta = 0;
		Object.values(a).map((item) => (
			(item.shiftName === "Shift A") ?
				shifta = shifta + Math.round(item.shiftEnergyVal)
				: ""
		))
		return shifta;
	}

	shiftB = (b) => {

		let shiftb = 0;
		Object.values(b).map((item) => (
			(item.shiftName === "Shift B") ?
				shiftb = shiftb + Math.round(item.shiftEnergyVal)
				: ""
		))
		return shiftb;
	}

	shiftC = (c) => {
		let shiftc = 0;
		Object.values(c).map((item) => (
			(item.shiftName === "Shift C") ?
				shiftc = shiftc + Math.round(item.shiftEnergyVal)
				: ""
		))
		return shiftc;
	}


	shiftwiseReport = (selectedButton, shiftDailyData, shiftWeeklyData, shiftMonthlyData, shiftCustomData, shiftYearlyData) => {
		if (selectedButton === "Day") {
			useBtn = shiftDailyData
		}
		if (selectedButton === "Week") {
			useBtn = shiftWeeklyData
		}
		if (selectedButton === "Month") {
			useBtn = shiftMonthlyData
		}
		if (selectedButton === "Year") {
			useBtn = shiftYearlyData
		}
		if (selectedButton === "Custom") {
			useBtn = shiftCustomData
		}
	}

	/** rendering Dashboard information. */
	render() {
		const { classes, selectedButton, energyDailyChart,
			energyWeeklyChart, energyMonthlyChart, energyCustomChart, shiftMonthlyChart,
			shiftDailyData, shiftWeeklyData, shiftMonthlyData, shiftCustomData, energyYearlyData, shiftYearlyData
		} = this.props;
		return (
			<>
				<div className={classes.device}>
					<h3 style={{ paddingLeft: '1rem', color: "#fff", fontFamily: "Nunito, sans-serif", fontSize: "15px", margin: 0 }}>Laser Bar Code Printer</h3>
					<Modal />
				</div>
				<span style={{ display: "flex", justifyContent: "flex-end", margin: 0, padding: 0 }}></span>

				<Grid container spacing={2}>

					<Grid item xs={12} sm={6} md={12}>

						<span className={classes.dashboardbtn}>
							<Link style={{ textDecoration: 'none', color: 'white' }} to="/2">
								<LightTooltip title="Dashboard">
									<IconButton color="inherit" className={classes.myClassName}>
										<i className='bx bx-grid-alt' animation='tada'></i>
									</IconButton>
								</LightTooltip>
							</Link>
						</span>


					</Grid>

					<Grid item xs={12} sm={6} md={4}>
						<Card style={{ height: 395, borderRadius:"15px",display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "rgb(33, 33, 33)", fontFamily: "Nunito, sans-serif" }}>
							<Card className={classes.carda}>
								<div className={classes.first}>
									<AiOutlineClockCircle size={35} />
									<div className={classes.firstinnertxt}>
										{energyDailyChart.map((v) => {
											return <p style={{ margin: 0 }} key={v.energyConsumption}>{Math.round(v.energyConsumption)} kWh</p>
										})}
										<p style={{ margin: 0 }}>Today's Consumption</p>
									</div>
								</div>
							</Card>
							<Card className={classes.carda}>
								<div className={classes.second}>
									<BsCalendarMonth size={35} />
									<div className={classes.firstinnertxt}>
										{energyMonthlyChart.map((v, i) => {
											if (energyMonthlyChart.length === i + 1) {
												return <p style={{ margin: 0 }} key={v.monthConsumption}>{v.monthConsumption} kWh</p>
											}
										})}
										<p style={{ margin: 0 }}>Month Consumption</p>
									</div>
								</div>
							</Card>

							<div style={{ border: "1px solid grey", width: "80%", background: "#223357", fontWeight: "normal", color: "#fff", fontFamily: "Nunito, sans-serif", boxShadow: '5px 5px 5px grey', borderRadius: '15px', padding: "2%" }}>
								<span style={{ display: "flex", justifyContent: "center" }}>Shiftwise Consumption</span>
								<Divider style={{ background: "#fff" }} />

								{this.shiftwiseReport(selectedButton, shiftDailyData, shiftWeeklyData, shiftMonthlyData, shiftCustomData, shiftYearlyData)}
								<table style={{ textAlign: "center", width: "90%" }}>
									<tbody>
										<tr>
											<td style={{ width: "50%" }}>Shift A</td>
											{/* <td>{this.shiftA(useBtn)} kWh</td> */}
											<td>{this.shiftA(shiftDailyData)} kWh</td>
										</tr>
										<tr>
											<td style={{ width: "50%" }}>Shift B</td>
											{/* <td>{this.shiftB(useBtn)} kWh</td> */}
											<td>{this.shiftB(shiftDailyData)} kWh</td>
										</tr>
										<tr>
											<td style={{ width: "50%" }}>Shift C</td>
											{/* <td>{this.shiftC(useBtn)} kWh</td> */}
											<td>{this.shiftB(shiftDailyData)} kWh</td>
										</tr>
									</tbody>
								</table>
							</div>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={8}>
						<Card style={{borderRadius:"15px"}}>
							{this.energyConsumptionChart(selectedButton, energyDailyChart, energyWeeklyChart, energyMonthlyChart, energyCustomChart, energyYearlyData, shiftYearlyData)}
						</Card>
					</Grid>


					<Grid item xs={12} sm={6} md={6}>
						<Card style={{ borderRadius: "2rem" }}>
							<center><h3 style={{
								fontWeight: "bold", borderTopLeftRadius: "1.5rem", borderTopRightRadius: "1.5rem",
								color: "rgb(33, 33, 33)", background: "#384480", color: "#fff",
								fontFamily: "Nunito, sans-serif", padding: "8px", margin: 0
							}}>Energy Consumption-Daily</h3></center>
							{/* <Tables /> */}

							<DataGrid />
						</Card>
					</Grid>
					{/* <DataGrid/> */}
					<Grid item xs={12} sm={6} md={6}>
						<Card style={{ borderRadius: "2rem" }}>
							<center><h3 style={{
								fontWeight: "bold", borderTopLeftRadius: "1.5rem", borderTopRightRadius: "1.5rem",
								color: "rgb(33, 33, 33)", background: "#384480", color: "#fff",
								fontFamily: "Nunito, sans-serif", padding: "8px", margin: 0
							}}>Energy Consumption-Shiftwise</h3></center>
							{/* <Tables1 /> */}
							<DataGrid1 />
						</Card>
					</Grid>

				</Grid>

			</>
		);
	}
}


/** Get data from store and assign to props. */
const mapStateToProps = (state) => {
	return {
		selectedButton: state.loggedReducer.btn,
		energyDailyChart: state.loggedReducer.energydaily,
		energyWeeklyChart: state.loggedReducer.energyweekly,
		energyMonthlyChart: state.loggedReducer.energymonthly,
		energyCustomChart: state.loggedReducer.energycustomly,

		shiftDailyData: state.loggedReducer.shiftdaily,
		shiftWeeklyData: state.loggedReducer.shiftweekly,
		shiftMonthlyData: state.loggedReducer.shiftmonthly,

		energyYearlyData: state.loggedReducer.energyyearly,
		shiftYearlyData: state.loggedReducer.shiftyearly,
		shiftCustomData: state.loggedReducer.shiftcustomly,


	}
};

export default connect(
	mapStateToProps
)(withStyles(Dashstyles1)(Dashboard1));
