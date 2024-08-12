import { useContext } from 'react'
import {
  TCurrentAlgorithmContext,
  CurrentAlgorithmContext,
  TEdgeIDContext,
  EdgeIDContext,
  TEdgesContext,
  EdgesContext,
  TFontSizeContext,
  FontSizeContext,
  TIsAnimatingContext,
  IsAnimatingContext,
  TLineWidthContext,
  LineWidthContext,
  TLinkingVertexContext,
  LinkingVertexContext,
  TSpeedContext,
  SpeedContext,
  TStepIDContext,
  StepIDContext,
  TVertexIDContext,
  TVertexRadiusContext,
  VertexRadiusContext,
  TVerticesContext,
  VerticesContext,
  TIsWeightedContext,
  IsWeightedContext,
  VertexIDContext,
} from './contexts'

export const useCurrentAlgorithmContext = (): TCurrentAlgorithmContext => {
  const currentAlgorithmContext = useContext(CurrentAlgorithmContext)

  if (!currentAlgorithmContext) {
    throw new Error(
      'CurrentAlgorithmContext has to be used within <CurrentAlgorithmContext.Provider>'
    )
  }

  return currentAlgorithmContext
}

export const useEdgeIDContext = (): TEdgeIDContext => {
  const edgeIDContext = useContext(EdgeIDContext)

  if (!edgeIDContext) {
    throw new Error(
      'EdgeIDContext has to be used within <EdgeIDContext.Provider>'
    )
  }

  return edgeIDContext
}

export const useEdgesContext = (): TEdgesContext => {
  const edgesContext = useContext(EdgesContext)

  if (!edgesContext) {
    throw new Error(
      'EdgesContext has to be used within <EdgesContext.Provider>'
    )
  }

  return edgesContext
}

export const useFontSizeContext = (): TFontSizeContext => {
  const fontSizeContext = useContext(FontSizeContext)

  if (!fontSizeContext) {
    throw new Error(
      'FontSizeContext has to be used within <FontSizeContext.Provider>'
    )
  }

  return fontSizeContext
}

export const useIsAnimatingContext = (): TIsAnimatingContext => {
  const isAnimatingContext = useContext(IsAnimatingContext)

  if (!isAnimatingContext) {
    throw new Error(
      'IsAnimatingContext has to be used within <IsAnimatingContext.Provider>'
    )
  }

  return isAnimatingContext
}

export const useLineWidthContext = (): TLineWidthContext => {
  const lineWidthContext = useContext(LineWidthContext)

  if (!lineWidthContext) {
    throw new Error(
      'LineWidthContext has to be used within <LineWidthContext.Provider>'
    )
  }

  return lineWidthContext
}

export const useLinkingVertexContext = (): TLinkingVertexContext => {
  const linkingVertexContext = useContext(LinkingVertexContext)

  if (!linkingVertexContext) {
    throw new Error(
      'LinkingVertexContext has to be used within <LinkingVertexContext.Provider>'
    )
  }

  return linkingVertexContext
}

export const useSpeedContext = (): TSpeedContext => {
  const speedContext = useContext(SpeedContext)

  if (!speedContext) {
    throw new Error(
      'SpeedContext has to be used within <SpeedContext.Provider>'
    )
  }

  return speedContext
}

export const useStepIDContext = (): TStepIDContext => {
  const stepIDContext = useContext(StepIDContext)

  if (!stepIDContext) {
    throw new Error(
      'StepIDContext has to be used within <StepIDContext.Provider>'
    )
  }

  return stepIDContext
}

export const useVertexIDContext = (): TVertexIDContext => {
  const vertexIdContext = useContext(VertexIDContext)

  if (!vertexIdContext) {
    throw new Error(
      'VertexIdContext has to be used within <VertexIdContext.Provider>'
    )
  }

  return vertexIdContext
}

export const useVertexRadiusContext = (): TVertexRadiusContext => {
  const vertexRadiusContext = useContext(VertexRadiusContext)

  if (!vertexRadiusContext) {
    throw new Error(
      'VertexRadiusContext has to be used within <VertexRadiusContext.Provider>'
    )
  }

  return vertexRadiusContext
}

export const useVerticesContext = (): TVerticesContext => {
  const verticesContext = useContext(VerticesContext)

  if (!verticesContext) {
    throw new Error(
      'VerticesContext has to be used within <VerticesContext.Provider>'
    )
  }

  return verticesContext
}

export const useIsWeightedContext = (): TIsWeightedContext => {
  const isWeightedCtx = useContext(IsWeightedContext)

  if (!isWeightedCtx) {
    throw new Error(
      'IsWeightedContext has to be used within <IsWeightedContext.Provider>'
    )
  }

  return isWeightedCtx
}
