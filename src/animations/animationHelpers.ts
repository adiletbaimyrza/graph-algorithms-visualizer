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

const paintPath = (vxId: number, dgId: number | undefined, anim: TAnim, vxId2: number | undefined) => {
  let vxClr = ''
  let dgClr = ''
  let vx2Clr = ''

  switch (anim) {
    case 'Push':
      vxClr = vxCls.pushed
      dgClr = dgCls.pushed
      vx2Clr = vxCls.pushed
      break
    case 'Pop':
      vxClr = vxCls.popped
      dgClr = dgCls.popped
      vx2Clr = vxCls.popped
      break
    case 'Check':
      vxClr = vxCls.checked
      dgClr = dgCls.checked
      vx2Clr = vxCls.checked
      break
    case 'Visit':
      vxClr = vxCls.visited
      dgClr = dgCls.visited
      vx2Clr = vxCls.visited
      break
    case 'Reverse':
      const vxHistoryEntry = vxHistory.get(vxId)
      const dgHistoryEntry = dgId !== undefined ? dgHistory.get(dgId) : undefined
      const vx2HistoryEntry = vxId2 !== undefined ? vxHistory.get(vxId2) : undefined
      if (vxHistoryEntry) {
        vxClr = vxHistoryEntry[0] || vxCls.default
      }
      if (dgHistoryEntry) {
        dgClr = dgHistoryEntry[0] || dgCls.default
      }
      if (vx2HistoryEntry) {
        vx2Clr = vx2HistoryEntry[0] || vxCls.default
      }
      break
    default:
      vxClr = vxCls.default
      dgClr = dgCls.default
      vx2Clr = vxCls.default
      break
  }

  const currentVxHistory = vxHistory.get(vxId) || [undefined, undefined]
  vxHistory.set(vxId, [currentVxHistory[1], vxClr])

  if (dgId !== undefined) {
    const currentDgHistory = dgHistory.get(dgId) || [undefined, undefined]
    dgHistory.set(dgId, [currentDgHistory[1], dgClr])
  }

  if (vxId2 !== undefined) {
    const currentVx2History = vxHistory.get(vxId2) || [undefined, undefined]
    vxHistory.set(vxId2, [currentVx2History[1], vx2Clr])
  }

  $(`#circle-${vxId}`).removeClass(vxClsList).addClass(vxClr)

  if (dgId !== undefined) {
    $(`#line-${dgId}`).removeClass(dgClsList).addClass(dgClr)
  }

  if (vxId2 !== undefined) {
    $(`#circle-${vxId2}`).removeClass(vxClsList).addClass(vx2Clr)
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
