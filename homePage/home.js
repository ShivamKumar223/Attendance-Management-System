const menuBox = document.getElementsByClassName("menuBox");
const menu = document.getElementsByClassName("menu");

//console.log(menuBox);

  let movedRight = false; // track state

  menu[0].addEventListener("click", () => {
    if (movedRight) {
      menuBox[0].style.transform = "translateX(0px)";     // Move back to left
    } else {
      menuBox[0].style.transform = "translateX(210px)";   // Move to right
    }
    movedRight = !movedRight; // toggle the state
  });
