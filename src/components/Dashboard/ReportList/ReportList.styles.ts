import styled, { css } from 'styled-components'

export const ReportListContainer = styled.div`
  /* background-color: #f1fafe; */
  padding: 18px 27px 17px 19px;
  border-radius: 10px;
  max-width: 1240px;

  ${({ projectFilter, gatewayFilter }) =>
    ((projectFilter === 'All projects' && gatewayFilter === 'All gateways') ||
      (projectFilter !== 'All projects' && gatewayFilter !== 'All gateways')) &&
    css`
      background-color: #f1fafe;
    `}
`

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  background-color: #f1fafe;
  margin: 0 0 5px;
`

export const Heading = styled.div`
  max-width: 1194px;
  text-align: center;
  height: 71px;
  margin: auto;
  padding: 24px;
  color: #011f4b;
  border: 5px solid #f1fafe;
`
export const HeadingText = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  min-width: 654px;
  & > span {
    font-size: 16px;
    font-weight: bold;
  }
`

export const Table = styled.table`
  border: 5px solid #f1fafe;
  & > tbody {
    display: flex;
    justify-content: flex-start;
  }
  & > tbody > tr {
    width: 1180px;
    display: flex;
    justify-content: space-between;
    padding-left: 24px;
    padding-right: 12px;
    height: 35px;
    th:nth-of-type(2) {
      margin-left: 50px;
    }
  }

  & > tbody > tr > th {
    font-size: 14px;
  }
`
export const TableWithChart = styled.table`
  & > tbody {
    display: flex;
    justify-content: flex-start;
  }
  & > tbody > tr {
    width: 654px;
    display: flex;
    /* justify-content: space-between; */
    padding-left: 24px;
    padding-right: 12px;
    height: 35px;
    th:nth-of-type(2) {
      margin-left: 50px;
    }
  }

  & > tbody > tr > th {
    font-size: 14px;
  }
`

export const TableData = styled.td`
  font-size: 14px;
`

export const TableDataId = styled.td`
  font-size: 14px;
  width: 200px;
  text-align: center;
`
export const TableDataAmount = styled.td`
  width: 80px;
  font-size: 14px;
  text-align: right;
`

export const Total = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0 10px 24px;
  margin: 20px 5px 0 5px;
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 557px;
`

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Chart = styled.div`
  max-height: 557px;
  width: 521px;
  justify-content: center;
  text-align: center;
  & > svg {
    margin-left: 155px;
    margin-top: 90px;
  }
`

export const TotalChart = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0 10px 24px;
  margin: -200px 5px 0 5px;
`
