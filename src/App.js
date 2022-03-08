import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Main, Detail, AddTodo, EditTodo } from "./pages"
import { ThemeProvider } from "styled-components"
import theme from "./theme"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main type="main" />} />
          <Route path="/detail/:id" element={<Detail type="detail" />} />
          <Route path="/add" element={<AddTodo type="add" />} />
          <Route path="/edit/:id" element={<EditTodo type="edit" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
