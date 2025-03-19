import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Categories from "./pages/Categories"
import Playlists from "./pages/Playlists"

function App() {
  return (
    <>
      <Routes>
        <Route path="/categories/:id" element={<Playlists/>}/>
        <Route path="/categories" element={<Categories />}/>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
