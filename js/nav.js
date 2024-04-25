const headerHeight = document.querySelector("header").offsetHeight

const navList = document.querySelectorAll("nav ul li")

navList.forEach((nav, idx) => {
  nav.addEventListener("click", addActiveItem)
  const aTag = nav.querySelector("a")

  aTag.addEventListener("click", scrollSmooth)
})

function addActiveItem() {
  const activeItem = document.querySelector("nav ul li.active")

  activeItem.classList.remove("active")

  this.classList.add("active")
}

function scrollSmooth(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href")
  const targetSection = document.querySelector(targetId)

  const targetPosition = targetSection.offsetTop - headerHeight

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// home화면은 header가 얹혀져 있기때문에, 그만큼 위에 padding 값을 줘서 밀어내 home 화면을 보이게함.
const homePlusHeight = document.querySelector("#Home")
homePlusHeight.style.paddingTop = headerHeight + "px"