 import { useEffect, useState, useRef } from 'react';
 import closeIcon from '../../img/close.svg'

function CurrentSelections(props){
   const [selections, setSelections] = useState([])
   const id = useRef("")

  useEffect(()=>{

    function getSelections(){
        props.app.getList("CurrentSelections", (reply)=>{
  
            const selections = reply.qSelectionObject.qSelections;
  
            let currentSelections = [];
  
            selections.forEach(element => {
                currentSelections.push({
                    field: element.qField,
                    values: element.qSelected
                })
            });
            
            id.current = reply.qInfo.qId
            setSelections(currentSelections)
            return () => {
                props.app.destroySessionObject(id.current)
            } 
            
        })
  
    }

    getSelections();

    
  },[props.app])

  

  function clearField(field){
      props.app.field(field).clear();
  }

  
      let content = <div> No filters applied</div>;

      if(selections.length > 0){
          content = selections.map(item => {
              return <div className="selected-block">
                          <div className="current-information">
                              <div className="current-title-div">{item.field}</div>
                              <div className="filters-items">
                                  <div>
                                      {item.values}
                                  </div>
                                  <button onClick={()=>{clearField(item.field)}} className="x-clear-btn"><img src={closeIcon} alt="" width="10px"/></button>
                              </div>
                          </div>
                      </div>
          })
      }

      return (
      <div className="current-selections custom-font">
          {content}
      </div>); 
  }

export default CurrentSelections


