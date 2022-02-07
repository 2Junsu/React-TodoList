import React, { useState } from 'react'
import styled from 'styled-components'
import { Header, Tag } from '../elements'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Detail = () => {
  const [isCompleted, setIsCompleted] = useState(false)
  const id = useParams().id
  const data = useSelector((state) => state.reducer.todoList[id])
  console.log(data)

  return (
    <Wrap>
      <Header />
      <Container>
        <Deadline>마감 목표일 : {data.deadline.slice(0, -11)}</Deadline>
        <Title>{data.title}</Title>
        <DateContainer>
          <Date>생성일 : {data.date}</Date>
          <EditDate>수정일 : 2022년 02월 07일</EditDate>
          <CompleteDate>
            {isCompleted
              ? `완료일 : 2022년 02월 07일`
              : '아직 완료하지 않은 일입니다.'}
          </CompleteDate>
        </DateContainer>
        <ContentContainer>
          <Content>{data.content}</Content>
        </ContentContainer>
        <TagContainer>
          <span style={{ fontSize: 24, fontWeight: 'bold' }}>태그</span>
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
        </TagContainer>
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
  border: 2px solid skyblue;
  border-radius: 8px;
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
const Date = styled.span`
  margin: 1px 0px;
  color: gray;
`
const EditDate = styled(Date)``
const Deadline = styled(Date)``
const CompleteDate = styled(Date)``
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
`
const Tags = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`
export default Detail
