import $ from 'jquery'
import { TStep } from '../types'
import resetStyles from './resetStyles'

const animateFinishUntil = async (steps: TStep[], stepId: number) => {
  // console.log(stepId, steps[stepId]) // for debugging purposes
  if (stepId >= 0 && stepId <= steps.length - 1) {
    resetStyles()

    for (const step of steps) {
      if (step.id === stepId) {
        break
      }

      $('#info').html(step.description)

      if (step.vertexId !== undefined && step.edgeId !== undefined) {
        $(`#circle-${step.vertexId}`)
          .removeClass('fill-slate-400')
          .addClass('fill-yellow-200')

        $(`#line-${step.edgeId}`)
          .removeClass('stroke-green-700')
          .addClass('stroke-yellow-200')
      }

      if (step.vertexId !== undefined && step.edgeId === undefined) {
        $(`#circle-${step.vertexId}`)
          .removeClass('fill-slate-400')
          .removeClass('fill-yellow-200')
          .addClass('fill-red-700')
      }
    }

    $(`#pseudo-${steps[stepId].codeLineId}`)
      .removeClass('bg-slate-600')
      .addClass('bg-yellow-600')
  }
}

export default animateFinishUntil
