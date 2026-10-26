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
      menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    })
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', (ev) => {
        nav.classList.remove('open')
        menu.setAttribute('aria-expanded', 'false')
        menu.setAttribute('aria-label', 'Open menu')
        if (a.getAttribute('href') && a.getAttribute('href').charAt(0) === '#') {
          const id = a.getAttribute('href').slice(1)
          const target = document.getElementById(id)
          if (target) {
            ev.preventDefault()
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      })
    })
  }

  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q')
    const a = item.querySelector('.faq-a')
    if (!q || !a) return
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open')
      document.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('open')
        const btn = i.querySelector('.faq-q')
        if (btn) btn.setAttribute('aria-expanded', 'false')
      })
      if (!wasOpen) {
        item.classList.add('open')
        q.setAttribute('aria-expanded', 'true')
      }
    })
  })

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const els = document.querySelectorAll('.reveal')
  els.forEach((el) => {
    if (el.closest('#reviews') || el.id === 'reviews') return
    el.classList.add('reveal-animate')
  })
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    els.forEach((el) => {
      if (el.classList.contains('reveal-animate')) io.observe(el)
    })
    window.setTimeout(() => {
      els.forEach((el) => el.classList.add('show'))
    }, 1200)
  } else {
    els.forEach((el) => el.classList.add('show'))
  }

  document.querySelectorAll('.store-cta').forEach((el) => {
    el.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('tubepilot:store-click', { detail: { href: el.href } }))
    })
  })
  document.querySelectorAll('.email-cta').forEach((el) => {
    el.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('tubepilot:email-click', { detail: { href: el.href } }))
    })
  })
})()
