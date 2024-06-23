import { IStep } from '../interfaces'

class StepTracker {
  private steps: IStep[]
  private stepId: number

  constructor() {
    this.steps = []
    this.stepId = 0
  }

  public add = (
    description: string,
    codeLineId: number,
    vertexId?: number,
    vertexColor?: string,
    edgeId?: number,
    edgeColor?: string
  ) => {
    const newStep: IStep = {
      id: this.stepId++,
      description,
      vertexId,
      vertexColor,
      edgeId,
      edgeColor,
      codeLineId,
    }

    this.steps.push(newStep)
  }

  public get = () => [...this.steps]
}

export default StepTracker
