import { TAnim, TStep } from '../types'

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
    animation: TAnim,
    vertexId?: number,
    edgeId?: number
  ) => {
    const newStep = {
      id: this.stepId++,
      description,
      codeLineId,
      animation,
      vertexId,
      edgeId,
    }

    this.steps.push(newStep)
  }

  public get = () => [...this.steps]

  public getStepId = () => this.stepId
}

export default StepTracker
