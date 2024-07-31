import $ from 'jquery'
import { TAnim } from '../types'

const vxCls = {
  default: 'fill-slate-500',
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

const vxClsList = Object.values(vxCls)
const dgClsList = Object.values(dgCls)
const codeClsList = Object.values(codeCls)

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
  }
  $(`#circle-${vxId}`).removeClass(vxClsList).addClass(vxClr)

  if (dgId) {
    $(`#line-${dgId}`).removeClass(dgClsList).addClass(dgClr)
  }
}

const highlightCode = (codeId: number) => {
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
}

export { paintPath, highlightCode, resetStyles }
