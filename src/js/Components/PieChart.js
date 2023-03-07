import { useEffect, useState, useCallback, useRef } from "react"
import GenericChart from "../echarts/GenericChart"

function PieChart(props){
    const [data, setData] = useState(undefined)
    const id = useRef('')

    const getDefs = useCallback(() => {
        const defs = {
            'By Product Subgroup':{
                dimension: 'Product Group Desc',
                measure: 'Sum([Sales Margin Amount])'
            },
            'By State':{
                dimension: 'state_name',
                measure: 'Sum ([Sales Amount])'
            },
            'By Sales Rep':{
                dimension: 'Sales Rep Name',
                measure: 'Sum ([Budget Amount])'
            },
        }

        return defs[props.title]
    }, [props.title])

    //Busca de dados inicial
    useEffect(()=>{
        const getData = async () => {
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
                            qFieldDefs: [getDefs().dimension]
                        }
                    }
                ],
                qMeasures: [
                    {
                        
                        qDef:{
                            qDef: getDefs().measure
                        },
                        qSortBy:{
                            qSortByNumeric: -1
                        },
                    }
                ],
                qSuppressZero: 0,
                qSuppressMissing: 0,
                qInterColumnSortOrder: [1,0]
            })
            const matrix = reply.layout.qHyperCube.qDataPages[0].qMatrix
            
            let data = matrix.map((row)=>{
                return {name: row[0].qText, value: row[1].qNum}
            })
            id.current = reply.id
            return data
        }

        const transformData = async(data) => {
            const others = {name: 'Others', value: 0}
            let dataFiltered = []

            //Vamos manter apenas os valores acima de 30º (1/12 do total). O resto será agregado em others
            const totalValue = data.reduce((acum, curr) => acum + curr.value, 0)
            const treshold = props.minAngle / 360 * totalValue

            data.forEach((row) => {
                if(row.value < treshold){
                    others.value += row.value
                } else{
                    dataFiltered.push(row)
                }
            });
            dataFiltered.push(others)
            setData(dataFiltered)
            return id
        }
        
        getData().then(extractedData => {
            transformData(extractedData)
        })

        return ()=> {
            props.app.destroySessionObject(id.current)
        }
        
        
    }, [props.app, getDefs, props.minAngle])


    const getOption = () => {
        let option = {
            tooltip: {
              trigger: 'item'
            },
            color: [
                "#3b49ee",
                "#89f2f2",
                "#4191e1",
                "#2d669d",
                "#a4d2ff"
            ],
            series: [
              {
                name: props.title,
                type: 'pie',
                radius: ['25%', '65%'],
                itemStyle: {
                    borderColor: 'rgba(0,9,118,1)',
                    borderWidth: 8
                  },
                avoidLabelOverlap: false,
                label: {
                  show: true,
                  position: 'outside',
                  color: 'white'
                },
                labelLine: {
                  show: false
                },
                data: data
                
              }
            ]
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

export default PieChart