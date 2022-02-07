import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main, Detail, AddTodo } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/add" element={<AddTodo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
