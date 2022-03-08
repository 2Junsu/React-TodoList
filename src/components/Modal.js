import React, { useState } from "react"
import styled from "styled-components"
import ModalComponent from "react-modal"
import { useDispatch } from "react-redux"
import { changeModal } from "../redux/reducer/todo"
import { Button } from "../elements"
import theme from "../theme"

const Modal = (props) => {
  const dispatch = useDispatch()
  const modalOpen = props.modalOpen
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const width = props.width
  const height = props.height

  const closeModal = () => {
    dispatch(changeModal({ state: false, type: props.type }))
    setTitle("")
    setContent("")
  }

  const onsubmit = () => {
    //유효성 검증 후 제목 및 상세설명 변경
    if (props.type === "title") {
      if (title === "") alert("제목을 입력하세요.")
      else localStorage.setItem("changeTitle", title)
    } else {
      if (content === "") alert("상세설명을 입력하세요.")
      else localStorage.setItem("changeContent", content)
    }
    closeModal()
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleContent = (e) => {
    setContent(e.target.value)
  }

  return (
    <ModalComponent
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
        },
        content: {
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          top: `calc(50% - ${height / 2}px)`,
          left: `calc(50% - ${width / 2}px)`,
          width: width + "px",
          height: height + "px",
          borderRadius: 8,
          border: `3px solid ${theme.mainColor}`,
          backgroundColor: "white",
        },
      }}
    >
      {props.type === "title" ? (
        <Container>
          <Title type="text" placeholder="할 일 제목" onChange={handleTitle} />
          <Btns>
            <Button margin="10px" onClick={onsubmit}>
              변경
            </Button>
            <Button margin="10px" onClick={closeModal}>
              취소
            </Button>
          </Btns>
        </Container>
      ) : (
        <Container>
          <Content
            type="text"
            placeholder="할 일 상세설명"
            onChange={handleContent}
          />
          <Btns>
            <Button margin="10px" onClick={onsubmit}>
              변경
            </Button>
            <Button margin="10px" onClick={closeModal}>
              취소
            </Button>
          </Btns>
        </Container>
      )}
    </ModalComponent>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Btns = styled.div`
  display: flex;
`
const Title = styled.input`
  font-size: 20px;
  padding: 8px 16px;
  width: 500px;
`
const Content = styled.textarea`
  font-size: 16px;
  padding: 8px 16px;
  width: 500px;
  height: 400px;
  font-family: sans-serif;
`
export default Modal
