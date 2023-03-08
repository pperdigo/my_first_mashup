import KPI from '../Components/KPI'
// import FilterBar from '../Components/FilterBar'
import LineChart from '../Components/LineChart'
import NavBar from '../Components/NavBar'
import PieChart from '../Components/PieChart'
import '../../Styles/Home.css'

function Home(props){
    const heightRow = "300px"

    return(
        <>
            <NavBar />
            <div className = 'container-fluid'>
                <div className = 'row pb-2 pt-2' style={{height:`${heightRow}`}}>
                    <div className='col-4 pt-5'>
                        <KPI
                            app = {props.app}
                            title = {'Margin %'}
                        / >
                    </div>
                    <div className='col-4 pt-2'>
                        <PieChart
                            app = {props.app}
                            title = {'By Product Subgroup'}
                            minAngle = {30}
                        / >
                    </div>
                    <div className='col-4'>
                        <LineChart
                            app = {props.app}
                            title = {'Margin Amount Over Time'}
                        / >
                    </div>
                </div>
                <div><hr className = 'breakline'></hr></div>
                <div className = 'row pb-2 pt-2' style={{height:`${heightRow}`}}>
                    <div className='col-4 pt-5'>
                        <KPI
                            app = {props.app}
                            title = {'TY vs LY Sales'}
                        / >
                    </div>
                    <div className='col-4 pt-2'>
                        <PieChart
                            app = {props.app}
                            title = {'By State'}                                                      
                            minAngle = {30}
                        / >
                    </div>
                    <div className='col-4'>
                        <LineChart
                            app = {props.app}
                            title = {'Sales Over Time'}
                        / >
                    </div>
                </div>
                
                    <div><hr className = 'breakline'></hr></div>
                <div className = 'row pb-2 pt-2' style={{height:`${heightRow}`}}>
                    <div className='col-4 pt-5'>
                        <KPI
                            app = {props.app}
                            title = {'Sales vs Budget %'}
                        / >
                    </div>
                    <div className='col-4 pt-2'>
                        <PieChart
                            app = {props.app}
                            title = {'By Sales Rep'}
                            minAngle = {15}
                        / >
                    </div>
                    <div className='col-4'>
                        <LineChart
                            app = {props.app}
                            title = {'Budget Over Time'}
                        / >
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Home