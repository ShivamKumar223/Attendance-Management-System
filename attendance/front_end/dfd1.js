let nav1 = document.querySelector(".nav1 img");
console.log(nav1);

let createClass = document.querySelector(".createClass");
console.log(createClass);

nav1.addEventListener('click',()=>{
    createClass.style.transform = "translate(750px)";
    nav1.addEventListener('click',()=>{
        createClass.style.transform = "translate(-750px)";
    })
});

let createButton = document.querySelector(".newClass");
console.log(createButton);
let form1 = document.querySelector(".form1");
console.log(form1);
let close = document.querySelector(".close");
console.log(close);
createButton.addEventListener('click',()=>{
    form1.style.display = "flex";
        close.addEventListener('click',()=>{
        form1.style.display = "none";
     })
});

let titles = document.querySelector(".titles");
console.log(titles);
let submit= document.querySelector(".submit");
console.log(submit);
let title= document.querySelector("#title");
console.log(title);

submit.addEventListener('click',()=>{
    if(title.value=="" || title.value==" " || title.value=="  "){
            alert("Warning : Enter Title")
    }
       else
    {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerText = title.value;
        // a.href= "https://www.google.com";
        li.append(a);
        titles.append(li);
        form1.style.display = "none";
    }
});


