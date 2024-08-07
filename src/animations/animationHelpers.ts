import $ from 'jquery'
import { TAnim } from '../types'

const vxCls = {
  default: 'fill-slate-400',
  checked: 'fill-red-500',
  pushed: 'fill-yellow-500',
  popped: 'fill-orange-500',
  visited: 'fill-violet-500',
}
const dgCls = {
  default: 'stroke-green-700',
  checked: 'stroke-red-500',
  pushed: 'stroke-yellow-500',
  popped: 'stroke-orange-500',
  visited: 'stroke-violet-500',
}
const codeCls = { default: 'bg-slate-600', highlight: 'bg-yellow-500' }

const vxClsList = Object.values(vxCls).join(' ')
const dgClsList = Object.values(dgCls).join(' ')
const codeClsList = Object.values(codeCls).join(' ')

const vxHistory = new Map<number, [string | undefined, string | undefined]>()
const dgHistory = new Map<number, [string | undefined, string | undefined]>()

const paintPath = (vxId: number, dgId: number | undefined, anim: TAnim) => {
  let vxClr = ''
  let dgClr = ''

  switch (anim) {
    case 'Push':
      vxClr = vxCls.pushed
      dgClr = dgCls.pushed
      break
    case 'Pop':
      vxClr = vxCls.popped
      dgClr = dgCls.popped
      break
    case 'Check':
      vxClr = vxCls.checked
      dgClr = dgCls.checked
      break
    case 'Visit':
      vxClr = vxCls.visited
      dgClr = dgCls.visited
      break
    case 'Reverse':
      const vxHistoryEntry = vxHistory.get(vxId)
      const dgHistoryEntry = dgId !== undefined ? dgHistory.get(dgId) : undefined
      if (vxHistoryEntry) {
        vxClr = vxHistoryEntry[0] || vxCls.default
      }
      if (dgHistoryEntry) {
        dgClr = dgHistoryEntry[0] || dgCls.default
      }
      break
    default:
      vxClr = vxCls.default
      dgClr = dgCls.default
      break
  }

  const currentVxHistory = vxHistory.get(vxId) || [undefined, undefined]
  vxHistory.set(vxId, [currentVxHistory[1], vxClr])

  if (dgId !== undefined) {
    const currentDgHistory = dgHistory.get(dgId) || [undefined, undefined]
    dgHistory.set(dgId, [currentDgHistory[1], dgClr])
  }

  $(`#circle-${vxId}`).removeClass(vxClsList).addClass(vxClr)

  if (dgId !== undefined) {
    $(`#line-${dgId}`).removeClass(dgClsList).addClass(dgClr)
  }
}

const highlightCode = (codeId: number) => {
  const lines = $('.pseudo')
  lines.each((_, line) => {
    $(line).removeClass(codeClsList).addClass(codeCls.default)
  })

  $(`#pseudo-${codeId}`).removeClass(codeClsList).addClass(codeCls.highlight)
}

const resetStyles = () => {
  const defVx = vxCls.default
  const defDg = dgCls.default
  const defCode = codeCls.default

  $('circle').each(function () {
    $(this).removeClass(vxClsList).addClass(defVx)
  })
  $('line').each(function () {
    $(this).removeClass(dgClsList).addClass(defDg)
  })
  $('p').each(function () {
    $(this).removeClass(codeClsList).addClass(defCode)
  })
  $('#info').html('')
}

export { paintPath, highlightCode, resetStyles, vxCls, vxClsList }
