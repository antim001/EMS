import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
<Route path='/' element ={<Navigate to='/admin-dashboard'/>}></Route>
<Route path='/login' element ={<Navigate to='/login'/>}></Route>



    </Routes>
    </BrowserRouter>
  )
}

export default App
