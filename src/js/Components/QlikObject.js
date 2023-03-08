import { useEffect } from 'react';



function QlikObject(props) {

    useEffect(() =>
        props.app.getObject(props.objectId, props.qlikId)
    ,[props])
    

    var height = props.height || 50;
    var style = props.style || {height : height};

    return (
        <div className="native-chart" style={style} id={props.objectId}>
            
        </div>
    );
}

export default QlikObject
