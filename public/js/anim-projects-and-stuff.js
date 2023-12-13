const elements = []

function scrollToTopAbruptly() {
  var html = document.documentElement
  html.style.scrollBehavior = "auto"
  window.scrollTo(0, 0)
  setTimeout(function () {
    // restore smooth scrolling
    html.style.scrollBehavior = "smooth"
    // lock scrolling
    document.body.style.overflow = "hidden"
  }, 100)
}

window.onload = function () {
  // onElementInView("bottom-scroll-spacer")

  var toTopInterval = setInterval(scrollToTopAbruptly, 10)

  // when we can scroll again
  setTimeout(() => {
    clearInterval(toTopInterval)
  }, 1000)
  setTimeout(() => {
    document.body.style.overflow = "auto"
    document
      .getElementById("back-arrow")
      .classList.remove("back-arrow-animation")
    document.getElementById("back-arrow").style.opacity = "1"
  }, 1500)

  populateMatrix()

  const animationGroup = {
    // one element triggers a group of animations
    // 'tim': ['tim', 'hola-soy-text', 'tim-text', 'hola-frontend', 'frontend-dev-text'],
  }

  for (let id in animationGroup) {
    const element = document.getElementById(id)
    const top = element.getBoundingClientRect().top + window.pageYOffset
    for (let animationClass of animationGroup[id]) {
      elements.push({
        element: document.getElementById(animationClass),
        top,
        animationClass: `${animationClass}-animation`,
      })
    }
  }

  window.addEventListener("scroll", () => {
    let cardBottom = document.getElementById("card-bottom")
    let cardTop = document.getElementById("card-top")
    let projectsSection = document.getElementById("projects")

    // -15 vh to px
    // get bottom of project section y offset from top of document
    const projectsSectionBottom =
      projectsSection.getBoundingClientRect().bottom + window.pageYOffset
    // now top
    const projectsSectionTop =
      projectsSection.getBoundingClientRect().top + window.pageYOffset
    // console.log(projectsSectionBottom)

    // get 1 vh
    const vh =
      Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ) / 100
    // console.log("1vh: ", vh, (1000 * 1) / vh)
    const defaultBottom = -projectsSectionTop + 280 - 50 + (6500 * 1) / vh
    const defaultTop = -projectsSectionTop + 150 - 110 + (6500 * 1) / vh
    // console.log("default top: ", defaultTop)
    // change move y coordinate of the bottom card
    if (!cardBottom.style.bottom) {
      cardBottom.style.bottom = cardBottom.style.bottom || defaultBottom
    }
    if (!cardTop.style.bottom) {
      cardTop.style.bottom = cardTop.style.bottom || defaultTop
    }
    const scrollPosition = window.pageYOffset + window.innerHeight
    const speedBottom = 0.065,
      speedTop = 0.085
    const speedRotBottom = -0.002,
      speedRotTop = 0.002

    cardBottom.style.bottom =
      parseInt(defaultBottom) - scrollPosition * speedBottom + "px"
    cardTop.style.bottom =
      parseInt(defaultTop) - scrollPosition * speedTop + "px"

    cardBottom.style.rotate = 0 + scrollPosition * speedRotBottom + "deg"
    cardTop.style.rotate = -0 + scrollPosition * speedRotTop + "deg"
  })

  // intersection observer on #projects
  const projectsSection = document.getElementById("projects")
  const projectsSectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // console.log('projects section is intersecting')
          // remove observer
          projectsSectionObserver.unobserve(entry.target)
          // start animation
          setTimeout(() => {
            document
              .getElementById("projects")
              .classList.add("slide-fade-in-down")
          }, 1000)
        }
      })
    }
  )
  projectsSectionObserver.observe(projectsSection)
}
