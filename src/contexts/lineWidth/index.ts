import { useContext } from 'react'
import { LineWidthContext, LineWidthContextType } from './LineWidthContext'

const useLineWidth = (): LineWidthContextType => {
  const lineWidthContext = useContext(LineWidthContext)

  if (!lineWidthContext) {
    throw new Error(
      'LineWidthContext has to be used within <LineWidthContext.Provider>'
    )
  }

  return lineWidthContext
}

export default useLineWidth
