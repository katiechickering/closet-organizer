import {Routes, Route} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { useState } from 'react'
import './App.css'
import "react-toastify/dist/ReactToastify.css"
import { Header } from "./components/Header"
import { LoginForm } from "./components/LoginForm"
import { Home } from "./components/Home"
import { ClothingItemForm } from "./components/ClothingItemForm"
import { ViewClothingItem } from "./components/ViewClothingItem"
import { RegistrationForm } from "./components/RegistrationForm"

function App() {

  const [headerInfo, setHeaderInfo] = useState({})

  return (
    <>
      <Header headerInfo={headerInfo} />
      <Routes>
        <Route path='/register' element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
        <Route path="clothingItem/add" element={<ClothingItemForm />} />
        <Route path="clothingItem/details/:id" element={<ViewClothingItem setHeaderInfo={setHeaderInfo}/>} />
        <Route path="clothingItem/update/:id" element={<ClothingItemForm setHeaderInfo={setHeaderInfo}/>} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
