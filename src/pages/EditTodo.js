import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Header, Tag, Button } from "../elements"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import DatePicker from "react-datepicker"
import { Modal, TagModal } from "../components"
import $ from "jquery"
import { addTag, changeModal, editTodo } from "../redux/reducer/todo"
import { useNavigate } from "react-router-dom"

const EditTodo = (props) => {
  const type = props.type
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const id = useParams().id
  const data = useSelector((state) => state.reducer.todoList[id])
  const tags = useSelector((state) => state.reducer.tags)
  const modalTitleOpen = useSelector((state) => state.reducer.modalOpen.title)
  const modalContentOpen = useSelector(
    (state) => state.reducer.modalOpen.content
  )
  const tagModalOpen = useSelector((state) => state.reducer.modalOpen.tag)

  //최종 변경 시 리덕스에 저장될 값
  const [title, setTitle] = useState(localStorage.getItem("changeTitle"))
  const [content, setContent] = useState(localStorage.getItem("changeContent"))
  const [date, setDate] = useState(new Date()) //변경된 마감 목표일
  const [isCalOpened, setIsCalOpened] = useState(false)

  const handleDate = (e) => {
    //마감 목표일 상태 관리
    setDate(e)
  }

  const openCalendar = () => {
    //달력 UI open
    setIsCalOpened(true)
  }

  const openModal = (type) => {
    //해당 타입의 모달창 open
    dispatch(changeModal({ state: true, type }))
  }

  const onsubmit = () => {
    //수정 사항 제출
    const submitData = {
      ...data,
      title,
      content,
      tags,
      deadline: date.toLocaleString("en", { timeZone: "Asia/Seoul" }),
      editDate: new Date().toLocaleString("en", { timeZone: "Asia/Seoul" }),
    }
    dispatch(editTodo(submitData))
    alert("수정이 완료되었습니다.")

    localStorage.setItem("changeTitle", "")
    localStorage.setItem("changeContent", "")
    navigate("/")
    window.location.reload()
  }

  const cancel = () => {
    //수정 취소
    localStorage.setItem("changeTitle", "")
    localStorage.setItem("changeContent", "")
    navigate("/")
  }

  useEffect(() => {
    //마감 목표일 변경 클릭 시 달력 UI open
    if (isCalOpened) $("#calendar").show()
    else $("#calendar").hide()
  }, [isCalOpened])

  useEffect(() => {
    //처음 랜더링될 때 로컬스토리지 값 설정
    //tag 변경을 위해 리덕스에 접근
    localStorage.setItem("changeTitle", data.title)
    localStorage.setItem("changeContent", data.content)

    data.tags.forEach((data) => {
      dispatch(addTag(data))
    })
  }, [])

  useEffect(() => {
    //로컬스토리지 값이 바뀔 때마다(제목이나 설명을 변경할 때마다)
    //화면에 보이는 값 변경
    setTitle(localStorage.getItem("changeTitle"))
    setContent(localStorage.getItem("changeContent"))
  }, [
    localStorage.getItem("changeTitle"),
    localStorage.getItem("changeContent"),
  ])

  return (
    <Wrap>
      <Header type={type} />
      <Container>
        <ChangeView>
          <Deadline>마감 목표일 : {data.deadline}</Deadline>
          <Button margin="0px 10px" onClick={openCalendar}>
            마감 목표일 변경
          </Button>
          <div id="calendar">
            <DatePicker selected={date} onSelect={handleDate} />
          </div>
        </ChangeView>
        <ChangeView>
          <Title>{title}</Title>
          <Button
            margin="0px 10px"
            onClick={() => {
              openModal("title")
            }}
          >
            할 일 제목 변경
          </Button>
          <Modal
            width={700}
            height={100}
            modalOpen={modalTitleOpen}
            type="title"
          />
        </ChangeView>
        <DateContainer>
          <DateView>생성일 : {data.date}</DateView>
          <EditDate>수정일 : 2022년 02월 07일</EditDate>
        </DateContainer>
        <div style={{ marginTop: 20 }}>
          <Button
            onClick={() => {
              openModal("content")
            }}
          >
            상세설명 변경
          </Button>
          <Modal
            width={700}
            height={500}
            modalOpen={modalContentOpen}
            type="content"
          />
          <ContentContainer>
            <Content>{content}</Content>
          </ContentContainer>
        </div>
        <TagContainer>
          <ChangeView>
            <span style={{ fontSize: 24, fontWeight: "bold" }}>태그</span>
            <Button
              margin="0px 10px"
              onClick={() => {
                openModal("tag")
              }}
            >
              태그 추가
            </Button>
          </ChangeView>
          <Tags>
            {tags.map((e) => (
              <Tag
                id={e.id}
                name={e.name}
                bgColor={e.bgColor}
                fontColor={e.fontColor}
                date={e.date}
              />
            ))}
          </Tags>
        </TagContainer>
        <TagModal open={tagModalOpen} />
        <Btns>
          <Button margin="60px 40px 0px 40px" onClick={onsubmit}>
            변경
          </Button>
          <Button margin="60px 40px 0px 40px" onClick={cancel}>
            취소
          </Button>
        </Btns>
      </Container>
    </Wrap>
  )
}
const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-top: 30px;
  padding: 30px;
  border: 2px solid ${(props) => props.theme.mainColor};
  border-radius: 8px;
`
const ChangeView = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.span`
  font-size: 32px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 10px;
`
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const DateView = styled.span`
  margin: 1px 0px;
  color: gray;
`
const EditDate = styled(DateView)``
const Deadline = styled(DateView)``
const ContentContainer = styled.div`
  margin-top: 30px;
  font-size: 20px;
  height: 200px;
  overflow: scroll;
`
const Content = styled.span``
const TagContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`
const Tags = styled.div`
  margin-top: 10px;
  display: flex;
  overflow-x: auto;
`
const Btns = styled.div`
  display: flex;
  justify-content: center;
`
export default EditTodo
