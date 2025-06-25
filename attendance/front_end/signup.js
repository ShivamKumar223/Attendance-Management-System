let fname = document.querySelector(".fname");
let lname = document.querySelector(".lname");
let pass = document.querySelectorAll(".pass");
let signup = document.querySelector(".signup");
console.log(pass);

signup.addEventListener("click",()=>{
    if(fname.value=="" || lname.value=="" || pass[0]=="" || pass[1]=="")
    {
        alert("Yoy are missing something");
    }
    else if(pass[0].value != pass[1].value)
    {
        alert("Warning : Check password !")
    }
});