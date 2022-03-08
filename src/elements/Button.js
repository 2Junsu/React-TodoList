import React from "react"
import styled from "styled-components"

const Button = (props) => {
  const { children, margin, onClick, name } = props
  return (
    <Btn onClick={onClick} name={name} {...props}>
      {children}
    </Btn>
  )
}

Button.defaultProps = {
  margin: "0px",
  onClick: () => {},
}

const Btn = styled.button`
  margin: ${(props) => props.margin};
  padding: 8px 16px;
  background-color: ${(props) => props.theme.mainColor};
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
  .clicked {
    background-color: goldenrod;
  }
`
export default Button
