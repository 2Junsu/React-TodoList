import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { deleteTag } from '../redux/reducer/todo'

const Tag = (props) => {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(deleteTag(props.id))
  }

  return (
    <Container {...props} onClick={onClick}>
      <Name>{props.name}</Name>
      <Date>{props.date}</Date>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 5px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};
  padding: 8px 16px;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
  }
`
const Name = styled.div``
const Date = styled.div`
  margin-top: 10px;
`
export default Tag
