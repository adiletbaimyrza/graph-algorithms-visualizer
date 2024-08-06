import { ReactNode } from 'react'
import { VerticesProvider } from './vertices/VerticesContext'
import { VertexIdProvider } from './vertexId/VertexIdContext'
import { EdgeIdProvider } from './edgeId/EdgeIdContext'
import { EdgesProvider } from './edges/EdgesContext'
import { LinkingVertexProvider } from './linkingVertex/LinkingVertexContext'
import { VertexRadiusProvider } from './vertexRadius/VertexRadiusContext'
import { FontSizeProvider } from './fontSize/FontSizeContext'
import { LineWidthProvider } from './lineWidth/LineWidthContext'
import { CurrentAlgoProvider } from './currentAlgo/CurrentAlgoContext'
import { StepIdProvider } from './stepId/StepIdContext'
import { IsAnimatingProvider } from './isAnimating/IsAnimatingContext'
import { SpeedProvider } from './speed/SpeedContext'
import { IsWeightedCtxProv } from './IsWeightedCtx'

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
                  <LineWidthProvider>
                    <CurrentAlgoProvider>
                      <StepIdProvider>
                        <IsAnimatingProvider>
                          <SpeedProvider>
                            <IsWeightedCtxProv>{children}</IsWeightedCtxProv>
                          </SpeedProvider>
                        </IsAnimatingProvider>
                      </StepIdProvider>
                    </CurrentAlgoProvider>
                  </LineWidthProvider>
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
