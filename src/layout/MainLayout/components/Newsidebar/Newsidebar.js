
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router';
import "./style.css";
function Newsidebar() {
    const history = useHistory();

    const handleSignOut = () => {
        localStorage.removeItem("auth-token")
        history.push("/")
    }
    return (
        <>
            <div className="sidebar">
                <div className="logo-details">
                    {/* <i className='bx bxl-c-plus-plus icon'></i> */}
                    {/* <div className="logo_name">Energy App</div> */}
                    {/* <i className='bx bx-menu' id="btn" ></i> */}
                    {/* <img src={Logo} alt="profileImg" /> */}
                </div>
                <ul className="nav-list">
                    <li>
                        <a href="https://maxbyte.co/">
                            <i className='bx bx-grid-alt'></i>
                            <span className="links_name">Home</span>
                        </a>
                        <span className="tooltip">Home</span>
                    </li>
                    <li>
                        <a href="https://maxbyte.co/">
                            <i className='bx bx-user' ></i>
                            <span className="links_name">Production</span>
                        </a>
                        <span className="tooltip">Production</span>
                    </li>
                    <li>
                        <a href="https://maxbyte.co/">
                            <i className='bx bx-chat' ></i>
                            <span className="links_name">Maintenance</span>
                        </a>
                        <span className="tooltip">Maintenance</span>
                    </li>
                    <li>
                        <a href="https://maxbyte.co/">
                            <i className='bx bx-pie-chart-alt-2' ></i>
                            <span className="links_name">Reports</span>
                        </a>
                        <span className="tooltip">Reports</span>
                    </li>
                    <li>
                        <a href="https://maxbyte.co/">
                            <i className='bx bx-folder' ></i>
                            <span className="links_name">Energy</span>
                        </a>
                        <span className="tooltip">Energy</span>
                    </li>

                  
                    <li className="profile">
                        <button onClick={() => handleSignOut()} style={{ cursor: "pointer" }}><i className='bx bx-log-out' id="log_out" ></i></button>
                    </li>
                </ul>
            </div>
        </>
    )
}


export default withRouter(Newsidebar);