import { createSlice } from "@reduxjs/toolkit"

const todoReducer = createSlice({
  name: "todoReducer",
  initialState: {
    todoList:
      JSON.parse(localStorage.getItem("todoList")) === null
        ? []
        : JSON.parse(localStorage.getItem("todoList")),
    modalOpen: { tag: false, title: false, content: false },
    tags: [],
    allTags:
      JSON.parse(localStorage.getItem("allTags")) === null
        ? []
        : JSON.parse(localStorage.getItem("allTags")),
  },
  reducers: {
    addTodo: (state, action) => {
      //할 일 추가
      state.todoList.push(action.payload)
      localStorage.setItem("todoList", JSON.stringify(state.todoList))

      //태그 정보 저장을 위해 allTags에 태그 추가
      action.payload.tags.forEach((data) => {
        state.allTags.push(data)
      })

      localStorage.setItem("allTags", JSON.stringify(state.allTags))
    },
    deleteTodo: (state, action) => {
      //할 일 삭제
      const list = state.todoList.filter((data) => data.id !== action.payload)
      localStorage.setItem("todoList", JSON.stringify(list))

      //해당 할 일에 등록된 태그를 allTags에서도 삭제
      const deleteList = state.todoList.filter(
        (data) => data.id === action.payload
      )

      //삭제할 태그들
      let deleteTags = deleteList[0].tags
      let allTags = state.allTags

      //삭제할 태그들을 allTags에서 제외함
      deleteTags.forEach((data) => {
        state.allTags.forEach((allData) => {
          if (data.id === allData.id)
            allTags = allTags.filter((e) => e.id !== data.id)
        })
      })

      localStorage.setItem("allTags", JSON.stringify(allTags))

      return {
        ...state,
        todoList: list,
        allTags,
      }
    },
    deleteCompletedTodo: (state, action) => {
      //완료된 할 일 일괄 삭제
      const list = state.todoList.filter((data, idx) => !data.isCompleted)
      localStorage.setItem("todoList", JSON.stringify(list))

      //해당 할 일에 등록된 태그를 allTags에서도 삭제
      const deleteList = state.todoList.filter((data) => data.isCompleted)

      //삭제할 태그들
      let deleteTags = []
      deleteList.forEach((data) => {
        data.tags.forEach((e) => {
          deleteTags.push(e)
        })
      })

      let allTags = state.allTags

      //삭제할 태그들을 allTags에서 제외함
      deleteTags.forEach((data) => {
        state.allTags.forEach((allData) => {
          if (data.id === allData.id)
            allTags = allTags.filter((e) => e.id !== data.id)
        })
      })

      localStorage.setItem("allTags", JSON.stringify(allTags))

      return {
        ...state,
        todoList: list,
      }
    },
    editTodo: (state, action) => {
      const list = action.payload
      state.todoList.forEach((data) => {
        if (data.id === action.payload.id) {
          data.title = list.title
          data.content = list.content
          data.deadline = list.deadline
          data.date = list.date
          data.editDate = list.editDate
          data.isCompleted = list.isCompleted
          data.id = list.id
          data.tags = list.tags
        }
      })
      localStorage.setItem("todoList", JSON.stringify(state.todoList))

      //태그가 바뀌었으면 allTags 변경
      let allTags = []
      state.todoList.forEach((data) => {
        data.tags.forEach((e) => {
          allTags.push(e)
        })
      })
      state.allTags = [...allTags]
      localStorage.setItem("allTags", JSON.stringify(state.allTags))
    },
    changeCheck: (state, action) => {
      //완료했는지 여부 체크
      state.todoList.forEach((data, idx) => {
        if (data.id === action.payload.id) {
          data.isCompleted = action.payload.isTrue
          data.completedTime = action.payload.completedTime
        }
      })

      localStorage.setItem("todoList", JSON.stringify(state.todoList))
    },
    changeModal: (state, action) => {
      //모달창 open 여부 관리
      const type = action.payload.type
      //state.modalOpen = action.payload.state
      let data = { ...state.modalOpen, [type]: action.payload.state }
      return { ...state, modalOpen: data }
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
  editTodo,
  changeCheck,
  changeModal,
  addTag,
  deleteTag,
  clearTags,
} = todoReducer.actions
export default todoReducer
