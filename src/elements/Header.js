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
        if (
          window.confirm('입력 중인 내용이 삭제되고, 메인 페이지로 이동합니다.')
        ) {
          navigate('/')
          dispatch(clearTags())
        }
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
