const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const numberInput = document.querySelector('#num');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

window.addEventListener('DOMContentLoaded', loadSavedUsers);
// Listen for form submit
myForm.addEventListener('submit', onSubmit);
userList.addEventListener('click', removeItem);
userList.addEventListener('click',useraction);



function loadSavedUsers(){
  axios.get("https://crudcrud.com/api/2295a56be11641e29f70cc6df6f35cea/appointmentData")
  .then((response)=>{
    console.log(response);
    for(var i=0;i<response.data.length;i++){
      createUserListItem(response.data[i])
    }
  })
  .catch((err)=>{
    console.log(err);
  })
}


function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === '' || emailInput.value === '' || numberInput.value === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    setTimeout(() => msg.remove(), 3000);
  } else {
    const user = {
      name: nameInput.value,
      email: emailInput.value,
      phone: numberInput.value
    };

    // Retrieve existing users from local storage or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user object to the array
    users.push(user);

    // Update the users array in local storage
   // localStorage.setItem('users', JSON.stringify(users));
   axios.post("https://crudcrud.com/api/2295a56be11641e29f70cc6df6f35cea/appointmentData",user)
  .then((response)=>{
    console.log(response);
  })
  .catch((err)=>{
    console.log(err);
  })
   
 
  }

   createUserListItem(user);

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
    numberInput.value = '';
  }


function createUserListItem(user){
  
    // Create new list item with user
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${user.name}: ${user.email}: ${user.phone}`));
    userList.appendChild(li);
//create delete button
    const delbtn = document.createElement('button');
    delbtn.className = 'deletebtn';
    delbtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(delbtn);
 //create edit button
    const editbtn=document.createElement('button');
   editbtn.className='editbtn';
   editbtn.appendChild(document.createTextNode('Edit'));
   li.appendChild(editbtn);
}

function removeItem(e) {
  if (e.target.classList.contains('deletebtn')) {
    if (confirm('Are you sure you want to delete this user?')) {
      const li = e.target.parentElement;
      const userList = li.parentElement;
      userList.removeChild(li);

      // Remove from local storage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = Array.from(userList.children).indexOf(li);
      users.splice(userIndex, 1);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
}

function useraction(e){
  if (e.target.classList.contains('editbtn')) {
    const li = e.target.parentElement;
    const name = li.firstChild.textContent.split(': ')[0];
    const email = li.firstChild.textContent.split(': ')[1];
    const phone = li.firstChild.textContent.split(': ')[2];

    // Set the values in the form for editing
    nameInput.value = name;
    emailInput.value = email;
    numberInput.value = phone;

    // Remove the edited user from the list and local storage
    li.parentElement.removeChild(li);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = Array.from(userList.children).indexOf(li);
    users.splice(userIndex, 1);
    localStorage.setItem('users', JSON.stringify(users));
  }
}




