import {
  TAnimation,
  TCodeID,
  TEdgeID,
  TStep,
  TStepID,
  TVertexID,
} from '../types'

class StepTracker {
  private steps: TStep[]
  private stepId: TStepID

  constructor() {
    this.steps = []
    this.stepId = 0
  }

  public add(
    dsc: string,
    cdId: TCodeID,
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

  public getTotalSteps(): TStep[] {
    return [...this.steps]
  }

  public getCurId(): TStepID {
    return this.stepId
  }
}

export default StepTracker
