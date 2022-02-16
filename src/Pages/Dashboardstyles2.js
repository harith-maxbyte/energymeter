const Dashboardstyles2 = theme => ({
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
    backimage: {
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
        marginBottom:"2rem"
    },
    carda: {
        padding: '34px',
        // boxShadow: '0 2px 5px 0 rgba(0, 0, 0, .13)',
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        // height: '7rem',
        // width: '200px',
        background: "#223357",// 
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
        // padding: '24px',
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        background: "#223357",
        fontWeight: "500",
        fontFamily: "Nunito, sans-serif",
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

        fontWeight: "600",
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
export default Dashboardstyles2;