import * as echarts from 'echarts'
import { useEffect, useState } from 'react'

const GenericChart = (props) => {
    const id = "id_" + new Date().getTime() + (Math.random() * 100).toFixed(0)
    const style = props.style || {backgroundColor:'transparent', flex: '1', width:'100%', height: 'calc(50vh - 60px)'};
    const [chart, setChart] = useState(undefined)

    //Listener para fazer o resize
    useEffect(()=>{
        const updateDimensions = () => {
            this.state.myChart.resize();
        }

        window.addEventListener("resize", updateDimensions);
        return ()=>{
            window.removeEventListener("resize", updateDimensions);
        }
    }, [])

    //Inicialização do gráfico
    useEffect(()=>{
        const renderChart = () => {
            const element = document.getElementById(id)
            if(element){
                const myChart = echarts.init(element)
                myChart.setOption(props.option)
                setChart(myChart)
                myChart.resize()
            }
        }
        renderChart()

        // return(()=>{
        //     if (chart) chart.dispose()
        // })
    }, [chart, id, props.option])

    //Atualização do gráfico
    useEffect(()=>{
        const updateChart = () => {
            if(chart){
                const notMerge = typeof props.notMerge === 'undefined' ? true : props.notMerge
                chart.setOption(props.option, {notMerge: notMerge })
            }
        }
        updateChart()
    },[chart, props.notMerge, props.option])

    //Função de filtro personalizada
    useEffect(()=>{
        if(chart){
            if(props.customOnClickFilterFunction){
                chart.on('click', props.customOnClickFilterFunction)
            }
            else{
                chart.on('click', (params) => {
                    if(props.app){
                        props.app.field(params.seriesName).selectMatch(params.name)
                    }
                })	
            }
        }


        return ()=>{
            if(chart) chart.off('click')
        }
    }, [chart, props.app, props.customOnClickFilterFunction])

    return(<div id={id} style={style}></div>)
}

export default GenericChart