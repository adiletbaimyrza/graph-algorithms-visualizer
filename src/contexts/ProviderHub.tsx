import { ReactNode } from 'react'
import { VerticesProvider } from './vertices/VerticesContext'
import { VertexIdProvider } from './vertexId/VertexIdContext'
import { EdgeIdProvider } from './edgeId/EdgeIdContext'
import { EdgesProvider } from './edges/EdgesContext'
import { LinkingVertexProvider } from './linkingVertex/LinkingVertexContext'
import { VertexRadiusProvider } from './vertexRadius/VertexRadiusContext'
import { FontSizeProvider } from './fontSize/FontSizeContext'
import { LineWidthProvider } from './lineWidth/LineWidthContext'

interface ProviderHubProps {
  children: ReactNode
}

const ProviderHub = ({ children }: ProviderHubProps) => {
  return (
    <VerticesProvider>
      <VertexIdProvider>
        <EdgeIdProvider>
          <EdgesProvider>
            <LinkingVertexProvider>
              <VertexRadiusProvider>
                <FontSizeProvider>
                  <LineWidthProvider>{children}</LineWidthProvider>
                </FontSizeProvider>
              </VertexRadiusProvider>
            </LinkingVertexProvider>
          </EdgesProvider>
        </EdgeIdProvider>
      </VertexIdProvider>
    </VerticesProvider>
  )
}

export default ProviderHub
