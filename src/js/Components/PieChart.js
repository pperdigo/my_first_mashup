import { useEffect, useState, useCallback } from "react"
import GenericChart from "../echarts/GenericChart"

function PieChart(props){
    const [data, setData] = useState(undefined)

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

            return data
        }

        //Vamos transformar os dados para manter apenas as 10 maiores entradas e agregar o restante em "outros" 
        const transformData = async(data) => {
            let others = {name: 'Others', value: 0}
            let top10 = []
            data.forEach((row, index) => {
                if(index < 10){
                    top10.push(row)
                } else{
                    others.value += row.value
                }
            });
            top10.push(others)
            setData(top10)
        }
        
        getData().then(extractedData => {
            transformData(extractedData)
        })
    }, [props.app, getDefs])


    const getOption = () => {
        let option = {
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                name: props.title,
                type: 'pie',
                radius: ['20%', '35%'],
                avoidLabelOverlap: false,
                label: {
                  show: true,
                  position: 'outside',
                  color: 'white'
                },
                labelLine: {
                  show: true
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