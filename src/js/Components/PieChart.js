import { useEffect, useState, useCallback } from "react"
import GenericChart from "../echarts/GenericChart"

function PieChart(props){
    const [data, setData] = useState([])

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
                        }
                    }
                ],
                qSuppressZero: false,
                qSuppressMissing: false,
                qInterColumnSortOrder: [],
            })

            const matrix = reply.layout.qHyperCube.qDataPages[0].qMatrix

            let data = matrix.map((row)=>{
                return {name: row[0].qText, value: row[1].qNum}
            })

            setData(data)
        }
        
        getData()
    })


    const getOption = () => {
        let option = {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: '5%',
              left: 'center'
            },
            series: [
              {
                name: props.title,
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                  }
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

    return(
        <GenericChart
            option = {getOption()}
        ></GenericChart>
    )
}

export default PieChart