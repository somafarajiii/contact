const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');

var contacts=[]
var cUserId=Math.random();
let isEditMode = false;
var index='';






function addFunction () 
{ 

    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;

 
if (name == "" || email == "" || phone == "") {
  alert ('Pleas fill in all required fields.');
 return  false
}
  
    const contact = {
    name: name,
    email: email, 
    phone: phone,
    owenerId:localStorage.getItem("userId")
  };
  if(localStorage.getItem("contacts")==null)localStorage.setItem("contacts",JSON.stringify([]));
  
var ContactsGet=JSON.parse(localStorage.getItem("contacts")) ;
ContactsGet.push(contact);
var setContact = JSON.stringify(ContactsGet);
localStorage.setItem("contacts",setContact);
displayContact();
document.getElementById("form").reset();


}


  function displayContact() {
    var contactList = document.getElementById("contactList");

    contactList.innerHTML = ""; 
    var contactss = JSON.parse(localStorage.getItem('contacts'));

    for (var i =0; i < contactss.filter(obj=>obj.owenerId==localStorage.getItem("userId")).length; i++) {
      
         var contact = contactss.filter(obj=>obj.owenerId==localStorage.getItem("userId"))[i];
         var li = document.createElement("li")
        li.innerHTML= "Name: " + contact.name + ", Email: " + contact.email + ", phone: " + contact.phone;
        var button = document.createElement("button");
        var button2 = document.createElement("button"); 
        button.dataset.id=i;
        button.value=i;
        button2.value=i;
        button.innerText="delete";
        button2.innerText="edit";
        li.appendChild(button);
        li.appendChild(button2);
        button.addEventListener('click',contactDelete);
        document.getElementById("contactList").appendChild(li);
        button2.addEventListener('click',editItem);
        document.getElementById("contactList").appendChild(li);
        document.getElementById("save").style.visibility = 'hidden';

    }
};




// // function changeText(){
// //   var button2 = document.getElementById("edit").addEventListener('onclick',changeText());
// //   // var addButton = document.getElementById('add-button');
// //   // addButton.innerHTML = "save";
// //   // onclick = 'changeText()'(li)
// //   var button = document.getElementById("add_button");
// //   button.innerHTML = 'save'

  
// }

function editItem(e){

  const contactToEdit =
  JSON.parse(localStorage.getItem("contacts"))[e.target.value];
  index = e.target.value
  mmm=contactToEdit;
    const name =
    contactToEdit.name;
    const phone =
    contactToEdit.phone;
    const email =
    contactToEdit.email;
    document.getElementById('name').value = name;
    document.getElementById('phone').value = phone;
    document.getElementById('email').value = email;
    document.getElementById("add-button").style.visibility = 'hidden';
    document.getElementById("save").style.visibility = 'visible';
    
}
  function saveContact(){
 var contacts = JSON.parse(localStorage.getItem("contacts"))
 contacts[index].name  =  document.getElementById("name").value;
 contacts[index].phone = document.getElementById("phone").value;
 contacts[index].email = document.getElementById("email").value;

 document.getElementById("add-button").style.visibility = 'visible';

 localStorage.setItem("contacts",JSON.stringify(contacts));
    document.getElementById("form").reset();
    displayContact();
  }

function contactDelete(e) {
  const contactID = e.target.dataset.id;
  var GetDelete = JSON.parse(localStorage.getItem("contacts"));
  GetDelete.splice(contactID,1);
  localStorage.setItem("contacts",JSON.stringify(GetDelete))
  displayContact();

}

// function saveContact(){
    
//  contacts[index].name = document.getElementById("name").value;
//   contacts[index].phone = document.getElementById("phone").value;
//   contacts[index].email = document.getElementById("email").value;
//       displayContact();
//       document.getElementById("form").reset();
//     }

  
 function searchContacts(){

   const contacts = JSON.parse(localStorage.getItem("contacts"))//localStorage.getItem("searchTerm");
  // localStorage.setItem("searchTerm", "contactFilter");
  var searchInput = document.getElementById("search");
  const searchTerm = searchInput.value.toLowerCase();
  const contactFilter = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm) ||
    contact.phone.toLowerCase().includes(searchTerm));
    document.getElementById("save").style.visibility = 'hidden';
    
  displaySearchContact(contactFilter);

 }

 function displaySearchContact( filterContactList){
  
  var contactList = document.getElementById("contactList");
  contactList.innerHTML = ""; 

  // for (var i = 0; i < filterContactList.length; i++) {
  //     var contact = filterContactList[i];
  //     var listItem = document.createElement("li");
  //     listItem.textContent = "Name: " + contact.name + ", Email: " + contact.email + ", phone: " + contact.phone;
  //     // displaySearchContact( filterContactList)
  //     displayContact(filterContactList );
  //}
  var contactss = filterContactList;
  for (var i =0; i < contactss.filter(obj=>obj.owenerId==localStorage.getItem("userId")).length; i++) {
      
    var contact = contactss.filter(obj=>obj.owenerId==localStorage.getItem("userId"))[i];
    var li = document.createElement("li")
   li.innerHTML= "Name: " + contact.name + ", Email: " + contact.email + ", phone: " + contact.phone;
   var button = document.createElement("button");
   var button2 = document.createElement("button"); 
   button.dataset.id=i;
   button.value=i;
   button2.value=i;
   button.innerText="delete";
   button2.innerText="edit";
   li.appendChild(button);
   li.appendChild(button2);
   button.addEventListener('click',contactDelete);
   document.getElementById("contactList").appendChild(li);
   button2.addEventListener('click',editItem);
   document.getElementById("contactList").appendChild(li);

}


 }

var users = [
  
    {id:1, name:'soma', pass:'1234'},
    {id:2, name:'nima', pass: "5678"},
    {id:3, name:'erfan', pass: "1010"},
];

function checkUser(){
username=document.getElementById("user").value
password=document.getElementById("pass").value


for (let index = 0; index < users.length; index++) {
  if (users[index].name==username && users[index].pass==password) {
   return users[index].id;
 }
  
}
return null;
}

function myFunction(){
  // validate : prevent submit empty fields

  var user= document.getElementById("user").value;
  var pass = document.getElementById("pass").value;
 

  
  if (user == "" ) {
    alert ('Pleas fill UserName.');
   return true
  }
    if (pass == "") {
      alert ('Pleas fill in Password.');
      return true
    }

  var result =checkUser()
   if (result == null) {

 alert ('invalid info') }

 else {
   localStorage.setItem("userId",result);
  //  alert ('welcome') 
  location.replace("./my-contactlist.html")
 }
 
} 

  $(document).ready(function () {
    document.getElementById("save").style.visibility = 'hidden';
    displayContact();
  });

function backLogin(){

  var users = [ userId = null]
  location.replace("./index html.html")
document.removeEventListener(li);

}
