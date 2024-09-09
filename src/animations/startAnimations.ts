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

  const superSpeed = false

  let i = 0

  while (i + 2 < newSteps.length) {
    if (!isAnimatingGet()) {
      break
    }

    if (superSpeed) {
      paintPath(
        newSteps[i].vxId!,
        newSteps[i].dgId,
        newSteps[i].anim,
        newSteps[i].vxId2
      )
      paintPath(
        newSteps[i + 1].vxId!,
        newSteps[i + 1].dgId,
        newSteps[i + 1].anim,
        newSteps[i + 1].vxId2
      )
      paintPath(
        newSteps[i + 2].vxId!,
        newSteps[i + 2].dgId,
        newSteps[i + 2].anim,
        newSteps[i + 2].vxId2
      )
      paintPath(
        newSteps[i + 3].vxId!,
        newSteps[i + 3].dgId,
        newSteps[i + 3].anim,
        newSteps[i + 3].vxId2
      )
      paintPath(
        newSteps[i + 4].vxId!,
        newSteps[i + 4].dgId,
        newSteps[i + 4].anim,
        newSteps[i + 4].vxId2
      )

      highlightCode(newSteps[i].cdId)
      i += 5
    } else {
      paintPath(
        newSteps[i].vxId!,
        newSteps[i].dgId,
        newSteps[i].anim,
        newSteps[i].vxId2
      )
      highlightCode(newSteps[i].cdId)
      i++
    }

    await sleep(speedGet())

    stepIdSet(newSteps[i].id)
  }
}

export default startAnimations
