// global variables
var elementtobeedited;
var indexOfTodoValue;
var todos = [];

var leftPane = document.createElement('div');
leftPane.setAttribute('id','left-div');
var rightPane = document.createElement('div');
rightPane.setAttribute('id','right-div');

document.body.appendChild(leftPane);
document.body.appendChild(rightPane);

var rightDivId = document.getElementById('right-div');                 
var leftDivId = document.getElementById('left-div');                

// text area
var textArea = document.createElement('textarea');
//




function rightDivText(){

    textArea.style.height = "20vh";   textArea.style.width = "25vw";   textArea.setAttribute('placeholder','Press Enter to add tasks');

    rightDivId.appendChild(textArea);
}


function leftDivText(){
    // heading
    
    var heading = document.createElement('h1');      heading.style.position = "relative";     heading.style.padding = "20px";    heading.style.fontFamily = "sans-serif";
    var headingText = document.createTextNode('Task List');     
    heading.appendChild(headingText);

    //paragraph
    var paragraph = document.createElement('p');      paragraph.style.position = "relative";     paragraph.style.padding = "0 0 0 20px";    paragraph.style.fontFamily = "sans-serif"; 
    paragraph.setAttribute('id','my-para');
    var paragraphText = document.createTextNode('Add tasks to your list by typing to the right and pressing enter. You may then view the pending tasks below.');
    paragraph.appendChild(paragraphText);

    // appending heading and paragraph 
    leftDivId.appendChild(heading); 
    leftDivId.appendChild(paragraph);
}

var flagForEdit = true;         

function textAreaFunctionality(){
    textArea.addEventListener( 'keyup',function (event){
        if( !(window.event.keyCode === 32 )){
            if( window.event.keyCode === 13 ){
                if( textArea.value.trim()!=="" ){                   
                    if( flagForEdit!==false ){
                    addTaskToLeftDiv(textArea.value);
                    textArea.value = "";                            
                    }
                }
            }
        }  
        });
    }


function addTaskToLeftDiv( textArea_value ){
    
    todos.push(textArea_value);

    localStorage.setItem("fullTasks", JSON.stringify( todos ) );

    var tasksDiv = document.createElement('div');
    tasksDiv.setAttribute('class','task-div');

    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.setAttribute('id','my-checkbox');

    var icons1 = document.createElement('i');
    icons1.setAttribute('class','far fa-edit');       // font-awesome icons

    var icons2 = document.createElement('i');
    icons2.setAttribute('class','far fa-trash-alt');

    var par = document.createElement('p');
    par.setAttribute('id','par');
    par.innerHTML = textArea_value;

    tasksDiv.appendChild(par);              
    tasksDiv.appendChild(checkbox);           
    tasksDiv.appendChild(icons1);
    tasksDiv.appendChild(icons2);

    leftDivId.appendChild(tasksDiv);


    checkbox.addEventListener('click', function(){             
       if(checkbox.checked){                                   
        par.style.textDecoration = "line-through yellow";
        }
        else{                                                  
            par.style.textDecoration = "none";
        }

    });


    var getTaskDiv = document.getElementsByClassName('task-div');

    icons1.addEventListener('click', function(event){           // edit a task

        flagForEdit = false;
        textArea.value = par.innerText;
        textArea.focus();

        var indexOfClickedTaskDiv = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);

        indexOfTodoValue = indexOfClickedTaskDiv-2;

        for(let i = 0; i<getTaskDiv.length; i++ ){
            
            var indexOfCurrentTaskDiv = Array.from(this.parentElement.parentElement.children).indexOf(this.parentElement.parentElement.children[i+2]);

            var currentTaskDiv = event.target.parentElement.children[2];

            if( indexOfCurrentTaskDiv === indexOfClickedTaskDiv ){
                elementtobeedited = currentTaskDiv.parentElement;
            }

        }
    })
    

    textArea.addEventListener( 'keyup',function (event){            // this listener is for edit a task
        if( !(window.event.keyCode === 32 )){
            if( window.event.keyCode === 13 ){
                if( textArea.value.trim()!=="" ){ 
                    elementtobeedited.children[0].innerHTML = event.target.value;   
                    todos[indexOfTodoValue] = event.target.value;
                    localStorage.setItem("fullTasks", JSON.stringify( todos ) );
                    // console.log(JSON.stringify(todos));
                    }
                    textArea.value = "";
                    flagForEdit = true;                            
                    }
                }
            })


    icons2.addEventListener('click', function(event){               // delete a task
        var indexToBeDeleted = Array.from(event.target.parentElement.parentElement.children).indexOf(icons2.parentElement)-2;
        todos.splice( indexToBeDeleted,1 );         
        icons2.parentElement.remove();
        localStorage.setItem("fullTasks", JSON.stringify( todos ) );
    });

}



rightDivText();
leftDivText();
textAreaFunctionality();

window.addEventListener('load',function(event){

    localStr = JSON.parse(localStorage.getItem("fullTasks"));

    if( localStr !==null ){
            localStr.forEach( function(data,index){                 

            addTaskToLeftDiv(data);


        } )
    }

})

// localStorage.removeItem("fullTasks");
