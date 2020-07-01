const app = document.querySelector(".app");
let activeuser='';
let notesuser =[];
let homeworkuser =[];
let users;
let allnotes = JSON.parse(localStorage.getItem('notes')) || [];


// ALL THE USERS ARE OBTAINED FROM TE LOCAL STORAGE
if(localStorage.getItem("users")){
    users = JSON.parse(localStorage.getItem("users"));
   }else{
       //IF THE LOCAL STORAGE IS EMPTY, USERS WOULD BE NULL
       users=null;
   }
   
const getallnotes=()=>{
    allnotes = JSON.parse(localStorage.getItem('notes')) || [];
    getusernotes();
    
    

}

const retnote = (notetext)=>{

            let note = ` <div class="note-content">
            
            <span class="text">
            ${notetext}
            </span>
            <div class="trash">X</div>

        </div>`
       
        return note

}




const chargenotes=() =>{

    notesuser.forEach(note=>{
        let notehtml = retnote(note.note);
        let divnote = document.createElement('div');
        divnote.innerHTML = notehtml
        divnote.classList.add("note")
        
        document.querySelector(".right-content").appendChild(divnote);
    
       })
      

}
const rendernotes = ()=>{

const myNode = document.querySelector(".right-content");
console.log(myNode);
  while (myNode.childNodes[0]) {
    myNode.removeChild(myNode.lastChild);
  }

   notesuser.forEach(note=>{
    let notehtml = retnote(note.note);
    let divnote = document.createElement('div');
    divnote.innerHTML = notehtml
    divnote.classList.add("note")

    divnote.addEventListener('click', (e)=>{
        allnotes.splice(e.target.parentNode.children[0].innerText, 1)
        localStorage.setItem('notes', JSON.stringify(allnotes))
        e.target.parentNode.parentNode.remove();
        getallnotes();
      
    })
    
    document.querySelector(".right-content").appendChild(divnote);
   })
   


}

const getusernotes = ()=>{
    notesuser=[];
    if (allnotes){
        allnotes.forEach(note=>{
            if(note.user === activeuser){
                notesuser.push(note);
            }
        })
    }

}

const createnote=()=>{
   
    const a = prompt('What are you thinking?');

    const newNote = {
        note: a,
        user: activeuser
    }


    allnotes.push(newNote);
    console.log(allnotes);
   
    localStorage.setItem('notes', JSON.stringify(allnotes))
    getallnotes();
    rendernotes();

}

function retapp(user){

    activeuser = user.username;
    
   getallnotes();
        
    let appcontent = ` 
         <div class="app-container">


        <div class="leftapp">
            <div class="left-content">
                <div class="user">
                    <h1 class="usertitle">${user.username[0].toUpperCase()}</h1>
                </div>
                <div class="categories">

                    <div class="homework">
                        <img class="homeworkimg" src="https://cdn.onlinewebfonts.com/svg/img_310105.png" alt="texto">
                        <h3> H.W.</h3>
                    </div>

                    <div class="notes">
                        <img class="notesimg" src="https://simpleicon.com/wp-content/uploads/note.png" alt="texto">
                        <h3> Notes</h3>
                    </div>
                </div>
                <div class="logout-container">
                    <h3 onclick="location.reload()"class="logout">Log out</h3>
                </div>
            </div>
        </div>
        <div class="rightapp">
            <img class="add-button" onclick="createnote()"src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/plus-512.png" alt="create" >
            <div class="title">

            </div>
            
            <div class="right-content">


            </div>

        </div>


    </div>`;    


    return appcontent;
}

//ANIMATION TO SHOW THE FORM
const showform=()=>{
   document.querySelector(".form").classList.add('appear');

}
//THIS METHOD IS CALLED WHEN THE SIGN IN OR THE SIGN UP ARE SUCCESFULL
function getapp(user){
    let formc = document.querySelector(".form")
    formc.classList.add('fade');
    formc.classList.remove('appear');


    
    
    formc.addEventListener('animationend',()=>{
        formc.remove();
        app.innerHTML=retapp(user);
    })
    getusernotes();

    setTimeout(()=>{
        rendernotes()
    }
    ,800)
}

//TIMER TO HIDE THE TITLE 
setTimeout(()=>{
        const presen = document.querySelector(".presentation")
        presen.classList.add("byepresentation");
        showform();
        presen.addEventListener("transitionend",()=>{
            console.log(presen)
            presen.remove();

            
        })
},5000)

//ANIMATION TO SLIDE THE FORM TO THE LEFT
function signintoggle(){

    document.querySelector(".color-selection").classList.add("left");
    document.querySelector(".color-selection").classList.remove("right");

    document.querySelectorAll(".change-selection")[1].classList.remove("selected");
    document.querySelectorAll(".change-selection")[0].classList.add("selected");
    document.querySelector(".form-content").classList.add("form-signin");
    document.querySelector(".form-content").classList.remove("form-signup");
    document.querySelector(".form-content").classList.remove("form-init");
}

//ANIMATION TO SLIDE THE FORM TO THE RIGHT
function signuptoggle(){
    

    document.querySelector(".color-selection").classList.add("right");
    document.querySelector(".color-selection").classList.remove("left");

    document.querySelectorAll(".change-selection")[0].classList.remove("selected");
    document.querySelectorAll(".change-selection")[1].classList.add("selected");
    console.log("der terminado");
    document.querySelector(".form-content").classList.remove("form-signin");
    document.querySelector(".form-content").classList.add("form-signup");
    
}
//WITH THIS EVENT YOU COLLECT THE DATA FROM THE INPUTS TO START THE LOGIN PROCESS
document.querySelector(".actionbutton").addEventListener("click",()=>{

    const username = document.querySelector('#userin').value;
    const userpass = document.querySelector('#passwordin').value;
   
    if(users){
        let correct = 0;
                users.forEach(user => {
                    
                    if(user.username === username && user.password === userpass){
                        correct = 1;
                        return getapp(user);
                    }
                });
                correct === 0  && alert("Incorrect or nonexistent user")

         }else{
             return alert("There are no users registered")
         }
    })

    //WITH THIS EVENT YOU COLLECT THE DATA FROM THE SIGN UP INPUTS TO START THE SIGN UP PROCESS
 document.querySelector(".actionregister").addEventListener("click",()=>{
    const username = document.querySelector('#userup').value;
    const password = document.querySelector('#passup').value;
    const confirm = document.querySelector(".password2").value;
   
    let exists=0;

    const newUser= {
        username,
        password,
    }

    if(password!=confirm){
        return alert("Passwords don't match")
    }

    if(users!=null){
        users.forEach(user => {        
            if(user.username === username){
                exists=1;
                return alert("The user already exists")
                
            }
        });
        if(exists===0){
             users.push(newUser);
             localStorage.setItem("users",JSON.stringify(users))
           
        }
    }else{
        
       
            localStorage.setItem('users',JSON.stringify([
                newUser
            ]));
            console.log(users)   
        
    }

    getapp(newUser);  
})
    












