import { useState, createContext, ReactNode } from 'react'

interface FontSizeContextType {
  state: number
  get: () => number
  set: (newFontSize: number) => void
}

// prettier-ignore
const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined)

interface FontSizeProviderProps {
  children: ReactNode
}

const FontSizeProvider = ({ children }: FontSizeProviderProps) => {
  const [fontSize, setFontSize] = useState<number>(14)

  const state = fontSize

  const set = (newFontSize: number) => {
    setFontSize(newFontSize)
  }

  const get = () => {
    return fontSize
  }

  return (
    <FontSizeContext.Provider value={{ state, get, set }}>
      {children}
    </FontSizeContext.Provider>
  )
}

export { FontSizeContext, FontSizeProvider, type FontSizeContextType }
