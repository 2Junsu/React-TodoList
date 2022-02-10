import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearTags } from '../redux/reducer/todo'

const Header = (props) => {
  const type = props.type
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Text
      onClick={() => {
        //등록 및 수정 페이지에서만 동작
        if (type === 'add' || type === 'edit') {
          if (
            window.confirm(
              '입력 중인 내용이 삭제되고, 메인 페이지로 이동합니다.',
            )
          ) {
            navigate('/')
            dispatch(clearTags())
          }
        } else navigate('/')
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
