import { useEffect, useState } from 'react';
import '../../Styles/FilterBar.css'
/* import QlikObject from './QlikObject'; */
import filterIcon from '../../img/material-symbols_filter-alt.svg'

import '../../Styles/NavBar.css'

function FilterBar(props) {
    const [open, setOpen] = useState(false);


    
    

    useEffect(() =>{
        window.app = props.app;
        
    },[props]);

/*      clearAll(){
        props.app.clearAll();
     } */

    
        return (<div className="custom-font">

            <div className="sidebar-btn" onClick={() => {setOpen(!open)}}><img src={filterIcon} alt=""></img></div>

            <div className={open === true ? 'right-sidebar active' : 'right-sidebar'}>
                <div className="top-sidebar">
                    <span>Current selections</span>
                    <div className="sidebar-btn" onClick={() => {setOpen(!open)}}><img src={filterIcon} alt=""></img>

</div>
                </div>
                <div className="sidebar-conent">
{/*                     <CurrentSelections_People app={props.app}></CurrentSelections_People>
                    <div onClick={clearAll.bind(this)} className="clear-btn">Clear filters</div> */}
                    <div className="filters">
                      QlikObject
{/*                         <QlikObject app={props.app} qlikId={'eSheame'} objectId={'filter-2'}></QlikObject>
                        <QlikObject app={props.app} qlikId={'dEzPRD'} objectId={'filter-3'}></QlikObject>
                        <QlikObject app={props.app} qlikId={'rpWqb'} objectId={'filter-4'}></QlikObject>
                        <QlikObject app={props.app} qlikId={'EaZg'} objectId={'filter-5'}></QlikObject>
                        <QlikObject app={props.app} qlikId={'FbxPfcu'} objectId={'filter-6'}></QlikObject>
                        <QlikObject app={props.app} qlikId={'zjnduXK'} objectId={'filter-7'}></QlikObject> */}
                    </div>
                    
                </div>
            </div>

            <div 
            onClick={() => {setOpen(!open)}} 
            className={open === true ? 'close-right-sidebar active' : 'close-right-sidebar'}>

            </div>

        </div>);
    


}

export default FilterBar