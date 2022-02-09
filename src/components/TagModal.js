import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ModalComponent from 'react-modal'
import { SwatchesPicker } from 'react-color'
import $ from 'jquery'
import { Button } from '../elements'
import { useDispatch, useSelector } from 'react-redux'
import { changeModal, addTag } from '../redux/reducer/todo'

const TagModal = (props) => {
  const dispatch = useDispatch()
  const modalOpen = props.open
  const tags = useSelector((state) => state.reducer.tags)

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
    dispatch(changeModal({ state: false, type: 'tag' }))
    setBgPaletteClicked(false)
    setFontPaletteClicked(false)
    setTagName('')
  }

  const onsubmit = () => {
    if (tagName === '') {
      //태그를 꼭 입력하도록 유효성 검증
      alert('태그를 입력하세요.')
    } else {
      //중복된 태그가 존재하는지 확인 후에 태그 등록
      let duplicate = false
      tags.forEach((data) => {
        if (data.name === tagName) duplicate = true
      })
      if (duplicate) alert('같은 이름의 태그가 이미 존재합니다.')
      else {
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
        setTagName('')
      }
    }
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
          <SwatchesPicker color={bgColor} onChangeComplete={handleBgColor} />
        )}
      </OpenBgPalette>
      <OpenFontPalette id="fontPalette">
        {fontPaletteClicked && (
          <SwatchesPicker
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
export default TagModal
