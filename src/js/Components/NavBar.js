import menuIcon from '../../img/material-symbols_menu.svg'
import filterIcon from '../../img/material-symbols_filter-alt.svg'
import logoIcon from '../../img/logo.svg'
import '../../Styles/NavBar.css'

function NavBar(){
    return(
        <div className='nav-bar'>
            <div className='left-nav-bar'>
                <img alt='' className='menu-icon' src= {menuIcon} />
                <span className='page-title'>KPI DASHBOARD</span>
            </div>
            <img alt='' className='logo-nav-bar' src= {logoIcon} />
            <img alt='' className='filter-nav-bar' src= {filterIcon} />
        </div>
    )
}

export default NavBar