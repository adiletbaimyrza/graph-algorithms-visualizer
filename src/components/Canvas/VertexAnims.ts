import $ from 'jquery'

const toggleLinkingVertex = (id: number) => {
  const linkingVertex = $(`#circle-${id}`)

  if (linkingVertex) {
    const currentFill = linkingVertex.css('fill')
    console.log(linkingVertex.css('fill'))
    const slate300 = 'rgb(203, 213, 225)'

    if (currentFill === slate300) {
      console.log(linkingVertex.css('fill'))
      linkingVertex.css('fill', 'red')
    } else {
      linkingVertex.css('fill', slate300)
      console.log(linkingVertex.css('fill'))
    }
  }
}

export { toggleLinkingVertex }
