//data
const skills = [
    "HTML", 
    "CSS",
    "Javascript",
    "Typescript",
    "React",
    "JSX",
    "TailWindCSS",
    "MaterialUI",
    "Redux",
    "NodeJS",
    "MongoDB",
    "AWS",
    "SQL",
    "GITHUB"
];

//my github url
const githubUrl = "https://api.github.com/users/sami12389/repos"

//variables
const submitBtn = document.querySelector(".btnSubmit")
const bars = document.querySelector(".bars");
const navContainer = document.querySelector(".navContainer");
const navList = document.querySelectorAll(".navList")
const skillsContainer = document.querySelector(".skillsContainer");
const form = document.querySelector(".footerForm");
const name = document.querySelector(".inputName");
const email = document.querySelector(".inputEmail");
const text = document.querySelector(".inputText");
const submit = document.querySelector(".btnSubmit");
const messageList =  document.querySelector(".messageList");
const messageContainer =  document.querySelector(".messageContainer");
const copyright = document.querySelector(".copyright");
const projectCardContainer = document.querySelector(".projectCardContainer");
//event listeners
window.addEventListener("DOMContentLoaded", displaySkills)
window.addEventListener("DOMContentLoaded", showCopyright)
window.addEventListener("DOMContentLoaded", showProjectRepo)
bars.addEventListener("click", showMenu)
form.addEventListener("submit", submitMessage);



//functions
function showMenu(){
   navContainer.classList.toggle("showNavList");
   navList.forEach(function(item){
    item.addEventListener("click", function(){
        navContainer.classList.remove("showNavList");
    })
   })
   if(navList.classList.contains("showNavList")){
    bars.classList.add("removeBars")
   }
}


function displaySkills(){
    skills.map((skill)=>{
    let skillList = document.createElement("li");
    skillList.classList.add("skill")
    skillList.innerText = skill;
    skillsContainer.append(skillList)
    })
}


//fetch repos from Github
async function showProjectRepo(){
   await fetch(githubUrl)
  .then((response)=>response.json())
    .then((responseJSON)=>{
        responseJSON.map((projectItem)=>{
        let projectList = document.createElement("a")
        const attr = document.createAttribute("href");
        attr.value = projectItem.html_url
        projectList.setAttributeNode(attr);
        projectList.classList.add("projectItem")
        projectList.innerText = projectItem.name;
        projectCardContainer.appendChild(projectList);
        })
    })
}


function submitMessage(e){
    e.preventDefault();
    if(name.value !== "" && email.value !== "" && text.value !== ""){
    const messageSection = document.createElement("section")
    const messageId = new Date().getTime().toString();
    const attr = document.createAttribute("data-id");
    attr.value = messageId;
    messageSection.setAttributeNode(attr);
    messageSection.classList.add("messageSection");
    messageSection.innerHTML = `
    <div class = "mainMessageContainer">
    <div class = "messageSection">
    <h2>${name.value}</h2>
    <a href = "mailto: ${email.value}">${email.value}</a>
    <p>${text.value}</p>
    </div>
    <div class = "btnContainer">
     <button type = "button" class = "remove">Remove</button>
    <button type = "button" class = "edit">Edit</button>
    </div>
    </div>
    `
    messageList.append(messageSection);
    const removeMessage = messageSection.querySelector(".remove")
    const editMessage = messageSection.querySelector(".edit");
    editMessage.addEventListener("click", editFunction); 
    removeMessage.addEventListener("click", removeItem);
    setBackToDefault()
    alert("Message Sent!")
    }else if(name.value == "" || email.value == "" || text.value == ""){
        alert("Missing fields, please fill out missing information.")
        setBackToDefault();
    }
   
}


function setBackToDefault(){
    name.value = "";
    email.value = "";
    text.value = "";
    editFlag = false;
}

function editFunction(e){
    const item = e.currentTarget.parentElement.parentElement;
    console.log(item);
    const itemName = item.firstElementChild.firstElementChild;
    const itemMessage = item.firstElementChild.lastElementChild;
    name.value = itemName.innerText;
    text.value = itemMessage.innerText;
}


function removeItem(e){
   const item = e.currentTarget.parentElement;
   messageList.removeChild(item);
}



function showCopyright(){
    const todayDate = new Date().getFullYear()
    copyright.classList.add("copyright")
    copyright.innerText = `Samson Lemma | ${todayDate}`
}