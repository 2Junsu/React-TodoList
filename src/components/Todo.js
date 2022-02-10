import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeCheck, deleteTodo } from '../redux/reducer/todo'
import $ from 'jquery'
import { Tag } from '../elements'

const Todo = (props) => {
  const id = props.id
  const idx = props.idx
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector(
    (state) => state.reducer.todoList.filter((data) => data.id === id)[0],
  )
  const check = data.isCompleted //완료 여부
  const deadlineMilli = Date.parse(data.deadline)
  const nowMilli = new Date().getTime()

  const [isSoon, setIsSoon] = useState(false) //마감일이 3일 이내인지 여부

  const untilDeadline = () => {
    //마감 목표일이 3일 이내면 빨간색으로 표시
    let time = deadlineMilli - nowMilli
    if (time <= 259200000) setIsSoon(true)
    else setIsSoon(false)
  }

  setInterval(untilDeadline, 1000)

  const onClick = () => {
    navigate(`/detail/${idx}`)
  }

  const editElement = () => {
    navigate(`/edit/${idx}`)
  }

  const deleteElement = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deleteTodo(id))
      alert('삭제되었습니다.')
    }
  }

  const handleCheck = () => {
    //할 일 완료 여부 저장
    if ($(`#${props.checkId}`).prop('checked'))
      dispatch(
        changeCheck({
          id,
          isTrue: true,
          completedTime: new Date().toLocaleString('en', {
            timeZone: 'Asia/Seoul',
          }),
        }),
      )
    else dispatch(changeCheck({ id, isTrue: false, completedTime: '' }))
  }

  return (
    <Wrap
      id={id}
      completeColor={props.completeColor}
      check={check}
      isSoon={isSoon}
    >
      <Container>
        <Left>
          <Checkbox
            type="checkbox"
            id={props.checkId}
            onChange={handleCheck}
            checked={check}
          />
          <TitleDeadline>
            <TitleContainer onClick={onClick}>
              <Title>{data.title}</Title>
            </TitleContainer>
            <Deadline>
              {data.deadline.slice(0, -12).replaceAll('/', '.')}
            </Deadline>
          </TitleDeadline>
        </Left>
        <Buttons>
          <EditImg
            onClick={editElement}
            src={require('../assets/images/edit.png')}
          />
          <DeleteImg
            onClick={deleteElement}
            src={require('../assets/images/delete.png')}
          />
        </Buttons>
      </Container>
      <Tags>
        {data.tags.map((data) => (
          <Tag
            name={data.name}
            bgColor={data.bgColor}
            fontColor={data.fontColor}
            date={data.date}
          />
        ))}
      </Tags>
    </Wrap>
  )
}
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid
    ${(props) =>
      props.check ? props.completeColor : props.isSoon ? 'red' : 'skyblue'};
  color: ${(props) => (props.check ? props.completeColor : 'black')};
  border-radius: 8px;
  width: 700px;
  padding: 15px;
  margin: 5px 0px;
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Tags = styled.div`
  display: flex;
  overflow: auto;
`
const Left = styled.div`
  display: flex;
  align-items: center;
`
const Buttons = styled.div`
  display: flex;
`
const EditImg = styled.img`
  width: 25px;
  height: 25px;
  &:hover {
    cursor: pointer;
  }
`
const DeleteImg = styled(EditImg)`
  margin-left: 20px;
`
const Checkbox = styled.input`
  width: 30px;
  height: 30px;
`
const TitleDeadline = styled.div`
  width: 550px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TitleContainer = styled.div`
  width: 450px;
  margin-left: 10px;
  overflow: auto;
  &:hover {
    cursor: pointer;
  }
`
const Title = styled.span`
  margin-left: 5px;
  font-size: 20px;
  font-weight: bold;
`
const Deadline = styled.span`
  font-size: 16px;
  color: gray;
`
export default Todo
