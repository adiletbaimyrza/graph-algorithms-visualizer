import $ from 'jquery'
import { highlightCode, paintPath, resetStyles } from './animationHelpers'
import { TStep, TStepID } from '../types'

const completeAnimations = (steps: TStep[], stepId: TStepID) => {
  if (0 <= stepId && stepId < steps.length) {
    resetStyles()

    for (const step of steps) {
      if (step.id - 1 === stepId) {
        break
      }

      $('#info').html(step.dsc)

      paintPath(step.vxId!, step.dgId, step.anim, step.vxId2)
    }

    highlightCode(steps[stepId].cdId)
  }
}

export default completeAnimations
