import $ from 'jquery'
import { highlightCodeLine, paintPath, resetStyles } from './domUtils'
import { TStep } from '../types'

const animateFinishUntil = async (steps: TStep[], stepId: number) => {
  // console.log(stepId, steps[stepId]) // for debugging purposes
  if (stepId >= 0 && stepId <= steps.length - 1) {
    resetStyles()

    for (const step of steps) {
      if (step.id === stepId) {
        break
      }

      $('#info').html(step.description)

      paintPath(step.vertexId as number, step.edgeId, step.animation)
    }

    console.log(steps[stepId])
    highlightCodeLine(steps[stepId].codeLineId)
  }
}

export default animateFinishUntil
