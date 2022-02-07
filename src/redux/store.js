import { configureStore } from '@reduxjs/toolkit'
import todo from './reducer/todo'

const store = configureStore({ reducer: todo })
export default store
