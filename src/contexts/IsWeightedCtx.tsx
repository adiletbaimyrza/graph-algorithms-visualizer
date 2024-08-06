import { useState, createContext, ReactNode } from 'react'

interface IsWeightedCtxType {
  isWeighted: boolean
  setIsWeighted: React.Dispatch<React.SetStateAction<boolean>>
}

const IsWeightedCtx = createContext<IsWeightedCtxType | undefined>(undefined)

interface IsWeightedCtxProvProps {
  children: ReactNode
}

const IsWeightedCtxProv = ({ children }: IsWeightedCtxProvProps) => {
  const [isWeighted, setIsWeighted] = useState<boolean>(false)

  return (
    <IsWeightedCtx.Provider value={{ isWeighted, setIsWeighted }}>
      {children}
    </IsWeightedCtx.Provider>
  )
}

export { IsWeightedCtx, IsWeightedCtxProv, type IsWeightedCtxType }
