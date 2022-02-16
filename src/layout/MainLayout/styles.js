const styles = theme => ({
	topbar: {
		position: 'fixed',
		width: '100%',
		top: 0,
		left: 0,
		right: 'auto',
		zIndex:0,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	drawerPaper: {
		borderRight: 0,
		zIndex: 1200,
	},

	content: {
		minHeight: '80vh',
		padding: theme.spacing(3),
		// paddingTop: theme.spacing(9),//#384480
		background: "linear-gradient(to bottom, #384480 0%, #384480 20%, rgb(227, 235, 235) 20%, rgb(227, 235, 235) 100%)", //rgb(227, 235, 235) # e6ebeb
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	sidebar: {
		position:"absolute",
		zIndex:1
	},
	contentShift: {
		marginLeft: '4rem',
		minHeight: "80vh"
	},
	// [theme.breakpoints.down('sm')]: {
	// 	content: {
	// 		padding: 0,
	// 		paddingTop: theme.spacing(9)
	// 	}
	// }
});
export default styles;