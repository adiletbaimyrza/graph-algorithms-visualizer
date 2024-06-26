import { TStep } from '../types'

class StepTracker {
  private steps: TStep[]
  private stepId: number

  constructor() {
    this.steps = []
    this.stepId = 0
  }

  public add = (
    description: string,
    codeLineId: number,
    vertexId?: number,
    edgeId?: number,
    isVisited?: boolean
  ) => {
    const newStep = {
      id: this.stepId++,
      description,
      vertexId,
      edgeId,
      isVisited,
      codeLineId,
    }

    this.steps.push(newStep)
  }

  public get = () => [...this.steps]
}

export default StepTracker
