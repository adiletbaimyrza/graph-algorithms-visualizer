import $ from 'jquery'

const toggleLinkingVertex = (id: number) => {
  const linkingVertex = $(`#circle-${id}`)

  if (linkingVertex) {
    const currentFill = linkingVertex.css('fill')

    const slate300 = 'rgb(203, 213, 225)'

    if (currentFill === slate300) {
      linkingVertex.css('fill', 'red')
    } else {
      linkingVertex.css('fill', slate300)
    }
  }
}

export { toggleLinkingVertex }
