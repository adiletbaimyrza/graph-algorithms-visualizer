import $ from 'jquery'
import { vxCls, vxClsList } from '../../animations/animationHelpers'

const toggleLinkingVertex = (id: number) => {
  const linkingVertex = $(`#circle-${id}`)

  if (linkingVertex) {
    if (linkingVertex.hasClass(vxCls.default)) {
      linkingVertex.removeClass(vxClsList).addClass(vxCls.checked)
    } else {
      linkingVertex.removeClass(vxClsList).addClass(vxCls.default)
    }
  }
}

export { toggleLinkingVertex }
