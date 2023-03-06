import './App.css';
import appPromise from './js/Qlik/QlikConnection'
import Home from './js/Pages/Home'
import { useEffect, useState } from 'react';

function App() {
  const [app, setApp] = useState(undefined)

  useEffect(()=>{
    appPromise.then((app)=>{
      setApp(app)
    })
  }, [])

  if(!app) return 'Carregando'

  return (
    <div className="App">
      <Home
        app = {app}>
      </Home>
    </div>
  );
}

export default App;
