import KPI from '../Components/KPI'
// import FilterBar from '../Components/FilterBar'
import LineChart from '../Components/LineChart'
import NavBar from '../Components/NavBar'
import PieChart from '../Components/PieChart'
import '../../Styles/Home.css'

require('bootstrap/dist/css/bootstrap.min.css')

function Home(props){
    return(
        <>
            <NavBar />
            <div className = 'container-fluid'>
                <div className = 'row pb-2 pt-2 mx-5'>
                    <div className='col-4'>
                        <KPI
                            app = {props.app}
                            title = {'Margin %'}
                        / >
                    </div>
                    <div className='col-3'>
                        <PieChart
                            app = {props.app}
                            title = {'By Product Subgroup'}
                        / >
                    </div>
                    <div className='col-5'>
                        <LineChart
                            app = {props.app}
                        / >
                    </div>
                </div>
                <div><hr className = 'breakline'></hr></div> {/* linha na tela */}
                <div className = 'row pb-2 pt-2'>
                    <div className='col-4'>
                        <KPI
                            app = {props.app}
                            title = {'TY vs LY Sales'}
                        / >
                    </div>
                    <div className='col-3'>
                        <PieChart
                            app = {props.app}
                            title = {'By State'}
                        / >
                    </div>
                    <div className='col-5'>
                        <LineChart
                            app = {props.app}
                        / >
                    </div>
                </div>
                
                    <div><hr className = 'breakline'></hr></div> {/* linha na tela */}
                <div className = 'row pb-2 pt-2'>
                    <div className='col-4'>
                        <KPI
                            app = {props.app}
                            title = {'Sales vs Budget %'}
                        / >
                    </div>
                    <div className='col-3'>
                        <PieChart
                            app = {props.app}
                            title = {'By Sales Rep'}
                        / >
                    </div>
                    <div className='col-5'>
                        <LineChart
                            app = {props.app}
                        / >
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Home