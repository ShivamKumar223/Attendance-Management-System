const body = document.querySelector("body");
const table_container = document.querySelector(".table-container");
const Check_attandence = document.querySelector(".CA");
console.log(table_container);

Check_attandence.addEventListener("click",()=>{
    table_container.style.transform = "translate(560px)";

    Check_attandence.addEventListener("click",()=>{
        table_container.style.transform = "translate(-560px)";
    });
});


const table_container2 = document.querySelector(".table-container2");
const Check_attandence2 = document.querySelector(".AC");
// console.log(table_container2);

Check_attandence2.addEventListener("click",()=>{
    table_container2.style.transform = "translate(560px)";

    Check_attandence2.addEventListener("click",()=>{
        table_container2.style.transform = "translate(-560px)";
    });
});


const AddCandidate = document.querySelector(".Add-candidate");  //To add candidate
const AddButton = document.querySelector(".Button1");
// console.log(AddCandidate);
// console.log(AddButton);

AddButton.addEventListener("click",()=>{
    AddCandidate.style.display = "flex";

    body.addEventListener("dblclick",()=>{
        AddCandidate.style.display = "none";
    })
});


//  let input1 = document.querySelectorAll(".input1");
//  const submit1 = document.querySelector(".submit1");
//  console.log(submit1);

//  submit1.addEventListener("click",()=>{
//     if(input1[0]== "" || input1[1]== "")
//     {
//         alert("Warning! : Missing somthing");
       
//     }
//     console.log("Hello");
//  });



const removeCandidate = document.querySelector(".remove-candidate");  //To add candidate
const removeButton = document.querySelector("#remove1");

console.log(removeCandidate);
console.log(removeButton);
removeButton.addEventListener("click",()=>{
    removeCandidate.style.display = "flex";

    body.addEventListener("dblclick",()=>{
        removeCandidate.style.display = "none";
    })
});
