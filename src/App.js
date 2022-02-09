import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main, Detail, AddTodo, EditTodo } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/add" element={<AddTodo />} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
