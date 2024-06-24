import $ from 'jquery'

// Reset styles function
const resetStyles = () => {
  $('circle').each(function () {
    $(this)
      .removeClass('fill-yellow-200')
      .removeClass('fill-red-700')
      .addClass('fill-slate-400')
  })

  $('line').each(function () {
    $(this).removeClass('stroke-yellow-200').addClass('stroke-green-700')
  })

  $('p').each(function () {
    $(this).removeClass('bg-yellow-600').addClass('bg-slate-600')
  })
}

export default resetStyles
