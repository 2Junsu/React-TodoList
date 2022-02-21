import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Todo } from "../components"
import { Header, Button } from "../elements"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteCompletedTodo } from "../redux/reducer/todo"
import $ from "jquery"

const Main = (props) => {
  const type = props.type
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const todoList = useSelector((state) => state.reducer.todoList)
  const [showTodoList, setShowTodoList] = useState(todoList) //필터링에 따라 화면에 보여질 실제 투두리스트
  const [showType, setShowType] = useState("all")
  const allTags = useSelector((state) => state.reducer.allTags)
  const allTagsName = allTags.map((data) => data.name) //전체 태그의 이름만을 저장할 배열
  const set = new Set(allTagsName) //태그명 중복을 없애기 위해 배열을 set 객체로 변환
  const filterTags = [...set].sort() //set 객체를 다시 배열로 변환

  const onClick = () => {
    navigate("/add")
  }

  const deleteCompleted = () => {
    //완료한 일이 존재하면 일괄 삭제
    let cnt = 0
    todoList.forEach((data) => {
      if (data.isCompleted) cnt += 1
    })

    if (cnt !== 0)
      if (window.confirm("정말 삭제하시겠습니까?")) {
        dispatch(deleteCompletedTodo())
        alert("삭제되었습니다.")
        window.location.reload()
      }
  }

  const onOptionSelected = (e) => {
    //필터값이 설정되었을 때 실행되는 함수
    const filterType = e.target.value
    let list = [...todoList]

    switch (filterType) {
      case "lateCreate":
        $("#tagFilter").hide()
        list = list.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        setShowTodoList(list)
        break
      case "recentCreate":
        $("#tagFilter").hide()
        list = list.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        setShowTodoList(list)
        break
      case "lateDeadline":
        $("#tagFilter").hide()
        list = list.sort(
          (a, b) => Date.parse(b.deadline) - Date.parse(a.deadline)
        )
        setShowTodoList(list)
        break
      case "recentDeadline":
        $("#tagFilter").hide()
        list = list.sort(
          (a, b) => Date.parse(a.deadline) - Date.parse(b.deadline)
        )
        setShowTodoList(list)
        break
      case "tag":
        setShowTodoList(todoList)
        $("#tagFilter").show()
        $("#tagFilter").val("default").prop("selected", true)
        break
      default:
        break
    }
  }

  const onTagSelected = (e) => {
    //선택된 태그가 포함된 할 일만 필터링
    let list = []
    const tagName = e.target.value
    if (tagName === "default") setShowTodoList(todoList)
    else {
      todoList.forEach((data) => {
        data.tags.forEach((e) => {
          if (e.name === tagName) {
            list.push(data)
            return
          }
        })
      })

      setShowTodoList(list)
    }
  }

  //전체, 완료한 일, 완료하지 않은 일
  const changeShowType = (e) => {
    setShowType(e.target.name)
  }

  useEffect(() => {
    $("#filter").show()
    $("#tagFilter").hide()
  }, [])

  useEffect(() => {
    setShowTodoList(todoList)
  }, [todoList])

  return (
    <Container>
      <Header type={type} />
      <Buttons>
        <DeleteBtn onClick={deleteCompleted}>완료한 일 삭제</DeleteBtn>
        <Filter
          id="filter"
          onChange={onOptionSelected}
          defaultValue="lateCreate"
        >
          <option value="lateCreate">오래된 생성순</option>
          <option value="recentCreate">최근 생성순</option>
          <option value="lateDeadline">마감일 느린 순</option>
          <option value="recentDeadline">마감일 빠른 순</option>
          <option value="tag">태그 별</option>
        </Filter>
        <TagFilter
          id="tagFilter"
          onChange={onTagSelected}
          defaultValue="default"
        >
          <option value="default">전체 태그</option>
          {filterTags &&
            filterTags.map((data, idx) => (
              <option key={idx} value={data}>
                {data}
              </option>
            ))}
        </TagFilter>
      </Buttons>
      <ListView>
        <ListHeader>
          <OptionButton margin="0px 10px" name="all" onClick={changeShowType}>
            전체
          </OptionButton>
          <OptionButton
            margin="0px 10px"
            name="complete"
            onClick={changeShowType}
          >
            완료한 일
          </OptionButton>
          <OptionButton
            margin="0px 10px"
            name="incomplete"
            onClick={changeShowType}
          >
            완료하지 않은 일
          </OptionButton>
          <OptionButton onClick={onClick} margin="0px 10px">
            할 일 추가
          </OptionButton>
        </ListHeader>
        <ListContent>
          {todoList.length === 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 32, color: "gray" }}>
                할 일을 등록해보세요.
              </span>
            </div>
          ) : showType === "all" ? (
            showTodoList &&
            showTodoList.map((data, idx) => (
              <Todo
                key={idx}
                id={data.id}
                idx={idx}
                checkId={"check" + data.id}
                completeColor="#dddddd"
              />
            ))
          ) : showType === "complete" ? (
            showTodoList &&
            showTodoList.map((data, idx) =>
              data.isCompleted ? (
                <Todo
                  key={idx}
                  id={data.id}
                  idx={idx}
                  checkId={"check" + data.id}
                  completeColor="#dddddd"
                />
              ) : null
            )
          ) : (
            showTodoList &&
            showTodoList.map((data, idx) =>
              !data.isCompleted ? (
                <Todo
                  key={idx}
                  id={data.id}
                  idx={idx}
                  checkId={"check" + data.id}
                  completeColor="#dddddd"
                />
              ) : null
            )
          )}
        </ListContent>
      </ListView>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
`
const ListView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ListHeader = styled.div`
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 30px 0px;
`
const ListContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 700px;
  border: 4px solid ${(props) => props.theme.mainColor};
  border-radius: 8px;
  overflow: auto;
  padding: 30px;
`
const Filter = styled.select`
  padding: 10px;
  font-size: 18px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.mainColor};
`
const TagFilter = styled(Filter)`
  margin: 0px 10px;
`
const OptionButton = styled(Button)`
  width: 200px;
  height: 50px;
  border-radius: 25px;
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
`
const FilterBtn = styled(Button)`
  margin-bottom: 10px;
`
const DeleteBtn = styled(FilterBtn)`
  margin: 0px 10px;
`
export default Main
