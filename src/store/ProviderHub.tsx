import { ReactNode } from 'react'
import {
  CurrentAlgorithmContextProvider,
  EdgeIDContextProvider,
  EdgesContextProvider,
  FontSizeContextProvider,
  IsAnimatingContextProvider,
  IsWeightedContextProvider,
  LineWidthContextProvider,
  LinkingVertexContextProvider,
  SpeedContextProvider,
  StepIDContextProvider,
  VertexIDContextProvider,
  VertexRadiusContextProvider,
  VerticesContextProvider,
} from './providers'

const ProviderHub = ({ children }: { children: ReactNode }) => {
  return (
    <VerticesContextProvider>
      <VertexIDContextProvider>
        <EdgeIDContextProvider>
          <EdgesContextProvider>
            <LinkingVertexContextProvider>
              <VertexRadiusContextProvider>
                <FontSizeContextProvider>
                  <LineWidthContextProvider>
                    <CurrentAlgorithmContextProvider>
                      <StepIDContextProvider>
                        <IsAnimatingContextProvider>
                          <SpeedContextProvider>
                            <IsWeightedContextProvider>
                              {children}
                            </IsWeightedContextProvider>
                          </SpeedContextProvider>
                        </IsAnimatingContextProvider>
                      </StepIDContextProvider>
                    </CurrentAlgorithmContextProvider>
                  </LineWidthContextProvider>
                </FontSizeContextProvider>
              </VertexRadiusContextProvider>
            </LinkingVertexContextProvider>
          </EdgesContextProvider>
        </EdgeIDContextProvider>
      </VertexIDContextProvider>
    </VerticesContextProvider>
  )
}

export default ProviderHub
