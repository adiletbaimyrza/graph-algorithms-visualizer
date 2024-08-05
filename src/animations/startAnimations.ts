import { TStep } from '../types'
import { highlightCode, paintPath } from './animationHelpers'

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const startAnimations = async (
  steps: TStep[],
  stepId: number,
  stepIdSet: (newStepId: number) => void,
  isAnimatingGet: () => boolean,
  speed: number
) => {
  const newSteps = steps.slice(stepId)

  for (const step of newSteps) {
    if (!isAnimatingGet()) {
      break
    }

    paintPath(step.vxId!, step.dgId, step.anim)
    highlightCode(step.cdId)

    await sleep(speed)

    stepIdSet(step.id)
  }
}

export default startAnimations
