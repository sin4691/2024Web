
var slides = document.querySelector('.slides'),
  slide = document.querySelectorAll('.slides li'),
  currentIdx = 0,
  slideCount = slide.length,
  slideWidth = 300,
  slideMargin = 30,
  prevBtn = document.querySelector('.prev'),
  nextBtn = document.querySelector('.next');

slides.style.width =
  (slideWidth + slideMargin) * slideCount - slideMargin + 'px';

function moveSlide(num) {
  if (num < slideCount - 3) {
    slides.style.left = -num * (slideWidth + slideMargin) + 'px';
    currentIdx = num;
  } else {
    // 마지막 사진이 보이면 슬라이드 이동을 막음
    slides.style.left = -(slideCount - 3) * (slideWidth + slideMargin) + 'px';
    currentIdx = slideCount - 3;
  }
}

nextBtn.addEventListener('click', function () {
  if (currentIdx < slideCount - 3) {
    moveSlide(currentIdx + 1);
  } else {
    // 마지막 사진이 보이면 추가 이동을 막음
    moveSlide(slideCount - 3);
  }
});

prevBtn.addEventListener('click', function () {
  if (currentIdx > 0) {
    moveSlide(currentIdx - 1);
  } else {
    // 첫 번째 사진에서 추가 이동을 막음
    moveSlide(0);
  }
});


//=================================================================
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed");
  includeHTML();
});

function includeHTML() {
  var elements = document.querySelectorAll('[include-html]');
  console.log("Elements to include HTML:", elements);
  elements.forEach(function(elmnt) {
    var file = elmnt.getAttribute("include-html");
    console.log("Loading file:", file);
    if (file) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            console.log("File loaded successfully:", file);
            elmnt.innerHTML = this.responseText;
          }
          if (this.status === 404) {
            console.log("File not found:", file);
            elmnt.innerHTML = "Page not found.";
          }
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
    }
  });
}
//=================================
