import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import MainPageComponent from './components/pages/MainPageComponent'
import UsersPageComponent from './components/pages/UsersPageComponent'
import HeaderComponent from './components/static/HeaderComponent'
import PollsPageComponent from './components/pages/PollsPageComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <HeaderComponent/>
            <Routes>
              <Route path='/' element = {<MainPageComponent />}/>
              <Route path='/users' element={<UsersPageComponent />} />
              <Route path='/polls' element = {<PollsPageComponent />}/>
              {/* <Route /> */}
            </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
