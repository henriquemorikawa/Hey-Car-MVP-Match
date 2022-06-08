import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import { PieChart } from 'react-minimal-pie-chart'
import {
  Chart,
  ContentWrapper,
  Heading,
  HeadingText,
  TableData,
  TableWithChart,
  TableWrapper,
  Title,
  TotalChart,
} from './Chart.styles'

const graphColors = ['#F24E1E', '#FFC107', '#6497B1', '#A259FF']

interface ChartProps {
  displayInfo: any
  projectDictionary?: {
    name: string
    id: string
  }[]
  gatewayDictionary?: {
    name: string
    id: string
  }[]
  amountByKey: (id: any, key: any) => any
  displayReports: any[]
  getFirstDateByKey: (id: any) => any
  amountByPayment: (id: any) => number
  getChartData: (dictionary: any, key: any) => any
  totalAmount: () => any
}

export default function ChartComponent({
  displayInfo,
  projectDictionary,
  gatewayDictionary,
  amountByKey,
  displayReports,
  getFirstDateByKey,
  amountByPayment,
  getChartData,
  totalAmount,
}: ChartProps) {
  return (
    <>
      {projectDictionary ? (
        <ContentWrapper>
          <TableWrapper>
            <Title>{`All projects | ${displayInfo.gatewayName}`}</Title>
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
                    <TableWithChart>
                      <tbody>
                        <tr>
                          <th>Date</th>
                          <th>Transaction ID</th>
                          <th>Amount</th>
                        </tr>
                      </tbody>
                      {displayReports
                        .filter(report => report.projectId === project.id)
                        .slice(0, 3)
                        .map(report => {
                          return (
                            <tbody key={report.paymentId}>
                              <tr>
                                <TableData>
                                  {getFirstDateByKey(report.projectId)}
                                </TableData>
                                <TableData>{project.id}</TableData>
                                <TableData>{`${amountByPayment(
                                  report.paymentId
                                )} USD`}</TableData>
                              </tr>
                            </tbody>
                          )
                        })}
                    </TableWithChart>
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </TableWrapper>
          <Chart>
            <div>
              {projectDictionary.map((project, index) => {
                return (
                  <>
                    <svg width="50" height="50">
                      <rect
                        x="30"
                        y="38"
                        rx="2"
                        ry="2"
                        width="10"
                        height="10"
                        style={{
                          fill: graphColors[index],
                          stroke: 'black',
                          opacity: 0.5,
                        }}
                      />
                    </svg>
                    <span>{project.name}</span>
                  </>
                )
              })}
            </div>
            <PieChart
              data={getChartData(projectDictionary, 'project')}
              lineWidth={50}
              label={({ dataEntry }) => dataEntry.title}
              labelStyle={{
                fontSize: '5px',
                fill: '#ffffff',
              }}
              viewBoxSize={[270, 270]}
              segmentsShift={0.5}
              labelPosition={70}
            />
            <TotalChart>{`GATEWAY TOTAL | ${totalAmount()} USD`}</TotalChart>
          </Chart>
        </ContentWrapper>
      ) : gatewayDictionary ? (
        <ContentWrapper>
          <TableWrapper>
            <Title>{`${displayInfo.projectName} | All gateways`}</Title>
            <Accordion allowZeroExpanded>
              {gatewayDictionary.map(gateway => (
                <AccordionItem key={gateway.name}>
                  <Heading>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <HeadingText>
                          <span>{gateway.name}</span>
                          <span>{`TOTAL: ${amountByKey(
                            gateway.id,
                            'gateway'
                          )} USD`}</span>
                        </HeadingText>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                  </Heading>
                  <AccordionItemPanel>
                    <TableWithChart>
                      <tbody>
                        <tr>
                          <th>Date</th>
                          <th>Transaction ID</th>
                          <th>Amount</th>
                        </tr>
                      </tbody>
                      {displayReports
                        .filter(report => report.gatewayId === gateway.id)
                        .slice(0, 3)
                        .map(report => {
                          return (
                            <tbody key={report.paymentId}>
                              <tr>
                                <TableData>
                                  {getFirstDateByKey(report.gatewayId)}
                                </TableData>
                                <TableData>{gateway.id}</TableData>
                                <TableData>{`${amountByPayment(
                                  report.paymentId
                                )} USD`}</TableData>
                              </tr>
                            </tbody>
                          )
                        })}
                    </TableWithChart>
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </TableWrapper>
          <Chart>
            <div>
              {gatewayDictionary.map((gateway, index) => {
                return (
                  <>
                    <svg width="50" height="50">
                      <rect
                        x="30"
                        y="38"
                        rx="2"
                        ry="2"
                        width="10"
                        height="10"
                        style={{
                          fill: graphColors[index],
                          stroke: 'black',
                          opacity: 0.5,
                        }}
                      />
                    </svg>
                    <span>{gateway.name}</span>
                  </>
                )
              })}
            </div>
            <PieChart
              data={getChartData(gatewayDictionary, 'gateway')}
              lineWidth={50}
              label={({ dataEntry }) => dataEntry.title}
              labelStyle={{
                fontSize: '5px',
                fill: '#ffffff',
              }}
              viewBoxSize={[270, 270]}
              segmentsShift={0.5}
              labelPosition={70}
            />
            <TotalChart>{`PROJECT TOTAL | ${totalAmount()} USD`}</TotalChart>
          </Chart>
        </ContentWrapper>
      ) : undefined}
    </>
  )
}
