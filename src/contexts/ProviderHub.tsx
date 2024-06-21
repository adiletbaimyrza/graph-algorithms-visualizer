import { ReactNode } from 'react'
import { VerticesProvider } from './vertices/VerticesContext'

interface ProviderHubProps {
  children: ReactNode
}

const ProviderHub = ({ children }: ProviderHubProps) => {
  return <VerticesProvider>{children}</VerticesProvider>
}

export default ProviderHub
