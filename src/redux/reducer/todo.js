import { createSlice } from '@reduxjs/toolkit'

const todoReducer = createSlice({
  name: 'todoReducer',
  initialState: {
    todoList:
      JSON.parse(localStorage.getItem('todoList')) === null
        ? []
        : JSON.parse(localStorage.getItem('todoList')),
    completedList:
      JSON.parse(localStorage.getItem('completedList')) === null
        ? []
        : JSON.parse(localStorage.getItem('completedList')),
    modalOpen: false,
    tags: [],
  },
  reducers: {
    addTodo: (state, action) => {
      //할 일 추가
      state.todoList.push(action.payload)
      localStorage.setItem('todoList', JSON.stringify(state.todoList))
    },
    deleteTodo: (state, action) => {
      //할 일 삭제
      const list = state.todoList.filter((data) => data.id !== action.payload)
      localStorage.setItem('todoList', JSON.stringify(list))

      //완료된 할 일 리스트에도 삭제 적용
      let completedList = state.completedList
      completedList = state.completedList.filter(
        (data) => data.id !== action.payload,
      )
      localStorage.setItem('completedList', JSON.stringify(completedList))

      return {
        ...state,
        todoList: list,
        completedList,
      }
    },
    deleteCompletedTodo: (state, action) => {
      //완료된 할 일 일괄 삭제
      const list = state.todoList.filter((data, idx) => !data.isCompleted)
      localStorage.setItem('todoList', JSON.stringify(list))
      return {
        ...state,
        todoList: list,
      }
    },
    filterOnlyCompleted: (state, action) => {
      //완료된 할 일만 필터링
      const list = state.todoList.filter((data, idx) => data.isCompleted)
      localStorage.setItem('completedList', JSON.stringify(list))
      return {
        ...state,
        completedList: list,
      }
    },
    changeCheck: (state, action) => {
      //완료했는지 여부 체크
      state.todoList.forEach((data, idx) => {
        if (data.id === action.payload.id)
          data.isCompleted = action.payload.isTrue
      })

      //완료된 할 일 리스트에도 적용
      state.completedList.forEach((data, idx) => {
        if (data.id === action.payload.id)
          data.isCompleted = action.payload.isTrue
      })

      localStorage.setItem('todoList', JSON.stringify(state.todoList))
      localStorage.setItem('completedList', JSON.stringify(state.completedList))
    },
    changeModal: (state, action) => {
      //모달창 open 여부 관리
      state.modalOpen = action.payload
    },
    addTag: (state, action) => {
      //태그 추가
      state.tags.push(action.payload)
    },
    deleteTag: (state, action) => {
      //태그 제거
      return {
        ...state,
        tags: state.tags.filter((data, idx) => data.id !== action.payload),
      }
    },
    clearTags: (state, action) => {
      //태그 초기화
      return { ...state, tags: [] }
    },
  },
})

export const {
  addTodo,
  deleteTodo,
  deleteCompletedTodo,
  filterOnlyCompleted,
  changeCheck,
  changeModal,
  addTag,
  deleteTag,
  clearTags,
} = todoReducer.actions
export default todoReducer
