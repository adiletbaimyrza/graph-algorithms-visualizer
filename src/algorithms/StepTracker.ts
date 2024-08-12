import { TAnimation, TEdgeID, TStep, TVertexID } from '../types'

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
    anim: TAnimation,
    vxId?: TVertexID,
    dgId?: TEdgeID,
    vxId2?: TVertexID
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
