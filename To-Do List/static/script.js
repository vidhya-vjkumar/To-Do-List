const addUser = document.getElementById('add-user');
const BtnText = addUser.innerText;
const userText = document.getElementById('username');
const recDisplay = document.getElementById('records');
let userArr = [];
let editId = null;

let obj = localStorage.getItem('users');
if(obj!=null){
    userArr = JSON.parse(obj);
}

DisplayInfo();
userText.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("add-user").click();
    }
});

addUser.onclick=()=>{
    const name = userText.value;
    if(editId!=null){
        userArr.splice(editId,1,{'name':name})
        editId = null;
    } else {
        userArr.push({'name':name});
    }
    SaveInfo(userArr);
    userText.value = '';
    addUser.innerText = BtnText;
}

function SaveInfo(userArr){
    let str = JSON.stringify(userArr);
    localStorage.setItem('users',str);
    DisplayInfo();
}

function DisplayInfo(){
    let statement = '';
    userArr.forEach((user,i) => {
        statement += `<tr>
        <th scope="row">${i+1}</th>
        <td>${user.name}</td>
        <td><i class="btn btn-info mx-2 text-white fa fa-edit" onclick='EditInfo(${i})'></i> <i class="btn btn-danger mx-3 text-white fa fa-trash-o" onclick='DeleteInfo(${i})'></i></td>
        <td></td>
        
      </tr>`;
    });
    recDisplay.innerHTML = statement;
}

function EditInfo(id){
    editId = id;
    userText.value = userArr[id].name;
    addUser.innerText = 'Save Changes';
}

function DeleteInfo(id){
    userArr.splice(id,1);
    SaveInfo(userArr);
}

const allTr = document.querySelectorAll('#records tr');
const searchField = document.querySelector('#search');
searchField.addEventListener("input", function(event) {
    const searchStr = event.target.value.toLowerCase();
    recDisplay.innerHTML = '';
    allTr.forEach(tr=>{
        const tds = tr.querySelectorAll('td');
        if(tds[0].innerText.toLowerCase().indexOf(searchStr)>-1){
            recDisplay.appendChild(tr);
        }
    });
    if(recDisplay.innerHTML == ''){
        recDisplay.innerHTML = 'No records found';
    }
});