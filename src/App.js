import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main, Detail, AddTodo, EditTodo } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main type="main" />} />
        <Route path="/detail/:id" element={<Detail type="detail" />} />
        <Route path="/add" element={<AddTodo type="add" />} />
        <Route path="/edit/:id" element={<EditTodo type="edit" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
