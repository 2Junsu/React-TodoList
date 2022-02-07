import React from 'react'
import styled from 'styled-components'

const Button = (props) => {
  const { children, margin, onClick } = props
  return <Btn {...props}>{children}</Btn>
}

Button.defaultProps = {
  margin: '0px',
  onClick: () => {},
}

const Btn = styled.button`
  margin: ${(props) => props.margin};
  padding: 8px 16px;
  background-color: skyblue;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`
export default Button
