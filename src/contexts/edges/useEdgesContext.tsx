import { useContext } from 'react'
import { EdgesContext, EdgesContextType } from './EdgesContext'

const useEdgesContext = (): EdgesContextType => {
  const edgesContext = useContext(EdgesContext)

  if (!edgesContext) {
    throw new Error(
      'EdgesContext has to be used within <EdgesContext.Provider>'
    )
  }

  return edgesContext
}

export default useEdgesContext
