let count = 0;
let myData = [];

function handleOnLoad(){
        let response = fetch('http://localhost:5050/swagger/index.html');
        let apidata = response.json();
        let dataList = apidata.results;
        myData = dataList;
        let html=`
        <div id="tableBody"></div><br>
         <form onsubmit="return false">
            <label for"name">Movie Name:</label><br>
            <input type="text" id="name" name="name"><br>
            <label for"rating">Rating:</label><br>
            <input type="text" id="rating" name="rating"><br>
            <label for"date">Date Released:</label><br>
            <input type="text" id="date" name="date"><br>
        <br>
        <button onclick="handleDataAdd()" class="btn btn-success">Submit</button>
        </form>`
document.getElementById('app').innerHTML=html;
sortTable();
populateTable();
}


function populateTable(){
    let html=`
    <h2>Movie List</h2>
    <table class="table table-striped">
        <tr>
            <th>Movie Name</th>
            <th>Movie Rating</th>
            <th>Date Released (MM/DD/YYYY)</th>
            <th>Delete</th>
            <th>Pin</th>
        </tr>
        `;
    myData.forEach(function(data){
        let pin = "";
        if(data.pinned == true) {
            pin = "✅";
        }
        else{
            pin="❌"
        }
        html= html +`
        <tr>
         <td>${data.Activity}</td>
         <td>${data.Distance}</td>
         <td>${data.Day}</td>
         <td><button onclick="handleDataDelete('${data.ExerciseID}')" class="btn btn-danger">Delete</button></td>
         <td><button onclick="handleDataPin('${data.ExerciseID}')">${pin}</button></td>
        </tr>`
    })
    html= html +`</table>`;
    document.getElementById('tableBody').innerHTML = html;
}

function handleDataAdd(){
    let data = {activity: document.getElementById('activity').value,
        distance: document.getElementById('distance').value,
        day: document.getElementById('day').value,
        Pinned: false};

    var thing = new XMLHttpRequest();
    thing.open("POST","http://localhost:5078/api/exercise", true);
    thing.setRequestHeader('Content-Type', 'application/json');
    console.log(data);
    thing.send(JSON.stringify(data));
    populateTable();
}


function handleDataDelete(number){
    console.log('You called me?', number);
    myData = myData.filter(data => data.ExerciseID != number);
    localStorage.setItem('myData', JSON.stringify(myData));
    populateTable();
}

function handleDataPin(id){
    for(let i = 0; i < myData.length; i++){
        if(myData[i].ExerciseID = id){
            myData[i].pinned = !myData[i].pinned
        }
    }
    console.log('You called me?', id);
localStorage.setItem('myData',JSON.stringify(myData));
populateTable();
}

function sortTable(){

}