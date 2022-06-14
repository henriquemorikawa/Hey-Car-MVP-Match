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
  TableDataAmount,
  TableDataId,
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

  const formatDate = (date: any) => {
    const pattern = /(\d{4})\-(\d{2})\-(\d{2})/

    if (!date || !date.match(pattern)) {
      return null
    }
    return date.replace(pattern, '$3/$2/$1')
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
          <ReportListContainer
            projectFilter={displayInfo?.projectName}
            gatewayFilter={displayInfo?.gatewayName}
          >
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
                          {displayReports.map(transaction => {
                            return (
                              <tbody key={transaction.name}>
                                <tr>
                                  <TableData>
                                    {formatDate(transaction.created)}
                                  </TableData>
                                  <TableData>{transaction.gatewayId}</TableData>
                                  <TableDataId>
                                    {transaction.paymentId}
                                  </TableDataId>
                                  <TableDataAmount>{`${amountByProject(
                                    transaction.gatewayId,
                                    project.id
                                  )} USD`}</TableDataAmount>
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
                  {displayReports.map(report => {
                    return (
                      <tbody key={report.paymentId}>
                        <tr>
                          <TableData>{formatDate(report.created)}</TableData>
                          <TableData>{report.gatewayId}</TableData>
                          <TableDataAmount>{`${amountByPayment(
                            report.paymentId
                          )} USD`}</TableDataAmount>
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
