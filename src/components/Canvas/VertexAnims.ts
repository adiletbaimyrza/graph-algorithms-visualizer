import $ from 'jquery'

const toggleLinkingVertex = (id: number) => {
  const linkingVertex = $(`#circle-${id}`)

  if (linkingVertex) {
    const currentFill = linkingVertex.css('fill')
    console.log(currentFill)

    const slate400 = 'rgb(148, 163, 184)'

    if (currentFill === slate400) {
      linkingVertex.css('fill', 'red')
    } else {
      linkingVertex.css('fill', slate400)
    }
  }
}

export { toggleLinkingVertex }
