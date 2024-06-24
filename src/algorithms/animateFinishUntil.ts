import $ from 'jquery'
import { TStep } from '../types'
import resetStyles from './resetStyles'

const animateFinishUntil = async (
  steps: TStep[],
  stepId: number,
  stepIdSet: (newStepId: number) => void
) => {
  resetStyles()

  for (const step of steps) {
    if (step.id === stepId) {
      break
    }

    $('#info').html(step.description)

    if (step.vertexId && step.edgeId) {
      $(`#circle-${step.vertexId}`)
        .removeClass('fill-slate-400')
        .addClass('fill-yellow-200')

      $(`#line-${step.edgeId}`)
        .removeClass('stroke-green-700')
        .addClass('stroke-yellow-200')
    }

    if (step.vertexId && !step.edgeId) {
      $(`#circle-${step.vertexId}`)
        .removeClass('fill-slate-400')
        .removeClass('fill-yellow-200')
        .addClass('fill-red-700')
    }
  }

  $(`#pseudo-${steps[stepId].codeLineId}`).removeClass('bg-slate-600')
  $(`#pseudo-${steps[stepId].codeLineId}`).addClass('bg-yellow-600')

  stepIdSet(stepId)
}

export default animateFinishUntil
