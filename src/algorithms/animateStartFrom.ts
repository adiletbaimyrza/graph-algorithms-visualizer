import $ from 'jquery'
import { TStep } from '../types'

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const animateStartFrom = async (
  steps: TStep[],
  stepId: number,
  stepIdSet: (newStepId: number) => void,
  isAnimatingGet: () => boolean
) => {
  const newSteps = steps.slice(stepId)

  for (const step of newSteps) {
    // console.log(stepId, step) // for debugging purposes

    if (!isAnimatingGet()) {
      break
    }

    $(`#pseudo-${step.codeLineId}`)
      .removeClass('bg-slate-600')
      .addClass('bg-yellow-600')

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
        .removeClass('fill-yellow-200')
        .removeClass('fill-slate-400')
        .addClass('fill-red-700')
    }

    await sleep(1)

    $(`#pseudo-${step.codeLineId}`)
      .removeClass('bg-yellow-600')
      .addClass('bg-slate-600')

    stepIdSet(step.id)
  }
}

export default animateStartFrom
