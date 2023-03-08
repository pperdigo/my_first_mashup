import { useState, useEffect, useCallback, useRef } from "react"
import GenericChart from "../echarts/GenericChart"

function LineChart(props){
    const [data, setData] = useState(undefined)
    const id = useRef('')

    const getDefs = useCallback(() => {
        const defs = {
            'Margin Amount Over Time':{
                dimension: 'Month',
                measure: 'Sum([Sales Margin Amount])'
            },
            'Sales Over Time':{
                dimension: 'Month',
                measure: 'Sum ([Sales Amount])'
            },
            'Budget Over Time':{
                dimension: 'Month',
                measure: 'Sum ([Budget Amount])'
            },
        }

        return defs[props.title]
    }, [props.title])

    useEffect(()=>{
        const getData = async () =>{
            const reply = await props.app.createCube({
                qInitialDataFetch: [
                    {
                        qHeight: 5000,
                        qWidth: 2
                    }
                ],
                qDimensions: [
                    {
                        qDef:{
                            qFieldDefs: [getDefs().dimension],
                            qSortCriterias: [
                                {
                                  qSortByNumeric: 1,
                                }
                              ]
                        },
                    }
                ],
                qMeasures: [
                    {
                        
                        qDef:{
                            qDef: getDefs().measure
                        },
                    }
                ],
                qSuppressZero: 0,
                qSuppressMissing: 0,
                qInterColumnSortOrder: [0,1]
            })

            console.log(reply.layout.qHyperCube.qDataPages[0].qMatrix)

            const matrix = reply.layout.qHyperCube.qDataPages[0].qMatrix
            
            const data = []
            const axisData = []

            matrix.forEach((row) => {
                axisData.push(row[0].qText)
                data.push(row[1].qNum)
            })

            console.log(axisData, data)

            id.current = reply.id
            setData({axisData: axisData, data: data})
        }

        getData()

        return ()=> {
            props.app.destroySessionObject(id.current)
        }

    }, [props.app, getDefs])

    const getOption = () => {
        let option = {
            title:{
                text: props.title,
                textStyle:{
                    color: 'white',
                    fontWeight: 'normal'
                }
            },
            xAxis: {
                type: 'category',
                data: data.axisData,
                axisLabel:{
                    color: 'white'
                }
            },
            yAxis: {
                type: 'value',
                axisLabel:{
                    color: 'white',
                    formatter: (params) => (params / 1000000).toLocaleString('pt-BR', {maximumFractionDigits: 1})  + ' M'
                },
                scale: true
                // min: (value) => value.min * 0.9,
                // max: (value) => value.max * 1.1,
            },
            series: [
                {
                    data: data.data,
                    type: 'line',
                    lineStyle:{
                        color: '#89F2F2'
                    },
                    itemStyle:{
                        opacity: 0
                    }
                }
            ],
            grid:{
                left: '15%'
            }
        };
          return option
    }

    if(data){
        return(
            <GenericChart
                app = {props.app}
                option = {getOption()}
                title = {props.title}            
            ></GenericChart>
        )
    }
    else {
        return <div style = {{color: 'white'}}>Carregando</div>
    }
}

export default LineChart