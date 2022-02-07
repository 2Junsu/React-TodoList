import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ModalComponent from 'react-modal'
import { SketchPicker } from 'react-color'
import $ from 'jquery'
import { Button } from '../elements'
import { useDispatch, useSelector } from 'react-redux'
import { changeModal, addTag } from '../redux/reducer/todo'

const Modal = () => {
  const dispatch = useDispatch()
  const modalOpen = useSelector((state) => state.reducer.modalOpen)

  const [tagName, setTagName] = useState('')
  const [bgColor, setBgColor] = useState('white')
  const [fontColor, setFontColor] = useState('black')

  const [bgPaletteClicked, setBgPaletteClicked] = useState(false)
  const [fontPaletteClicked, setFontPaletteClicked] = useState(false)

  const handleTagName = (name) => {
    //태그명 관리
    setTagName(name.target.value)
  }

  const handleBgColor = (color) => {
    //배경색 관리
    setBgColor(color.hex)
  }

  const handleFontColor = (color) => {
    //글자색 관리
    setFontColor(color.hex)
  }

  const openBgPalette = () => {
    //배경색 지정 팔레트 open
    setBgPaletteClicked(!bgPaletteClicked)
  }

  const openFontPalette = () => {
    //글자색 지정 팔레트 open
    setFontPaletteClicked(!fontPaletteClicked)
  }

  const closeModal = () => {
    //modal창 close
    dispatch(changeModal(false))
    setBgPaletteClicked(false)
    setFontPaletteClicked(false)
  }

  const onsubmit = () => {
    dispatch(
      addTag({
        name: tagName,
        fontColor,
        bgColor,
        date: new Date().toLocaleString(),
        id: new Date().getTime(),
      }),
    )
    closeModal()
  }

  useEffect(() => {
    //배경색 지정 팔레트와 글자색 지정 팔레트가 중복해서 열리지 않게 구현
    if (bgPaletteClicked) {
      if (fontPaletteClicked) setFontPaletteClicked(false)
      $('#bgPalette').show()
    } else $('#bgPalette').hide()
  }, [bgPaletteClicked])

  useEffect(() => {
    //배경색 지정 팔레트와 글자색 지정 팔레트가 중복해서 열리지 않게 구현
    if (fontPaletteClicked) {
      if (bgPaletteClicked) setBgPaletteClicked(false)
      $('#fontPalette').show()
    } else $('#fontPalette').hide()
  }, [fontPaletteClicked])

  return (
    <ModalComponent
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
        },
        content: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          top: 'calc(50% - 250px)',
          left: 'calc(50% - 150px)',
          width: 300,
          height: 500,
          borderRadius: 8,
          border: '3px solid skyblue',
          backgroundColor: 'white',
        },
      }}
    >
      <Name onChange={handleTagName} autoFocus />
      <Buttons>
        <Button margin="30px 10px" onClick={openBgPalette}>
          배경 색상
        </Button>
        <Button margin="30px 10px" onClick={openFontPalette}>
          글자 색상
        </Button>
      </Buttons>
      <OpenBgPalette id="bgPalette">
        {bgPaletteClicked && (
          <SketchPicker
            width="200px"
            disableAlpha={true}
            color={bgColor}
            onChangeComplete={handleBgColor}
          />
        )}
      </OpenBgPalette>
      <OpenFontPalette id="fontPalette">
        {fontPaletteClicked && (
          <SketchPicker
            width="200px"
            disableAlpha={true}
            color={fontColor}
            onChangeComplete={handleFontColor}
          />
        )}
      </OpenFontPalette>
      <BottomBtns>
        <Button margin="30px 10px" onClick={onsubmit}>
          추가
        </Button>
        <Button margin="30px 10px" onClick={closeModal}>
          닫기
        </Button>
      </BottomBtns>
    </ModalComponent>
  )
}

const Name = styled.input`
  width: 80%;
  font-size: 20px;
  padding: 10px;
  border: 2px solid skyblue;
  border-radius: 8px;
`
const Buttons = styled.div`
  display: flex;
`
const BottomBtns = styled(Buttons)`
  position: absolute;
  bottom: 0;
`
const OpenBgPalette = styled.div`
  position: absolute;
  top: 150px;
`
const OpenFontPalette = styled(OpenBgPalette)``
export default Modal
