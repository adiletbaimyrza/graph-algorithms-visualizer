import { TStep, TStepID } from '../types'
import { highlightCode, paintPath } from './animationHelpers'

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const startAnimations = async (
  steps: TStep[],
  stepId: TStepID,
  stepIdSet: (newStepId: TStepID) => void,
  isAnimatingGet: () => boolean,
  speedGet: () => number
) => {
  const newSteps = steps.slice(stepId)

  for (const step of newSteps) {
    if (!isAnimatingGet()) {
      break
    }

    paintPath(step.vxId!, step.dgId, step.anim, step.vxId2)
    highlightCode(step.cdId)

    await sleep(speedGet())

    stepIdSet(step.id)
  }
}

export default startAnimations
