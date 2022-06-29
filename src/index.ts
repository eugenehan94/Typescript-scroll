// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
// select span
const date = document.getElementById("date") as HTMLTimeElement;
const currentYear: number = new Date().getFullYear();
const currentYearString: string = currentYear.toString()
date!.innerHTML = currentYearString;

// ********** close links ************
const navToggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
const linksContainer = document.querySelector<HTMLElement>(".links-container");
const links = document.querySelector<HTMLUListElement>(".links");

navToggle?.addEventListener("click", () => {

  const linksHeight: number | undefined = links?.getBoundingClientRect().height;
  const containerHeight: number | undefined = linksContainer?.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer!.style.height = `${linksHeight}px`;
  } else {
    linksContainer!.style.height = "0";
  }

});

// ********** fixed navbar ************

const navbar = document.getElementById("nav") as HTMLElement;
const topLink = document.querySelector<HTMLAnchorElement>(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight: number = window.pageYOffset;
  const navHeight: number = navbar!.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar?.classList.add("fixed-nav");
  } else {
    navbar?.classList.remove("fixed-nav");
  }
  // setup back to top link

  if (scrollHeight > 500) {

    topLink?.classList.add("show-link");
  } else {
    topLink?.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll<HTMLAnchorElement>(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const target = e.currentTarget as HTMLAnchorElement
    const id = target!.getAttribute("href")!.slice(1);
    const element = document.getElementById(id);

    const navHeight: number = navbar!.getBoundingClientRect().height;
    const containerHeight: number = linksContainer!.getBoundingClientRect().height;
    const fixedNav: boolean = navbar?.classList.contains("fixed-nav");
    let position: number = element!.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close
    linksContainer!.style.height = "0";
  });
});
// calculate heights
export {}
