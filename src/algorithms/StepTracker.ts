import { TAnim, TStep } from '../types'

type CurStep = {
  id: number | undefined
  dsc: string | undefined
  cdId: number | undefined
  anim: string | undefined
  vxId: number | undefined
  dgId: number | undefined
}

const defCurStep: CurStep = {
  id: undefined,
  dsc: undefined,
  cdId: undefined,
  anim: undefined,
  vxId: undefined,
  dgId: undefined,
}

class StepTracker {
  private steps: TStep[]
  private stepId: number
  private curStep: CurStep

  constructor() {
    this.steps = []
    this.stepId = 0
    this.curStep = defCurStep
  }

  public dsc(dsc: string): this {
    this.curStep.dsc = dsc
    return this
  }

  public cdId(cdId: number): this {
    this.curStep.cdId = cdId
    return this
  }

  public anim(anim: TAnim): this {
    this.curStep.anim = anim
    return this
  }

  public vxId(vxId: number): this {
    this.curStep.vxId = vxId
    return this
  }

  public dgId(dgId: number): this {
    this.curStep.dgId = dgId
    return this
  }

  public add(): void {
    if (!this.curStep.dsc || !this.curStep.cdId || !this.curStep.anim) {
      throw new Error('Missing required TStep fields')
    }

    this.steps.push({
      ...this.curStep,
      id: this.stepId++,
    } as TStep)

    this.curStep = defCurStep
  }

  public get(): TStep[] {
    return [...this.steps]
  }

  public getStepId(): number {
    return this.stepId
  }
}

export default StepTracker
