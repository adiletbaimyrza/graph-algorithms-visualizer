import { TAnim, TDgId, TStep, TVxId } from '../types'

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
    vxId?: TVxId,
    dgId?: TDgId,
    vxId2?: TVxId
  ) {
    const newStep: TStep = {
      id: this.stepId++,
      dsc,
      cdId,
      anim,
      vxId,
      dgId,
      vxId2,
    }

    this.steps.push(newStep)
  }

  public getTotalSteps() {
    return [...this.steps]
  }

  public getCurId() {
    return this.stepId
  }
}

export default StepTracker
