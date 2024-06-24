import $ from 'jquery'
import { TStep } from '../types'

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const animateContinue = async (steps: TStep[]) => {
  $('#circle-0').removeClass('fill-slate-400')
  $('#circle-0').addClass('fill-red-700')

  for (const step of steps) {
    $(`#pseudo-${step.codeLineId}`).removeClass('bg-slate-600')
    $(`#pseudo-${step.codeLineId}`).addClass('bg-yellow-600')

    if (step.vertexId && step.edgeId) {
      $(`#circle-${step.vertexId}`).removeClass('fill-slate-400')
      $(`#circle-${step.vertexId}`).addClass('fill-yellow-200')
      $(`#line-${step.edgeId}`).removeClass('stroke-green-700')
      $(`#line-${step.edgeId}`).addClass('stroke-yellow-200')
    }
    if (step.vertexId && !step.edgeId) {
      $(`#circle-${step.vertexId}`).removeClass('fill-yellow-200')
      $(`#circle-${step.vertexId}`).addClass('fill-red-700')
    }

    await sleep(1)

    $(`#pseudo-${step.codeLineId}`).removeClass('bg-yellow-600')
    $(`#pseudo-${step.codeLineId}`).addClass('bg-slate-600')
  }
}

export default animateContinue
