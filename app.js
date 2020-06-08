const app = document.querySelector(".app");

let enterstate="signin";
let users;
if(users){
 users = JSON.parse(localStorage.getItem("users"));
}else{
    users=null;
}




const showform=()=>{
   document.querySelector(".form").classList.add('appear');

}



function getapp(){
    document.querySelector(".form").parentNode.removeChild(document.querySelector(".form"));
   
    app.innerHTML="<h1> hola jeje</h1>"
}

setTimeout(()=>{
        const presen = document.querySelector(".presentation")
        presen.classList.add("byepresentation");
        showform();
        presen.addEventListener("transitionend",()=>{
            console.log(presen)
            presen.remove();

            
        })
},5000)

function signin(){
    
}

function signintoggle(){
    console.log("izq ");

    document.querySelector(".color-selection").classList.add("left");
    document.querySelector(".color-selection").classList.remove("right");

    document.querySelectorAll(".change-selection")[1].classList.remove("selected");
    document.querySelectorAll(".change-selection")[0].classList.add("selected");
    document.querySelector(".form-content").classList.add("form-signin");
    document.querySelector(".form-content").classList.remove("form-signup");
    document.querySelector(".form-content").classList.remove("form-init");


}
function signuptoggle(){
    
    console.log("der ");

    document.querySelector(".color-selection").classList.add("right");
    document.querySelector(".color-selection").classList.remove("left");

    document.querySelectorAll(".change-selection")[0].classList.remove("selected");
    document.querySelectorAll(".change-selection")[1].classList.add("selected");
    console.log("der terminado");
    document.querySelector(".form-content").classList.remove("form-signin");
    document.querySelector(".form-content").classList.add("form-signup");
    
}

document.querySelector(".actionbutton").addEventListener("click",()=>{

    
  
    const username = document.querySelector('#userin').value;
    const userpass = document.querySelector('#passwordin').value;
    const remember = document.querySelector('#rememberp').checked;
    if(users){
                users.forEach(user => {
                    
                    if(user.username === username && user.password === userpass){
                        return getapp();
                    }
                });
         }else{
             alert("There are no users registered")
         }
    })
 document.querySelector(".actionregister").addEventListener("click",()=>{
    const username = document.querySelector('#userup').value;
    const password = document.querySelector('#passup').value;
    const confirm = document.querySelector(".password2").value;
   
    let exists=0;

    const newUser= {
        username,
        password,
        homeworks:[],
        notes:[]
    }

    if(password!=confirm){
        return alert("Passwords don't match")
    }

    if(users !=null){

        users.forEach(user => {
            
            if(user.username === username){
                exists=1;
                return alert("The user already exists")
                
            }
        });
        if(exists===0){
             users.push(newUser);
           
        }
       

    }else{
        
        if(exists===0){
            localStorage.setItem('users',JSON.stringify([
                newUser
            ]));
            console.log(users)
            
            
        }
        
    }
    getapp();
        
        
        
        
})
    