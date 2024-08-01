import $ from 'jquery'
import { highlightCode, paintPath, resetStyles } from './domUtils'
import { TStep } from '../types'

const animateFinishUntil = async (steps: TStep[], stepId: number) => {
  if (0 <= stepId && stepId < steps.length) {
    resetStyles()

    for (const step of steps) {
      if (step.id - 1 === stepId) {
        break
      }

      $('#info').html(step.dsc)

      paintPath(step.vxId as number, step.dgId, step.anim)
    }

    console.log(steps[stepId])
    highlightCode(steps[stepId].cdId)
  }
}

export default animateFinishUntil
