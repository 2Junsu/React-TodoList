import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Tag, Button, Header } from '../elements'
import { TagModal } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addTodo, changeModal, clearTags } from '../redux/reducer/todo'
import { useNavigate } from 'react-router-dom'

const AddTodo = (props) => {
  const type = props.type
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const modalOpen = useSelector((state) => state.reducer.modalOpen.tag)
  const tags = useSelector((state) => state.reducer.tags)

  const [date, setDate] = useState(new Date())
  const [form, setForm] = useState({
    title: '',
    content: '',
    tags: [],
    deadline: new Date().toLocaleString('en', { timeZone: 'Asia/Seoul' }),
    date: new Date().toLocaleString('en', { timeZone: 'Asia/Seoul' }),
    isCompleted: false,
    completedTime: '',
    id: new Date().getTime(),
  })

  const handleDate = (e) => {
    //마감 목표일 상태 관리
    setDate(e)
  }

  const handleChange = (e) => {
    //제목, 상세설명, 태그 상태 관리
    const changed = {
      ...form,
      [e.target.name]: e.target.value,
    }
    setForm(changed)
  }

  const onSubmit = () => {
    //유효성 검증 후 리덕스에 할 일 추가
    if (form.title === '' || form.content === '')
      alert('입력되지 않은 정보가 있습니다.')
    else {
      dispatch(addTodo(form))
      dispatch(clearTags())
      alert('할 일이 등록되었습니다.')
      navigate('/')
    }
  }

  const openModal = () => {
    //modal창 open
    dispatch(changeModal({ state: true, type: 'tag' }))
  }

  useEffect(() => {
    //tag 목록이 변경될 때마다 리덕스에 들어갈 tag list 변경
    const changed = {
      ...form,
      tags,
    }
    setForm(changed)
  }, [tags])

  useEffect(() => {
    //마감 목표일이 변경될 때마다 리덕스에 들어갈 deadline 변경
    const changed = {
      ...form,
      deadline: date.toLocaleString('en', { timeZone: 'Asia/Seoul' }), //리덕스는 직렬화가 가능한 값을 권장하므로 객체->문자열로 변환
    }
    setForm(changed)
  }, [date])

  //뒤로가기 감지
  window.onpopstate = (e) => {
    if (
      window.confirm('입력 중인 내용이 삭제되고, 메인 페이지로 이동합니다.')
    ) {
      navigate('/')
    }
  }

  useEffect(() => {
    //브라우저 닫으려고 할 때 알림
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      e.returnValue = ''
    })
  }, [])

  return (
    <Container>
      <Header type={type} />
      <TitleInput
        name="title"
        type="text"
        placeholder="할 일을 입력하세요."
        onChange={handleChange}
        autoFocus
      />
      <ContentInput
        name="content"
        type="text"
        placeholder="상세 설명"
        onChange={handleChange}
      />
      <TagContainer>
        <Button onClick={openModal}>태그 추가</Button>
        <Tags>
          {tags.map((data, idx) => (
            <Tag
              id={data.id}
              name={data.name}
              bgColor={data.bgColor}
              fontColor={data.fontColor}
              date={data.date}
            />
          ))}
        </Tags>
      </TagContainer>
      <TagModal open={modalOpen} />
      <DateContainer>
        <Deadline>마감 목표일</Deadline>
        <DatePicker selected={date} onSelect={handleDate} />
      </DateContainer>
      <Button margin="30px 0px" onClick={onSubmit}>
        제출하기
      </Button>
    </Container>
  )
}

const Container = styled.div`
  padding: 30px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TitleInput = styled.input`
  margin-top: 20px;
  width: 700px;
  padding: 10px;
  font-size: 24px;
  border: 2px solid skyblue;
  border-radius: 8px;
`
const ContentInput = styled.textarea`
  margin-top: 30px;
  width: 700px;
  height: 300px;
  padding: 10px;
  font-size: 20px;
  font-family: sans-serif;
  border: 2px solid skyblue;
  border-radius: 8px;
`
const TagContainer = styled.div`
  width: 700px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Tags = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid skyblue;
  border-radius: 8px;
  padding: 20px;
`
const DateContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Deadline = styled.span`
  margin: 10px 0px;
  font-size: 20px;
  font-weight: bold;
`
export default AddTodo
