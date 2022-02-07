import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearTags } from '../redux/reducer/todo'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Text
      onClick={() => {
        navigate('/')
        dispatch(clearTags())
      }}
    >
      My TodoList
    </Text>
  )
}

const Text = styled.h1`
  &:hover {
    cursor: pointer;
  }
`

export default Header
