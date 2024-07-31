import $ from 'jquery'
import { highlightCode, paintPath, resetStyles } from './domUtils'
import { TStep } from '../types'

const animateFinishUntil = async (steps: TStep[], stepId: number) => {
  if (0 <= stepId && stepId < steps.length) {
    resetStyles()

    for (const step of steps) {
      if (step.id === stepId) {
        break
      }

      $('#info').html(step.description)

      paintPath(step.vertexId as number, step.edgeId, step.animation)
    }

    console.log(steps[stepId])
    highlightCode(steps[stepId].codeLineId)
  }
}

export default animateFinishUntil
