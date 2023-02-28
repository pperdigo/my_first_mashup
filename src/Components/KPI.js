import { useEffect, useState } from "react"
import '../Styles/KPI.css'
import dollarIcon from '../img/material-symbols_attach-money.svg'
import lineIcon from '../img/tabler_chart-infographic.svg'
import targetIcon from '../img/octicon_goal-24.svg'

function KPI(props){
    const [data, setData] = useState([])
    
    useEffect(()=>{
        const getData = async() => {
            let reply = await props.app.createCube({
                qInitialDataFetch: [
                    {
                        qHeight: 1,
                        qWidth: 1
                    }
                ],
                qDimensions: [],
                qMeasures: [
                    {
                        qDef:{
                            qDef: getDefs().measure
                        }
                    }
                ],
                qSuppressZero: false,
                qSuppressMissing: false,
                qInterColumnSortOrder: [],
            })
    
            console.log('KPI', props.title, reply)

            const data = reply.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qNum
            setData(data)
        }

        getData()
    },[])
    
    const getDefs = () => {
        const defs = {
            'Margin %':{
                measure: 'Sum([Sales Margin Amount])/Sum([Sales Amount])',
                icon: dollarIcon
            },
            'TY vs LY Sales':{
                measure: '(sum([YTD Sales Amount])-sum([LY YTD Sales Amount])*0.2)/sum([LY YTD Sales Amount])',
                icon: lineIcon
            },
            'Sales vs Budget %':{
                measure: 'Sum ([Budget Amount])/Sum ([Actual Amount])',
                icon: targetIcon
            },
        }

        return defs[props.title]
    }

    return(
        <div className = 'kpi-fundo'>
            <div className="kpi-title">
                <img src={getDefs().icon}/>
            </div>
            {data.toLocaleString('pt-BR', {style: 'percent', maximumFractionDigits: 2})}
        </div>
    )

}

export default KPI;