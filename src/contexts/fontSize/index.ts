import { useContext } from 'react'
import { FontSizeContext, FontSizeContextType } from './FontSizeContext'

const useFontSize = (): FontSizeContextType => {
  const fontSizeContext = useContext(FontSizeContext)

  if (!fontSizeContext) {
    throw new Error(
      'FontSizeContext has to be used within <FontSizeContext.Provider>'
    )
  }

  return fontSizeContext
}

export default useFontSize
