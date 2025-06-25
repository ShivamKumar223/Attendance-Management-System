let express = require("express");
let path =require("path");
let {Client} = require("pg");
let fs = require("fs");
let {JSDOM}=require("jsdom");

let client = new Client({
    host:"localhost",
    user: "postgres",
    port:5432,
   password:"Aadiyogi@123",
    database:"signup"
})

client.connect().then(()=>console.log("Database connection Successfully")).catch((err)=>("Database Error : ",err));



let app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "front_end")));
app.use(express.static(path.join(__dirname, "attendance")));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "front_end", "index.html"));
});

app.post("/signup",(req,res)=>{
    let {Fname,Lname,email,pass1,pass2} = req.body;
    // console.log(req.body);
    if(Fname == "" || Lname == "" || email == "" || pass1 == "" || pass2 == "" || pass1 != pass2){
        res.send(`<script> window.location.href="signup.html";</script>`);
    }
    else{
    let query = 'INSERT INTO public.signup("Fname", "Lname", "Email", "Password") VALUES ($1, $2, $3, $4)';
    let values = [Fname,Lname,email,pass1];
    client.query(query,values,(err)=>{
        if(err)
        {
            console.log("An error occurs in insertion : ",err);
        }
        else{
            console.log("Insertion successfully");
            res.sendFile(path.join(__dirname,"front_end","login.html"));
        }
    })
}
});

app.get("/login", async (req,res)=> {
    let {email,pass}=req.query;
    // console.log(req.query);
    if(email == "" || pass=="")
        {
           res.send(`<script>alert("You are missing somthing");window.location.href="login.html";</script>`)
        }
        else
        {
  try {
    const result = await client.query('SELECT * FROM public.signup WHERE "Email"=$1',[email]);
    let {Fname,Lname,Email,Password}=result.rows[0];
      if(pass==Password){
   // res.json(result.rows); // Send data as JSON response
   {
    fs.readFile("front_end/dfd1.html","utf8",(err,data)=>{
        if(err)
        {
            console.log("readFile error : ",err);
        }
        else{
              let dom = new JSDOM(data);
              let document = dom.window.document;

              let userName = document.querySelector(".name");
              userName.textContent = Fname+" "+Lname;

             fs.writeFile("front_end/dfd1.html",dom.serialize(),(err)=>{
                if(err)
                {
                    console.log("writeFile error : ",err);
                }
                else
                res.sendFile(path.join(__dirname,"front_end","dfd1.html"));
              });
        }
    });
}

    }
    // console.log(Password);
    else{
        res.send(`<script>alert("Wrong Password ! "); window.location.href="login.html";</script>`);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
        }
});







const candidate = new Client(
    {
        host : "localhost",
        user : "postgres",
        port : 5432,
        password : "Aadiyogi@123",
        database : "candidate"
    }
);

candidate.connect().then(()=>console.log("Connected Successfully")).catch((err)=>console.log("Database connection errror : ",err));

// let app = express();
// app.use(express.urlencoded({extanded:false}));
// app.use(express.static(path.join(__dirname,"attandence")));

app.get("/myClass", async (req, res) => {
    let query = 'SELECT * FROM public.candidate';
    let result = await candidate.query(query);
    let candidates = result.rows;

    const Path = path.join(__dirname, "attendance", "dfd2.html");
    fs.readFile(Path, "utf-8", (err, data) => {
        if (err) {
            console.log("readFile Error : ", err);
        } else {
            let dom = new JSDOM(data);
            const document = dom.window.document;

            const tbody1 = document.querySelector(".tbody1");
            const tbody2 = document.querySelector(".tbody2");

            // Clear previous content inside tbody to avoid duplication
            tbody1.innerHTML = "";
            tbody2.innerHTML = "";

            for (let i = 0; i < candidates.length; i++) {
                let { Candidate_ID, Fname, Lname, Total_Attendance } = candidates[i];

                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");

                td1.textContent = Candidate_ID;
                td2.textContent = `${Fname} ${Lname}`;
                td3.textContent = Total_Attendance;
                // console.log(candidates[i]);

                // Append td elements to tr
                tr.append(td1, td2, td3);

                // Append tr to tbody
                tbody1.append(tr);


                let tr1 = document.createElement("tr");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");
                td4.textContent = Candidate_ID;
                td5.textContent = `${Fname} ${Lname}`;
                tr1.append(td4, td5);
                tbody2.append(tr1);
            }

            // Write updated content back to the file
            fs.writeFile(Path, dom.serialize(), (err) => {
                if (err) {
                    console.log("WriteFile Error", err);
                } else {
                    res.sendFile(Path);
                }
            });
        }
    });
});



app.post("/insert_candidate",async (req,res)=>
{
   const { ID, Fname, Lname} =req.body;
    // console.log(ID)                              
   result= await candidate.query('SELECT "Candidate_ID" FROM public.candidate');
   let IDs = result.rows;
   let i;
   for( i=0; i<IDs.length;i++)
   {
    if(ID==IDs[i].Candidate_ID)
    {  
        break;
    }
    else
    {
        continue;
    }
   }
//    console.log(IDs.length);
//    console.log(i);
 
   if(i>=IDs.length)
    {
    // console.log(req.body);
    const query='INSERT INTO public.candidate("Candidate_ID","Fname","Lname") VALUES($1,$2,$3)';
    const values = [ID,Fname,Lname];
    candidate.query(query,values,(err)=>{
        if(err)
        {
            console.log("An error occored in insertion : ",err);
        }
        else{
           console.log("Insertion Successfully"); 
           const refresh = req.get('Referer');
           res.redirect(refresh);
        }
    });
}
else
    {
    res.send('<script>alert("Waring : This ID is already exist");window.location.href="dfd2.html"</script>');
    }
});



app.get("/delete_candidate",async (req,res)=>
{
  
   const { ID } =req.query;

   result= await candidate.query('SELECT "Candidate_ID" FROM public.candidate');
   let IDs = result.rows;
//    console.log(IDs);                    Its return array of object
   let i;
   for( i = 0; i<IDs.length;i++)
   {
    if(ID==IDs[i].Candidate_ID)
        break;
    else
        continue;
   }


   if(ID=="" || ID==" ")
   {
    res.send(`<script>alert("Warning! : Enter Candidate ID");window.location.href="dfd2.html"</script>`);
   }
   else if(i<IDs.length )
     {
    // console.log(req.body);
    const query='DELETE FROM public.candidate WHERE "Candidate_ID" =$1 ';
    
    candidate.query(query,[ID],(err)=>{
        if(err)
        {
            console.log("An error occored in insertion : ",err);
        }
        else{
           console.log("Deletion Successfully"); 
        //    const refresh = req.get('Referer');
           res.redirect('/myClass');
        }
       
    });
}
 else{
    res.send(`<script>alert("Warning! : This ID is not exist");</script>`);
    
 }
});

app.get("/logout",(req,res)=>
{
    res.redirect('/login.html');
});



app.listen(8000,()=>console.log("server Started"));