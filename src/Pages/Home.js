import KPI from '../Components/KPI'
import FilterBar from '../Components/FilterBar'
import LineChart from '../Components/LineChart'
import NavBar from '../Components/NavBar'
import PieChart from '../Components/PieChart'

require('bootstrap/dist/css/bootstrap.min.css')

function Home(props){
    return(
        <div className = 'container-fluid'>
            <div className = 'row'>
                <div className='col-4'>
                    <KPI
                        app = {props.app}
                        title = {'Margin %'}
                    / >
                </div>
                <div className='col-3'>
                    <PieChart
                        app = {props.app}
                    / >
                </div>
                <div className='col-5'>
                    <LineChart
                        app = {props.app}
                    / >
                </div>
            </div>
            <div className = 'row'>
                <KPI
                    app = {props.app}
                    title = {'TY vs LY Sales'}
                / >
                <PieChart
                    app = {props.app}
                / >
                <LineChart
                    app = {props.app}
                / >
            </div>
            <div className = 'row'>
                <KPI
                    app = {props.app}
                    title = {'Sales vs Budget %'}
                / >
                <PieChart
                    app = {props.app}
                / >
                <LineChart
                    app = {props.app}
                / >
            </div>
        </div>
    )
}

export default Home