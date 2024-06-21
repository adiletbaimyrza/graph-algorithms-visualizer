import { useContext } from 'react'
import {
  LinkingVertexContext,
  LinkingVertexContextType,
} from './LinkingVertexContext'

const useLinkingVertexContext = (): LinkingVertexContextType => {
  const linkingVertexContext = useContext(LinkingVertexContext)

  if (!linkingVertexContext) {
    throw new Error(
      'LinkingVertexContext has to be used within <LinkingVertexContext.Provider>'
    )
  }

  return linkingVertexContext
}

export default useLinkingVertexContext
