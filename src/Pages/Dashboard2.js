import React, { Component } from 'react';
import { Grid, Card, Paper, Divider } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import { BiShare } from 'react-icons/bi'
import Chart from 'react-apexcharts'
import { GiElectric } from 'react-icons/gi';
import { TiArrowBackOutline } from 'react-icons/ti';
import axios from 'axios';
import Dashstyles2 from './Dashboardstyles2'
import { Link } from "react-router-dom";
import moment from 'moment';


/**
 * @class
 * Class representing Dashboard component
 */
class Dashboard2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			val: [],
			current: 0.00,
			energy: 0.00,
			Powerfactor: 0.00,
			voltage: 0.00,

			current1: 0.00,
			energy1: 0.00,
			Powerfactor1: 0.00,
			voltage1: 0.00,

			current2: 0.00,
			energy2: 0.00,
			Powerfactor2: 0.00,
			voltage2: 0.00,
		}
	}

	componentDidMount() {
		axios.get(`https://janaaticsfunctionapp.azurewebsites.net/api/GetTimeSeriesData?code=5rUZrumKciSJ7bfhQjR38Qxkk7nUhTNR63phSsDHQOyRCisQ3CeuBA==&deviceid=EWON_FLEXY103&startTime=1640154346&endTime=1640154396`)
			.then(res => {
				this.setState({ val: res.data });
			})
			.then(v => {
				var t = []
				// eslint-disable-next-line
				this.state.val && this.state.val.length > 0 && this.state.val.map((v) => {
					var parsed = [v.data.slice(0, 1), '"', v.data.slice(1)].join('');
					t.push(JSON.parse(parsed))
				})

				if ((t.pop().Current) && (!t.pop().Current1)) {
					this.setState({
						current: t.pop().Current,
						energy: t.pop().Energy,
						Powerfactor: t.pop().Powerfactor,
						voltage: t.pop().Voltage,
					})
				}
				else if (((t.pop().Current) && (t.pop().Current1)) || (t.pop().Current2)) {
					this.setState({
						current: t.pop().Current,
						energy: t.pop().Energy,
						Powerfactor: t.pop().Powerfactor,
						voltage: t.pop().Voltage,

						current1: t.pop().Current1,
						energy1: t.pop().Energy1,
						Powerfactor1: t.pop().Powerfactor1,
						voltage1: t.pop().Voltage1,
					})

				}
				else {
					this.setState({
						current: t.pop().Current,
						energy: t.pop().Energy,
						Powerfactor: t.pop().Powerfactor,
						voltage: t.pop().Voltage,

						current1: t.pop().Current1,
						energy1: t.pop().Energy1,
						Powerfactor1: t.pop().Powerfactor1,
						voltage1: t.pop().Voltage1,

						current2: t.pop().Current2,
						energy2: t.pop().Energy2,
						Powerfactor2: t.pop().Powerfactor2,
						voltage2: t.pop().Voltage2,
					})

				}

			})
	}

	/**
	* @function
	* all required functions.
	*/
	timeConverter = (UNIX_timestamp) => {
		var a = new Date(UNIX_timestamp * 1000);
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;// + ':' + sec
		return time;
	}

	returnCurrentChart = () => {
		let totaldatas = []
		let time = []
		let phase1 = []
		let phase2 = []
		let phase3 = []
		var series = []

		// eslint-disable-next-line
		this.state.val && this.state.val.length > 0 && this.state.val.map((v) => {
			var parsed = [v.data.slice(0, 1), '"', v.data.slice(1)].join('');
			totaldatas.push(JSON.parse(parsed))
		})

		// eslint-disable-next-line
		totaldatas.map((v => {
			time.push(this.timeConverter(v.Timestamp))
			if (v.Current && !v.Current1) {
				phase1.push(v.Current)
				series = [
					{ name: "Phase 1", data: phase1 }
				]
			}

			// eslint-disable-next-line
			else if (v.Current && v.Current1 || v.Current2) {
				phase1.push(v.Current)
				phase2.push(v.Current1)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 }
				]
			}
			else {
				phase1.push(v.Current)
				phase2.push(v.Current1)
				phase3.push(v.Current2)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 },
					{ name: "Phase 3", data: phase3 }
				]
			}
		}))

		var options = {

			xaxis: {
				type: 'datetime',
				categories: time,
				// min: new Date(new Date().setHours(0, 0, 0, 0)).getTime(), // start date
				// max: new Date(new Date().setHours(24, 0, 0, 0)).getTime(), // end date
				tickAmount: 6, // interval you want
				labels: {
					show: true,
					formatter: function (val, timestamp) {
						return moment(new Date(timestamp)).format("HH:mm:ss"); // formats to hours:minutes
					}
				}
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
				text: "Current(A)",
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
				},
				markers: {
					radius: 3,
				}
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
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
			colors: ['#eb5255', '#FFA500', '#33b2df'],

		};
		return (
			<Chart options={options} series={series} type="line" height={300} />
		)
	}

	returnVoltageChart = () => {
		let totaldatas = []
		let time = []
		var series = []
		let phase1 = []
		let phase2 = []
		let phase3 = []

		// eslint-disable-next-line
		this.state.val && this.state.val.length > 0 && this.state.val.map((v) => {
			var parsed = [v.data.slice(0, 1), '"', v.data.slice(1)].join('');
			totaldatas.push(JSON.parse(parsed))
		})

		// eslint-disable-next-line
		totaldatas.map((v => {
			time.push(this.timeConverter(v.Timestamp))
			if (v.Voltage || !v.Voltage1) {
				phase1.push(v.Voltage)
				series = [
					{ name: "Phase 1", data: phase1 },
				]
			}
			// eslint-disable-next-line
			else if (v.Voltage && v.Voltage1 || v.Voltage2) {
				phase1.push(v.Voltage)
				phase2.push(v.Voltage1)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 }
				]
			}
			else {
				phase1.push(v.Voltage)
				phase2.push(v.Voltage1)
				phase3.push(v.Voltage2)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 },
					{ name: "Phase 3", data: phase3 }
				]
			}
		}))

		var options = {
			// series: [{
			// 	name: "Phase 1",
			// 	data: phase1,
			// }],
			xaxis: {
				type: 'datetime',
				categories: time,
				// min: new Date(new Date().setHours(0, 0, 0, 0)).getTime(), // start date
				// max: new Date(new Date().setHours(24, 0, 0, 0)).getTime(), // end date
				tickAmount: 6, 
				labels: {
					show: true,
					formatter: function (val, timestamp) {
						return moment(new Date(timestamp)).format("HH:mm:ss"); // formats to hours:minutes
					}
				}

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
				text: "Voltage(V)",
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
				theme: "dark"
			},

			fill: {
				opacity: 1
			},
			legend: {
				position: 'bottom',
				showForSingleSeries: true,
				fontWeight: "bold",
				onItemClick: {
					toggleDataSeries: true
				},
				markers: {
					radius: 3,
				},
				labels: {
					show: true,
					formatter: function (val, timestamp) {
						return moment(new Date(timestamp)).format("MM/DD/YYYY"); // formats to hours:minutes
					}
				}
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
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
				zoom: {
					enabled: true,
				}

			},
			colors: ['#eb5255', '#FFA500', '#33b2df'],

		};
		return (
			<Chart options={options} series={series} type="line" height={300} />
		)
	}
	returnEnergyChart = () => {
		let totaldatas = []
		let time = []
		var series = []
		let phase1 = []
		let phase2 = []
		let phase3 = []

		// eslint-disable-next-line
		this.state.val && this.state.val.length > 0 && this.state.val.map((v) => {
			var parsed = [v.data.slice(0, 1), '"', v.data.slice(1)].join('');
			totaldatas.push(JSON.parse(parsed))
		})

		// totaldatas.map((v => {
		// 	time.push(this.timeConverter(v.Timestamp))
		// 	// time.push(v.Timestamp)
		// 	current.push(v.Energy)
		// }))

		// eslint-disable-next-line
		totaldatas.map((v => {
			time.push(this.timeConverter(v.Timestamp))
			if (v.Energy || !v.Energy1) {
				phase1.push(v.Energy)
				series = [
					{ name: "Phase 1", data: phase1 },
				]
			}
			// eslint-disable-next-line
			else if (v.Energy && v.Energy1 || v.Energy2) {
				phase1.push(v.Energy)
				phase2.push(v.Energy1)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 }
				]
			}
			else {
				phase1.push(v.Energy)
				phase2.push(v.Energy1)
				phase3.push(v.Energy2)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 },
					{ name: "Phase 3", data: phase3 }
				]
			}
		}))

		var options = {
			// series: [{
			// 	name: "Phase 1",
			// 	data: current,
			// }],
			xaxis: {
				type: 'datetime',
				categories: time,
				// min: new Date(new Date().setHours(0, 0, 0, 0)).getTime(), // start date
				// max: new Date(new Date().setHours(24, 0, 0, 0)).getTime(), // end date
				tickAmount: 6, // interval you want
				labels: {
					show: true,
					formatter: function (val, timestamp) {
						return moment(new Date(timestamp)).format("HH:mm:ss"); // formats to hours:minutes
					}
				}
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
				text: "Load(L)",
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
				theme: "dark"
			},

			fill: {
				opacity: 1
			},
			legend: {
				position: 'bottom',
				showForSingleSeries: true,
				fontWeight: "bold",
				onItemClick: {
					toggleDataSeries: true
				},
				markers: {
					radius: 3,
				}
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
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
				zoom: {
					enabled: true,
				}

			},
			colors: ['#eb5255', '#FFA500', '#33b2df'],

		};
		return (
			<Chart options={options} series={series} type="line" height={300} />
		)
	}
	returnPowerfactorChart = () => {
		let totaldatas = []
		let time = []
		var series = []
		let phase1 = []
		let phase2 = []
		let phase3 = []


		// eslint-disable-next-line
		this.state.val && this.state.val.length > 0 && this.state.val.map((v) => {
			var parsed = [v.data.slice(0, 1), '"', v.data.slice(1)].join('');
			totaldatas.push(JSON.parse(parsed))
		})
		// totaldatas.map((v => {
		// 	time.push(this.timeConverter(v.Timestamp))
		// 	// time.push(v.Timestamp)
		// 	current.push(v.Powerfactor)
		// }))

		// eslint-disable-next-line
		totaldatas.map((v => {
			time.push(this.timeConverter(v.Timestamp))
			if (v.Powerfactor || !v.Powerfactor1) {
				phase1.push(v.Powerfactor)
				series = [
					{ name: "Phase 1", data: phase1 },
				]
			}
			// eslint-disable-next-line
			else if (v.Powerfactor && v.Powerfactor1 || v.Powerfactor2) {
				phase1.push(v.Powerfactor)
				phase2.push(v.Powerfactor1)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 }
				]
			}
			else {
				phase1.push(v.Powerfactor)
				phase2.push(v.Powerfactor1)
				phase3.push(v.Powerfactor2)
				series = [
					{ name: "Phase 1", data: phase1 },
					{ name: "Phase 2", data: phase2 },
					{ name: "Phase 3", data: phase3 }
				]
			}
		}))

		var options = {
			// series: [{
			// 	name: "Phase 1",
			// 	data: current,
			// }],
			xaxis: {
				type: 'datetime',
				categories: time,
				// min: new Date(new Date().setHours(0, 0, 0, 0)).getTime(), // start date
				// max: new Date(new Date().setHours(24, 0, 0, 0)).getTime(), // end date
				tickAmount: 6, // interval you want
				labels: {
					show: true,
					formatter: function (val, timestamp) {
						return moment(new Date(timestamp)).format("HH:mm:ss"); // formats to hours:minutes
					}
				}
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
				text: "Power factor(PF)",
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
				theme: "dark"
			},

			fill: {
				opacity: 1
			},
			legend: {
				position: 'bottom',
				showForSingleSeries: true,
				fontWeight: "bold",
				onItemClick: {
					toggleDataSeries: true
				},
				markers: {
					radius: 3,
				}
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
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
				zoom: {
					enabled: true,
				}

			},
			colors: ['#eb5255', '#FFA500', '#33b2df'],

		};
		return (
			<Chart options={options} series={series} type="line" height={300} />
		)
	}

	/** rendering Dashboard information. */
	render() {
		const { classes } = this.props;
		return (
			<>
				<div className={classes.device}>
					{/* <Link style={{ textDecoration: 'none', color: 'white' }} to="/1">
						<TiArrowBackOutline size={18} />
					</Link> */}
					<Link style={{ textDecoration: 'none', color: 'white' }} to="/1">
						<p style={{ display: "contents", paddingLeft: '.5rem', fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "15px", color: "#fff" }}><TiArrowBackOutline size={18} />Laser Bar Code Printer</p>
					</Link>
				</div>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={3}>
						<Paper className={classes.carda}>
							<div className={classes.card__actions__total}>
								<div className={classes.card__actions}>
									<div className={classes.rounded}>
										<GiElectric size={25} color="#FFFFFF" />
									</div>
								</div>
								<div className={classes.card__actions1}>
									<div className={classes.topval} style={{ color: "#fff" }}>
										AVG Current(A)
									</div>
									<div className={classes.belowval} style={{ color: "#fff" }}>{this.state.current}</div>
								</div>
							</div>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>

						<Paper className={classes.carda}>
							<div className={classes.card__actions__total}>
								<div className={classes.card__actions}>
									<div className={classes.rounded}>
										<GiElectric size={25} color="#FFFFFF" />
									</div>
								</div>
								<div className={classes.card__actions1}>
									<div className={classes.topval} style={{ color: "#fff" }}>AVG Voltage(A)</div>
									<div className={classes.belowval} style={{ color: "#fff" }}>{this.state.voltage}</div>
								</div>
							</div>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Paper className={classes.carda1} style={{ color: "#fff" }}>
							<span className={classes.rdtitle}>Load</span>

							<Divider style={{ background: "#fff" }} />
							<div className={classes.unorderlist}>
								<p style={{ padding: 6, lineHeight: 1, margin: 0, paddingRight: "8%", fontSize: "14px" }}>Power KW</p>
								<span style={{ padding: 6, lineHeight: 1, margin: 0, color: "#4f77ea", fontSize: "14px", color: "#fff" }}>{this.state.energy}</span>
							</div>
							<div className={classes.unorderlist}>
								<p style={{ padding: 6, lineHeight: 1, margin: 0, paddingRight: "19%", fontSize: "14px" }}>KWh</p>
								<span style={{ padding: 6, lineHeight: 1, margin: 0, color: "#4f77ea", fontSize: "14px", color: "#fff" }}>0.00</span>
							</div>
							<div className={classes.unorderlist}>
								<p style={{ padding: 6, lineHeight: 1, margin: 0, paddingRight: "17%", fontSize: "14px" }}>KVAH</p>
								<span style={{ padding: 6, lineHeight: 1, margin: 0, color: "#4f77ea", fontSize: "14px", color: "#fff" }}>0.00</span>
							</div>

							<div className={classes.unorderlist}>
								<p style={{ padding: 6, lineHeight: 1, margin: 0, marginLeft: -25, fontSize: "14px" }}>Power Factor</p>
								<span style={{ padding: 6, lineHeight: 1, margin: 0, marginRight: -15, color: "#4f77ea", fontSize: "14px", color: "#fff" }}>{this.state.Powerfactor}</span>
							</div>

						</Paper>
					</Grid>


					<Grid item xs={12} sm={6} md={3}>
						<Paper className={classes.carda1} style={{ color: "#fff" }}>
							<div className={classes.rd1title} style={{ fontWeight: "500" }}>
								<span style={{ paddingLeft: "11%", fontWeight: "500" }}>Phase</span>
								<span>Current(A)</span>
								<span>Voltage(V)</span>
							</div>
							<Divider style={{ background: "#fff" }} />
							<div className={classes.unorderlist}>
								<p style={{ padding: 7, margin: 0, marginLeft: 2, lineHeight: 1.5, fontSize: "14px" }}>phase 1</p>
								<p style={{ padding: 7, margin: 0, lineHeight: 1.5, color: "#4f77ea", fontSize: "14px", color: "#fff" }}>{this.state.current}</p>
								<p style={{ padding: 7, margin: 0, lineHeight: 1.5, color: "#4f77ea", fontSize: "14px", color: "#fff" }}>{this.state.voltage}</p>
							</div>
							<div className={classes.unorderlist}>
								<p style={{ padding: 7, margin: 0, lineHeight: 1.5, fontSize: "14px" }}>phase 2</p>
								<p style={{ padding: 7, margin: 0, lineHeight: 1.5, color: "#4f77ea", fontSize: "14px", color: "#fff" }}>0.00</p>
								<p style={{ padding: 7, margin: 0, lineHeight: 1.5, color: "#4f77ea", fontSize: "14px", color: "#fff" }}>00.00</p>
							</div>
							<div className={classes.unorderlist}>
								<p style={{ padding: 7, margin: 0, lineHeight: 1.5, fontSize: "14px" }}>phase 3</p>
								<p style={{ padding: 7, margin: 0, lineHeight: 1.5, color: "#4f77ea", fontSize: "14px", color: "#fff" }}>0.00</p>
								<p style={{ padding: 7, margin: 0, lineHeight: 1.5, color: "#4f77ea", fontSize: "14px", color: "#fff" }}>00.00</p>
							</div>

						</Paper>
					</Grid>

				</Grid>


				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={6}>
						<Card className={classes.charts} style={{ marginTop: "1rem" }}>
							{this.returnCurrentChart()}
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Card className={classes.charts} style={{ marginTop: "1rem" }}>
							{this.returnVoltageChart()}
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Card className={classes.charts}>
							{this.returnEnergyChart()}
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Card className={classes.charts}>
							{this.returnPowerfactorChart()}
						</Card>
					</Grid>
				</Grid>
				<Card>


				</Card>
			</>
		);
	}
}


export default (withStyles(Dashstyles2)(Dashboard2));
