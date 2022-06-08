import axios from 'axios'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { ReportsContext } from '../../../contexts/ReportsContext'
import {
  Calendar,
  CalendarIcon,
  Container,
  Filters,
  SelectButton,
  SubmitButton,
  SubTitle,
  Title,
} from './TopContent.styles'

export default function TopContent() {
  const [startDate, setStartDate] = useState<Date>(null)
  const [endDate, setEndDate] = useState<Date>(null)
  const [projects, setProjects] = useState<Array<string>>([])
  const [gateways, setGateways] = useState<Array<string>>([])
  const [projectName, setProjectName] = useState<string>('')
  const [gatewayName, setGatewayName] = useState<string>('')

  const {
    payload,
    setPayload,
    setReports,
    projectDictionary,
    setProjectDictionary,
    gatewayDictionary,
    setGatewayDictionary,
  } = useContext(ReportsContext)

  const getReports = async payload => {
    const { projectName, gatewayName, startDate, endDate } = payload

    const projectId = projectDictionary.find(
      key => key.name === projectName
    )?.id

    const gatewayId = gatewayDictionary.find(
      key => key.name === gatewayName
    )?.id

    try {
      const result = await axios.post(
        'http://178.63.13.157:8090/mock-api/api/report',
        {
          from: startDate,
          to: endDate,
          projectId,
          gatewayId,
        }
      )

      setReports([...result.data.data])
      return
    } catch (error) {
      console.error(error)
    }
  }

  const generateReport = () => {
    if (!projectName || !gatewayName) {
      return
    }
    getReports(payload)
  }

  const formatDate = (date: any) => {
    if (date !== null) {
      return date.toISOString().split('T')[0]
    } else {
      return date
    }
  }

  useEffect(() => {
    const getProjects = async () => {
      try {
        const result = await axios.get(
          'http://178.63.13.157:8090/mock-api/api/projects'
        )
        let projectKeys = []
        const projectNames = result.data.data.map((project: any) => {
          projectKeys.push({ name: project.name, id: project.projectId })
          return project.name
        })
        projectNames.unshift('All projects')
        setProjects([...projectNames])
        setProjectDictionary(projectKeys)
        return
      } catch (error) {
        console.error(error)
      }
    }
    getProjects()
  }, [])

  useEffect(() => {
    const getGetaways = async () => {
      try {
        const result = await axios.get(
          'http://178.63.13.157:8090/mock-api/api/gateways'
        )
        let gatewayKeys = []
        const gatewayNames = result.data.data.map((gateway: any) => {
          gatewayKeys.push({ name: gateway.name, id: gateway.gatewayId })
          return gateway.name
        })
        gatewayNames.unshift('All gateways')
        setGateways([...gatewayNames])
        setGatewayDictionary(gatewayKeys)
        return
      } catch (error) {
        console.error(error)
      }
    }
    getGetaways()
  }, [])

  useEffect(() => {
    const formattedStartDate = formatDate(startDate)
    const formattedEndDate = formatDate(endDate)
    setPayload({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      gatewayName,
      projectName,
    })
  }, [startDate, endDate, gatewayName, projectName])

  return (
    <Container>
      <div>
        <Title color="regularText">Reports</Title>
        <SubTitle>Easily generate a report of your transactions</SubTitle>
      </div>
      <Filters>
        <SelectButton>
          <Dropdown
            options={projects}
            placeholder="Select project"
            onChange={projectName => {
              setProjectName(projectName.value)
            }}
          />
        </SelectButton>
        <SelectButton>
          <Dropdown
            options={gateways}
            placeholder="Select gateway"
            onChange={gatewayName => {
              setGatewayName(gatewayName.value)
            }}
          />
        </SelectButton>
        <Calendar>
          <DatePicker
            placeholderText="From date"
            selected={startDate}
            onChange={date => setStartDate(date)}
          />
          <CalendarIcon>
            <Image src="/images/calendar.svg" width={10} height={10}></Image>
          </CalendarIcon>
        </Calendar>
        <Calendar>
          <DatePicker
            placeholderText="To date"
            selected={endDate}
            onChange={date => setEndDate(date)}
          />
          <CalendarIcon>
            <Image src="/images/calendar.svg" width={10} height={10}></Image>
          </CalendarIcon>
        </Calendar>
        <SubmitButton onClick={generateReport}>Generate report</SubmitButton>
      </Filters>
    </Container>
  )
}
