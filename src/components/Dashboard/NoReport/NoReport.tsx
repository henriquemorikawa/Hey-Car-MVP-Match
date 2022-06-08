import Image from 'next/image'
import { BackgroundImage, Content, Subtitle, Title } from './NoReport.styles'

export default function NoReportComponent() {
  return (
    <Content>
      <Title>No reports</Title>
      <Subtitle>
        Currently you have no data for the reports to be generated. <br />
        Once you start generating traffic through the Balance application the
        reports will be shown.
      </Subtitle>
      <BackgroundImage>
        <Image
          src="/images/noreport.svg"
          alt="image with trees, a screen, pie chart and abstract forms"
          width={402.5}
          height={171.71}
        />
      </BackgroundImage>
    </Content>
  )
}
