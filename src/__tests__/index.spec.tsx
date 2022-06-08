import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../pages/index'

describe('Heycar', () => {
  it('should render home page', () => {
    render(<Home />)

    const title = screen.getByText('Report')
    const subTitle = screen.getByText(
      'Easily generate a report of your transactions'
    )
    const noReportsTitle = screen.getByText('No reports')

    expect([title, subTitle, noReportsTitle]).toAllBeInTheDocument()
  })

  it('should render ReportList when the filters are used', async () => {
    render(<Home />)

    const projectButton = screen.getByRole('button', {
      name: 'Select project',
    })

    await userEvent.click(projectButton)

    const projectOption = screen.getByRole('option', {
      name: 'All projects',
    })

    await userEvent.click(projectOption)

    const gatewayButton = screen.getByRole('button', {
      name: 'Select gateway',
    })

    await userEvent.click(gatewayButton)

    const gatewayOption = screen.getByRole('option', { name: 'All gateways' })

    await userEvent.click(gatewayOption)

    const submitButton = screen.getByRole('button', {
      name: 'Generate report',
    })

    await userEvent.click(submitButton)

    waitFor(() => {
      expect(
        screen.getByText('All projects | All gateways')
      ).toBeInTheDocument()
    })
  })
})
