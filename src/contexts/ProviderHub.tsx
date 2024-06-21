import { ReactNode } from 'react'
import { VerticesProvider } from './vertices/VerticesContext'
import { VertexIdProvider } from './vertexId/VertexIdContext'

interface ProviderHubProps {
  children: ReactNode
}

const ProviderHub = ({ children }: ProviderHubProps) => {
  return (
    <VerticesProvider>
      <VertexIdProvider>{children}</VertexIdProvider>
    </VerticesProvider>
  )
}

export default ProviderHub
