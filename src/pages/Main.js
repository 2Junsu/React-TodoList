import React, { useState } from 'react'
import styled from 'styled-components'
import { Todo, CompletedTodo } from '../components'
import { Header, Button } from '../elements'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCompletedTodo, filterOnlyCompleted } from '../redux/reducer/todo'

const Main = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const todoList = useSelector((state) => state.reducer.todoList)
  const completedList = useSelector((state) => state.reducer.completedList)

  const [isAll, setIsAll] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)

  const onClick = () => {
    navigate('/add')
  }

  const seeAll = () => {
    //전체 할 일 보기
    setIsAll(true)
    if (isCompleted) setIsCompleted(false)
  }

  const onlyCompleted = () => {
    //완료한 일만 보기
    setIsCompleted(true)
    if (isAll) setIsAll(false)
    dispatch(filterOnlyCompleted())
  }

  const deleteCompleted = () => {
    //완료한 일이 존재하면 일괄 삭제
    let cnt = 0
    todoList.forEach((data) => {
      if (data.isCompleted) cnt += 1
    })

    if (cnt !== 0)
      if (window.confirm('정말 삭제하시겠습니까?')) {
        dispatch(deleteCompletedTodo())
        alert('삭제되었습니다.')
        window.location.reload()
      }
  }
  return (
    <Container>
      <Header />
      <Buttons>
        <FilterBtn onClick={seeAll}>전체 할 일 보기</FilterBtn>
        <FilterBtn onClick={onlyCompleted}>완료한 일만 보기</FilterBtn>
        <DeleteBtn onClick={deleteCompleted}>완료한 일 삭제</DeleteBtn>
      </Buttons>
      <ListView>
        <ListHeader>
          <Text>해야할 일</Text>
          <Write src={require('../assets/images/add.png')} onClick={onClick} />
        </ListHeader>
        {isAll &&
          todoList &&
          todoList.map((data, idx) => (
            <Todo
              id={data.id}
              idx={idx}
              checkId={'check' + data.id}
              completeColor="#dddddd"
            />
          ))}
        {isCompleted &&
          completedList &&
          completedList.map((data, idx) => (
            <CompletedTodo
              id={data.id}
              idx={idx}
              checkId={'completedCheck' + data.id}
              completeColor="#dddddd"
            />
          ))}
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
  width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 30px 0px;
`
const Write = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0px;
  &:hover {
    cursor: pointer;
  }
`
const Text = styled.span`
  font-size: 24px;
  font-weight: bold;
`
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`
const FilterBtn = styled(Button)`
  margin-bottom: 10px;
`
const DeleteBtn = styled(FilterBtn)``
export default Main
