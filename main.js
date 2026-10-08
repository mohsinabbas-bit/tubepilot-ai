(function () {
  const header = document.querySelector('.site-header')
  const menu = document.querySelector('.menu-btn')
  const nav = document.querySelector('.site-nav')

  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open')
      menu.setAttribute('aria-expanded', open ? 'true' : 'false')
    })
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      nav.classList.remove('open')
      menu.setAttribute('aria-expanded', 'false')
    }))
  }

  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q')
    if (!q) return
    q.addEventListener('click', () => {
      const was = item.classList.contains('open')
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'))
      if (!was) item.classList.add('open')
    })
  })

  const els = document.querySelectorAll('.reveal')
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('show')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    els.forEach((el) => io.observe(el))
  } else {
    els.forEach((el) => el.classList.add('show'))
  }
})()
