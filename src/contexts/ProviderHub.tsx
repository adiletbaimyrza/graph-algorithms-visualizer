import { ReactNode } from 'react'
import { VerticesProvider } from './vertices/VerticesContext'
import { VertexIdProvider } from './vertexId/VertexIdContext'
import { EdgeIdProvider } from './edgeId/EdgeIdContext'
import { EdgesProvider } from './edges/EdgesContext'
import { LinkingVertexProvider } from './linkingVertex/LinkingVertexContext'

interface ProviderHubProps {
  children: ReactNode
}

const ProviderHub = ({ children }: ProviderHubProps) => {
  return (
    <VerticesProvider>
      <VertexIdProvider>
        <LinkingVertexProvider>
          <EdgeIdProvider>
            <EdgesProvider>
              <LinkingVertexProvider>{children}</LinkingVertexProvider>
            </EdgesProvider>
          </EdgeIdProvider>
        </LinkingVertexProvider>
      </VertexIdProvider>
    </VerticesProvider>
  )
}

export default ProviderHub
