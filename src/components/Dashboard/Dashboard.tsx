import { useContext } from 'react'
import { ReportsContext } from '../../contexts/ReportsContext'
import { Content, Main } from './Dashboard.styles'
import ReportList from './ReportList/ReportList'
import Sidebar from './Sidebar/Sidebar'
import TopContent from './TopContent/TopContent'

export default function Dashboard() {
  const { reports, setReports } = useContext(ReportsContext)

  return (
    <Main>
      <Sidebar />
      <Content>
        <TopContent />
        <ReportList />
      </Content>
    </Main>
  )
}
