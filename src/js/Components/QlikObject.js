import { useEffect, useRef } from 'react';


function QlikObject(props) {
    const id = useRef("")

    useEffect(() =>{
        props.app.getObject(props.objectId, props.qlikId)
        .then((reply)=>{
            id.current = reply.layout.qInfo.qId
            
        })
        
        return () => {
            props.app.destroySessionObject(id.current)
        } 
         
},[props])
    

    const height = props.height || 50;
    const style = props.style || {height : height};

    return (
        <div className="native-chart" style={style} id={props.objectId}>
            
        </div>
    );
}

export default QlikObject
