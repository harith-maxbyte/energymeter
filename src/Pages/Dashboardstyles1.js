
const Dashboardstyles1 = theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0rem',
        },
        '*::-webkit-scrollbar-track': {
            background: 'rgb(227, 235, 235)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#223357',
            borderRadius: "8px",
            backgroundClip: "padding-box",
        }
    },
    myClassName: {
		backgroundColor: "#384480",
		position: "relative",
		"&:hover": {
			backgroundColor: "rgb(25, 26, 24)"
		}
	},
    userimage: {
        backgroundColor: "transparent",
        borderRadius: '50%',
        padding: 2,
        border: "1px solid #cccccc",
        boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px',
    },
    rounded: {
        backgroundColor: 'rgb(19, 81, 82)',
        borderRadius: '50%',
        padding: '15px',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px',
    },
    device: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

    },
    [theme.breakpoints.down('sm')]: {
        device: {
            display: "none"
        },
    },
    [theme.breakpoints.between('sm', 'lg')]: {
        device: {
            display: "none"
        },
        dashboardbtn: {
            display: "none"
        },
        // carda:{
        //     width: "5rem",
        // }
    },
    dashboardbtn: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: ".5rem"
    },
    first: {
        display: "inline-block",
        margin: "0 2rem"
    },
    firstinnertxt: {
        textAlign: "center",
        display: "inline-block",
        padding: "0 2rem"
    },
    [theme.breakpoints.down('lg')]: {
        firstinnertxt: {
            textAlign: "center",
            display: "inline-block",
            padding: "0 2rem",
            marginTop: "-50%"
        },
    },
    second: {
        display: "inline-block",
        margin: ".5rem 2rem"
    },
    stickyColumn: {
        position: "-webkit-sticky;", /* Safari */
        position: "sticky",
        top: 0,
    },
    container: {
        border: "1px solid #eeccee",
        maxHeight: "300px",
        overflowY: "scroll",
        width: "100%",
    },
    carda: {
        padding: '20px',
        width: "fit-content",
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
        color: "#fff",
        fontWeight: "500",
        fontSize: "17px",
        marginBottom: "1rem",
        backgroundColor: "#223357"
    },
    card__actions__total: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    card__actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '16px',
    },
    card__actions1: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    topval: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "rgb(33, 33, 33)",
        fontFamily: "Nunito, sans-serif",
        lineHeight: 2
    },
    belowval: {
        fontSize: "x-large",
        fontWeight: "bold",
        fontFamily: "Nunito, sans-serif",
        color: "#4f77ea",
    },
    carda1: {
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
    },
    rdtitle: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "10px 24px",
        fontWeight: "bold",
        fontFamily: "Nunito, sans-serif",
    },
    unorderlist: {
        display: 'flex',
        justifyContent: 'space-evenly',

        fontWeight: "bold",
        fontFamily: "Nunito, sans-serif",
    },
    rd1title: {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "10px",
        marginRight: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        fontWeight: "bold",
        fontFamily: "Nunito, sans-serif",
    },
    charts: {
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
    }

});
export default Dashboardstyles1;