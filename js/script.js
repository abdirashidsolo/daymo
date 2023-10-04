// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
//Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header-section");
const mainNavEl = document.querySelector(".main-nav-lists");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("open-nav");
});
///////////////////////////////////////////////////////////
// Scorolling

// HERE WE IMPLEMENT EVENT b
mainNavEl.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".main-nav-list");

  if (!clicked) return;

  // const href = clicked.firstElementChild.getAttribute("href"); // I Can use eather way
  const href = clicked.querySelector(".main-nav-link").getAttribute("href");

  if (href != "#" && href.startsWith("#")) {
    const sectionEL = document.querySelector(href);
    sectionEL.scrollIntoView({
      behavior: "smooth",
    });
  }
});

document.querySelectorAll(".logo").forEach((r) => {
  r.addEventListener("click", () => {
    const href = r.closest("a").getAttribute("href");
    console.log(href);
    if (href === "#")
      window.scrollTo({
        top: 0,
        behaivor: "smooth",
      });
  });
});

// THis way is not perfect for performance reasons

// const allLinks = document.querySelectorAll("a:link");
// allLinks.forEach(function (link) {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const href = link.getAttribute("href");

//     // Scoroll back to top
//     if (href === "#")
//       window.scrollTo({
//         top: 0,
//         behaivor: "smooth",
//       });

//     if (href != "#" && href.startsWith("#")) {
//       const sectionEL = document.querySelector(href);
//       sectionEL.scrollIntoView({
//         behavior: "smooth",
//       });
//     }

//     if (link.classList.contains("main-nav-link"))
//       headerEl.classList.toggle("open-nav");
//   });
// });
// console.log(allLinks);

///////////////////////////////////////////////////////////
// Sticky navigation

/// This in not performance becouse of performance becouse every time we hav to listen scroll
// const intialCord = document.querySelector("#about").getBoundingClientRect();
// console.log(intialCord);

// window.addEventListener("scroll", function () {
//   console.log(window.scrollY);

//   if (window.scrollY >= intialCord) document.body.classList.add("sticky");
//   else if (window.scrollY < intialCord)
//     document.body.classList.remove("sticky");
// });

const sectionHeroEl = document.querySelector(".hero-section");
const headerHeight = headerEl.getBoundingClientRect().height;
// console.log(headerHeight);

const obsCallback = function (entries, observerObj) {
  const ent = entries[0];
  if (ent.isIntersecting === false) {
    document.body.classList.add("sticky");
  }

  if (ent.isIntersecting === true) {
    document.body.classList.remove("sticky");
  }
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
};

const obs = new IntersectionObserver(obsCallback, obsOptions);
obs.observe(sectionHeroEl);

/// REVEAL all sections
const sectionObsCallback = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionObsCallback, {
  root: null,
  threshold: 0.15,
});

const allSections = document.querySelectorAll(".section");
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

// Lazy loading
const allImages = document.querySelectorAll("img[data-src");

const loadLazy = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-image");
  });
  // console.log(imageSrc);
  observer.unobserve(entry.target);
};

const LazyObserver = new IntersectionObserver(loadLazy, {
  root: null,
  threshold: 0,
});

allImages.forEach((img) => {
  LazyObserver.observe(img);
});

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
