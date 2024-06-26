import $ from 'jquery'
import { TStep } from '../types'
import resetStyles from './resetStyles'
import stepIdentifier from './stepIdentifier'

const animateFinishUntil = async (steps: TStep[], stepId: number) => {
  // console.log(stepId, steps[stepId]) // for debugging purposes
  if (stepId >= 0 && stepId <= steps.length - 1) {
    resetStyles()

    for (const step of steps) {
      if (step.id === stepId) {
        break
      }

      $('#info').html(step.description)

      const identify = stepIdentifier(step)

      if (identify.addToAdjacents) {
        $(`#circle-${step.vertexId}`)
          .removeClass('fill-slate-400')
          .addClass('fill-yellow-200')

        $(`#line-${step.edgeId}`)
          .removeClass('stroke-green-700')
          .removeClass('stroke-green-100')
          .addClass('stroke-yellow-200')
      }

      if (identify.checkVertexIfVisited) {
        $(`#circle-${step.vertexId}`)
          .removeClass('fill-slate-400')
          .removeClass('fill-red-700')
          .removeClass('fill-yellow-200')
          .addClass('fill-red-100')
      }

      if (identify.addVertexToVisited) {
        $(`#circle-${step.vertexId}`)
          .removeClass('fill-slate-400')
          .removeClass('fill-yellow-200')
          .removeClass('fill-red-100')
          .addClass('fill-red-700')
      }

      if (identify.checkAdjacentIfVisited) {
        $(`#line-${step.edgeId}`)
          .removeClass('stroke-green-700')
          .removeClass('stroke-yellow-200')
          .addClass('stroke-green-100')
      }
    }

    $(`#pseudo-${steps[stepId].codeLineId}`)
      .removeClass('bg-slate-600')
      .addClass('bg-yellow-600')
  }
}

export default animateFinishUntil
