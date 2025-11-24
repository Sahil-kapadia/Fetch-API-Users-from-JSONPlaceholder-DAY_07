const API_URL = 'https://jsonplaceholder.typicode.com/users';

const reloadbtn =document.getElementById('reloadbtn');
const usersContainer =document.getElementById('users');
const statusURL =document.getElementById('status');
const errorBox =document.getElementById('error');

//Fectch User Data
async function fetchUsers() {
    usersContainer.innerHTML = '';
    errorBox.style.display = 'none';
    setStatus("Fetching Users...");
    setLoading(true);

    try{
        if(!navigator.onLine) throw new Error("You Are Offline!!!");

        const response = await fetch(API_URL);
        if(!response.ok){
            throw new Error("HTTP Error:" +response.status)
        }

        const users = await response.json();
        renderUsers(users);
        setStatus(`Loaded${users.length} users.`);
    }catch(err){
        showError(err.message);
        setStatus("Failed to Load Users.");
    }finally{
        setLoading(false);
    }
}

//Display
function renderUsers(users){
    usersContainer.innerHTML = users.map(user=>{
        const address = `${user.address.suite},${user.address.street},${user.address.city}`;
        return`
        <div class = "user">
        <h3>${user.name}</h3>
        <div class = "meta" >${user.email}</div>
        <div class = "address">${address}</div>
        </div>
        `;
    }).join('');
}

function setStatus(message){
    statusURL.textContent = message;
}

function showError(message){
    errorBox.style.display = "block";
    errorBox.textContent = message;
}

function setLoading(isLoading){
    if(isLoading){
        reloadbtn.disabled = true;
        reloadbtn.textContent = "Loading...";
    }else{
        reloadbtn.disabled = false;
        reloadbtn.textContent = "Reload";
    }
}

reloadbtn.addEventListener("click",fetchUsers);

window.addEventListener("load",fetchUsers);

