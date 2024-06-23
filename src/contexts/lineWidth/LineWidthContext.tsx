import { useState, createContext, ReactNode } from 'react'

interface LineWidthContextType {
  state: number
  get: () => number
  set: (newLineWidth: number) => void
}

// prettier-ignore
const LineWidthContext = createContext<LineWidthContextType | undefined>(undefined)

interface LineWidthProviderProps {
  children: ReactNode
}

const LineWidthProvider = ({ children }: LineWidthProviderProps) => {
  const [lineWidth, setLineWidth] = useState<number>(14)

  const state = lineWidth

  const set = (newLineWidth: number) => {
    setLineWidth(newLineWidth)
  }

  const get = () => {
    return lineWidth
  }

  return (
    <LineWidthContext.Provider value={{ state, get, set }}>
      {children}
    </LineWidthContext.Provider>
  )
}

export { LineWidthContext, LineWidthProvider, type LineWidthContextType }
