import { createContext, ReactNode, useState } from 'react'

export interface ReportsContextTypes {
  reports: Array<any>
  setReports(reports: Array<any>): void
  payload: PayloadType
  setPayload(payload: PayloadType): void
  projectDictionary: { name: string; id: string }[]
  setProjectDictionary(projectDictionary: { name: string; id: string }[]): void
  gatewayDictionary: { name: string; id: string }[]
  setGatewayDictionary(gatewayDictionary: { name: string; id: string }[]): void
}

type PayloadType = {
  startDate?: Date
  endDate?: Date
  gatewayName?: string
  projectName?: string
}

type PropsWithChildren<P> = P & { children?: ReactNode | undefined }

const defaultValues = {
  reports: [],
  payload: {
    startDate: null,
    endDate: null,
    gatewayName: '',
    projectName: '',
  },
  setReports: () => {},
  setPayload: () => {},
  projectDictionary: [],
  setProjectDictionary: () => {},
  gatewayDictionary: [],
  setGatewayDictionary: () => {},
}

export const ReportsContext = createContext<ReportsContextTypes>(defaultValues)

export const ReportsProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [reports, setReports] = useState([])
  const [payload, setPayload] = useState<PayloadType>({
    startDate: null,
    endDate: null,
    gatewayName: '',
    projectName: '',
  })
  const [projectDictionary, setProjectDictionary] = useState([])
  const [gatewayDictionary, setGatewayDictionary] = useState([])

  return (
    <ReportsContext.Provider
      value={{
        reports,
        setReports,
        payload,
        setPayload,
        projectDictionary,
        setProjectDictionary,
        gatewayDictionary,
        setGatewayDictionary,
      }}
    >
      {children}
    </ReportsContext.Provider>
  )
}
