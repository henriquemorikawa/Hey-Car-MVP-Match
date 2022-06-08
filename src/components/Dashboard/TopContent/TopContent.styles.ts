import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 35px 0 27px 0;
`

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #011f4b;
  margin-bottom: 4px;
`

export const SubTitle = styled.p`
  font-size: 16px;
  color: #7e8299;
`

export const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 100px;
`

export const SelectButton = styled.div`
  margin-right: 23px;
  & > div > div {
    :hover {
      cursor: pointer;
    }
    width: 135px;
    background-color: #1bc5bd;
    border-radius: 5px;
    border-style: none;
  }
  & > div > div > div {
    width: 135px;
    background-color: #1bc5bd;
    border-color: #1bc5bd;
    color: #ffffff;
    font-size: 14px;
  }

  & > div > div > div > span {
    background-color: #1bc5bd;
    border-color: #ffffff transparent transparent;
    height: 14px;
  }
`

export const Calendar = styled.div`
  margin-right: 23px;
  position: relative;
  & > div > div > input {
    padding: 10px;
    color: #ffffff;
    :hover {
      cursor: pointer;
    }
    height: 32px;
    width: 118px;
    background-color: #1bc5bd;
    border-radius: 5px;
    border-style: none;
    font-size: 14px;
    ::placeholder {
      color: #ffffff;
      padding: 10px;
    }
  }
`
export const CalendarIcon = styled.div`
  :hover {
    cursor: pointer;
  }
  position: absolute;
  top: 1px;
  right: 12px;
  background-color: #1bc5bd;

  & > span > img {
    background-color: #1bc5bd;
    :hover {
      cursor: pointer;
    }
  }
`
export const SubmitButton = styled.button`
  :hover {
    cursor: pointer;
  }
  background-color: #005b96;
  border-radius: 5px;
  border-style: none;
  color: #ffffff;
  font-size: 14px;
  width: 118px;
  height: 32px;
`
