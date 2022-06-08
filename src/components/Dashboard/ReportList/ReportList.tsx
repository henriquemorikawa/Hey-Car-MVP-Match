import { useContext, useEffect, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import { ReportsContext } from '../../../contexts/ReportsContext'
import NoReportComponent from '../NoReport/NoReport'
import ChartComponent from './Chart/Chart'
import {
  Heading,
  HeadingText,
  ReportListContainer,
  Table,
  TableData,
  Title,
  Total,
} from './ReportList.styles'

const graphColors = ['#F24E1E', '#FFC107', '#6497B1', '#A259FF']

export default function ReportList() {
  const { payload, reports, projectDictionary, gatewayDictionary } =
    useContext(ReportsContext)

  const [displayReports, setDisplayReports] = useState<Array<any>>(reports)
  const [displayInfo, setDisplayInfo] = useState(null)

  const totalAmount = () => {
    return displayReports.reduce((acc, curr) => {
      return Math.round(acc + curr.amount)
    }, 0)
  }

  const amountByKey = (id, key) => {
    return displayReports
      .filter(report => {
        return key === 'project'
          ? report.projectId === id
          : report.gatewayId === id
      })
      .reduce((acc, curr) => {
        return Math.round(acc + curr.amount)
      }, 0)
  }

  const amountByProject = (id, referenceId) => {
    return displayReports
      .filter(
        report => report.gatewayId === id && report.projectId === referenceId
      )
      .reduce((acc, curr) => {
        return Math.round(acc + curr.amount)
      }, 0)
  }

  const amountByPayment = id => {
    return Math.round(
      displayReports.find(report => report.paymentId === id)?.amount
    )
  }

  const sortByDate = () => {
    return reports.sort(
      (a, b) => new Date(a.created).valueOf() - new Date(b.created).valueOf()
    )
  }

  const getFirstDateByKey = id => {
    const newFormattedDate = displayReports.find(
      report => report.keyId === id
    )?.created

    const pattern = /(\d{4})\-(\d{2})\-(\d{2})/

    if (!newFormattedDate || !newFormattedDate.match(pattern)) {
      return null
    }
    return newFormattedDate.replace(pattern, '$3/$2/$1')
  }

  const getFirstDate = (id, referenceId?) => {
    const newFormattedDate = displayReports.find(
      report => report.gatewayId === id && report.projectId === referenceId
    )?.created

    const pattern = /(\d{4})\-(\d{2})\-(\d{2})/

    if (!newFormattedDate || !newFormattedDate.match(pattern)) {
      return null
    }
    return newFormattedDate.replace(pattern, '$3/$2/$1')
  }

  const getChartData = (dictionary, key) => {
    const data = dictionary.map((item, index) => {
      return {
        title: Number(amountByKey(item.id, key) / totalAmount()).toLocaleString(
          undefined,
          {
            style: 'percent',
            minimumFractionDigits: 2,
          }
        ),
        value: amountByKey(item.id, key),
        color: graphColors[index],
      }
    })
    return data
  }

  useEffect(() => {
    setDisplayReports(sortByDate())
    setDisplayInfo(payload)
  }, [reports])

  return (
    <>
      {!displayReports.length ? (
        <NoReportComponent></NoReportComponent>
      ) : (
        <>
          <ReportListContainer>
            {displayInfo?.projectName === 'All projects' &&
            displayInfo?.gatewayName === 'All gateways' ? (
              <>
                <Title>All projects | All gateways</Title>
                <Accordion allowZeroExpanded>
                  {projectDictionary.map(project => (
                    <AccordionItem key={project.name}>
                      <Heading>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            <HeadingText>
                              <span>{project.name}</span>
                              <span>{`TOTAL: ${amountByKey(
                                project.id,
                                'project'
                              )} USD`}</span>
                            </HeadingText>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                      </Heading>
                      <AccordionItemPanel>
                        <Table>
                          <tbody>
                            <tr>
                              <th>Date</th>
                              <th>Gateways</th>
                              <th>Transaction ID</th>
                              <th>Amount</th>
                            </tr>
                          </tbody>
                          {gatewayDictionary.map(gateway => {
                            return (
                              <tbody key={gateway.name}>
                                <tr>
                                  <TableData>
                                    {getFirstDate(gateway.id, project.id)}
                                  </TableData>
                                  <TableData>{gateway.name}</TableData>
                                  <TableData>{gateway.id}</TableData>
                                  <TableData>{`${amountByProject(
                                    gateway.id,
                                    project.id
                                  )} USD`}</TableData>
                                </tr>
                              </tbody>
                            )
                          })}
                        </Table>
                      </AccordionItemPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Total>{`TOTAL: ${totalAmount()} USD`}</Total>
              </>
            ) : displayInfo?.projectName !== 'All projects' &&
              displayInfo?.gatewayName !== 'All gateways' ? (
              <>
                <Title>{`${displayInfo?.projectName} | ${displayInfo?.gatewayName}`}</Title>
                <Table>
                  <tbody>
                    <tr>
                      <th>Date</th>
                      <th>Transaction ID</th>
                      <th>Amount</th>
                    </tr>
                  </tbody>
                  {displayReports.slice(0, 3).map(report => {
                    return (
                      <tbody key={report.paymentId}>
                        <tr>
                          <TableData>
                            {getFirstDate(report.gatewayId, report.projectId)}
                          </TableData>
                          <TableData>{report.gatewayId}</TableData>
                          <TableData>{`${amountByPayment(
                            report.paymentId
                          )} USD`}</TableData>
                        </tr>
                      </tbody>
                    )
                  })}
                </Table>
                <Total>{`TOTAL: ${totalAmount()} USD`}</Total>
              </>
            ) : displayInfo?.projectName !== 'All projects' &&
              displayInfo?.gatewayName === 'All gateways' ? (
              <ChartComponent
                displayInfo={displayInfo}
                gatewayDictionary={gatewayDictionary}
                amountByKey={amountByKey}
                displayReports={displayReports}
                getFirstDateByKey={getFirstDateByKey}
                amountByPayment={amountByPayment}
                getChartData={getChartData}
                totalAmount={totalAmount}
              />
            ) : (
              <ChartComponent
                displayInfo={displayInfo}
                projectDictionary={projectDictionary}
                amountByKey={amountByKey}
                displayReports={displayReports}
                getFirstDateByKey={getFirstDateByKey}
                amountByPayment={amountByPayment}
                getChartData={getChartData}
                totalAmount={totalAmount}
              />
            )}
          </ReportListContainer>
        </>
      )}
    </>
  )
}
