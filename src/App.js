import './App.css';
import appPromise from './Qlik/QlikConnection'
import Home from './Pages/Home'
import { useEffect, useState } from 'react';

function App() {
  const [app, setApp] = useState(undefined)

  useEffect(()=>{
    appPromise.then((app)=>{
      setApp(app)
    })
  }, [app])

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
