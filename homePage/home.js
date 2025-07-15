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

  const minus1 = document.getElementById("minus1");
  const signupBox = document.getElementById("box2");

  minus1.addEventListener("click",()=>{
    signupBox.style.display = "flex";
  })

  const registerAnchorTag = document.getElementById("registerAnchorTag");

  registerAnchorTag.addEventListener("click",()=>{
    signupBox.style.display="flex";
  })