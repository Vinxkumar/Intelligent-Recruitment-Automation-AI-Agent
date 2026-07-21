import './App.css'
import { Route, Routes } from "react-router-dom"
import NavBar from './components/Navbar'
import Opportunities from './pages/Opportunities'
import NewJobForm from './pages/NewJob'
function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <header className="w-full h-16">
        <NavBar />
      </header> 

      <main className="flex-1">
        <Routes>
          <Route path="/" />
          <Route path="/opportunities" element={<Opportunities/>}/>
          <Route path="/new-job" element={<NewJobForm/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
