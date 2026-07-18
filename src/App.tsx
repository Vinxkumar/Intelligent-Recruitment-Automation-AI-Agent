import './App.css'
import { Route, Routes } from "react-router-dom"
import NavBar from './components/Navbar'
import Home from './pages/Home'
import NewJobForm from './pages/NewJob'
function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <header className="w-full h-16">
        <NavBar />
      </header> 

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-job" element={<NewJobForm/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
