import { TAnim, TStep } from '../types'

class StepTracker {
  private steps: TStep[]
  private stepId: number

  constructor() {
    this.steps = []
    this.stepId = 0
  }

  public add(
    dsc: string,
    cdId: number,
    anim: TAnim,
    vxId?: number,
    dgId?: number
  ) {
    const newStepId = this.stepId
    this.stepId = this.stepId++

    const newStep = {
      id: newStepId,
      dsc,
      cdId,
      anim,
      vxId,
      dgId,
    }

    this.steps.push(newStep)
  }

  public get() {
    return [...this.steps]
  }

  public getStepId() {
    return this.stepId
  }
}

export default StepTracker
