/* FADE ANIMATION */

const observer = new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0px)";

}

});

},{threshold:0.2});

const elements=document.querySelectorAll(
'.card,.skill,.project,.contact-card'
);

elements.forEach((el)=>{

el.style.opacity="0";
el.style.transform="translateY(40px)";
el.style.transition="all .8s ease";

observer.observe(el);

});

/* ACTIVE NAV */

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop;

if(pageYOffset >= sectionTop - 200){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.style.color="white";

if(link.getAttribute("href")==="#" + current){

link.style.color="#00d9ff";

}

});
