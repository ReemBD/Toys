import { NavLink, withRouter } from "react-router-dom";
import { connect } from 'react-redux'

export function _AppHeader({ isShowModal, modalTxt,loggedinUser }) {

    return <nav className="header-container flex">
        <div className={`modal ${isShowModal && 'active'}`}><h1>{modalTxt}</h1></div>
        <ul className="main-nav">
            <div className="logo">Toy<span className="s">s</span></div>
            <li> <NavLink exact to='/'><i className="fas fa-home"></i> Home</NavLink></li>
            <li><NavLink to="/about"><i className="fas fa-address-card"></i> About</NavLink></li>
            <li><NavLink to="/profile"><i className="fas fa-user"></i> Profile</NavLink></li>
            <li><NavLink to="/dashboard"><i className="fas fa-chart-area"></i> Dashboard</NavLink></li>
            <li><NavLink to="/login"><i className="fas fa-sign-in-alt"></i> {loggedinUser ? 'Logout' : 'Login'}</NavLink></li>
        </ul>
    </nav>
}

const mapGlobalStateToProps = (state) => {
    const { toys } = state.toy
    const { isShowModal, modalTxt } = state.modal
    const { loggedinUser } = state.user
    return {
        toys,
        isShowModal,
        modalTxt,
        loggedinUser
    }
}


export const AppHeader = connect(mapGlobalStateToProps)(withRouter(_AppHeader))
