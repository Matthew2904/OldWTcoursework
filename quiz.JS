
/*- Get Elements by ID -*/
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const choice4 = document.getElementById("choice4");
const counterbox = document.getElementById("counter");
const resultButton = document.getElementById("result-btn");
const resultbox = document.getElementById("results");
const q1 = document.getElementById("qgrid1");
const q2 = document.getElementById("qgrid2");
const q3 = document.getElementById("qgrid3");
const q4 = document.getElementById("qgrid4");
const leaderboard = document.getElementById("leaderboardGrid");
const leaderboardButton  = document.getElementById("leaderboard-btn");






/*- Questions -*/
const questions = [
  {
    id: 'qgrid1',
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    id: 'qgrid2',
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Dev Ed', correct: true },
      { text: 'Fun Fun Function', correct: true }
    ]
  },
  {
    id: 'qgrid3',
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    id: 'qgrid4',
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]




// on the function where the the colours are revealed 



let shuffledQuestions, currentQuestionIndex, counter, chosenAnswer

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


function startGame() {

selectedCounter=0;

    if (!resultButton.classList.contains('hide')){
resultButton.classList.add('hide')
    }

  
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  counter = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}





function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}





function showQuestion(question) {
  questionElement.innerText = question.question


let selectedButton

 let id = question.id

 

  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
button.id = question.id


    if (answer.correct) {
      button.dataset.correct = answer.correct
      counterbox.innerText = String(counter +  "/" + currentQuestionIndex);  

    }

    button.classList.add(question.id)
   button.addEventListener('click', selectAnswer)
 



 

    answerButtonsElement.appendChild(button)


})



}



  let selectedCounter = 0;


function selectAnswer(e) {
 
   if ( (selectedCounter == 0 && currentQuestionIndex == 0) ||
    (selectedCounter == 1 && currentQuestionIndex == 1) ||
    (selectedCounter == 2 && currentQuestionIndex == 2) ||
    (selectedCounter == 3 && currentQuestionIndex == 3)  ) {

selectedCounter++


    // add if statement here to selectedcounter 



  const selectedButton = e.target
  selectedButton.style.border = "10px yellow solid"
  



if (selectedButton.classList.contains("qgrid1")){
   q1.innerText = selectedButton.innerText
} 
else if (selectedButton.classList.contains("qgrid2")){
    q2.innerText = selectedButton.innerText
} 
else if (selectedButton.classList.contains("qgrid3")){
    q3.innerText = selectedButton.innerText
} 
else if (selectedButton.classList.contains("qgrid4")){
    q4.innerText = selectedButton.innerText
} 



/*selectedButton.innerText = selectedButton.classList*/

  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })




if (selectedButton.classList.contains('correct'))
{
    counter++


}

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')

  } else {
    

    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    currentQuestionIndex++
    counterbox.innerText = String(counter +  "/" + currentQuestionIndex); 
    
    

    /* Call function to update the leaderboard*/
    updateLeaderboard(counter)

    /*
    go to the results page if the button is clicked
    */
    resultButton.classList.remove('hide')
    resultButton.addEventListener('click', viewResults)
   
  }

}

}




function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}




function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}





function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}





function viewResults()
{
    questionElement.classList.add('hide')
    answerButtonsElement.classList.add('hide')



    resultButton.classList.add('hide')
resultbox.classList.remove("hide")

/*
    go to the leaderpoard page if the button is clicked
    */
    leaderboardButton.classList.remove('hide')
    leaderboardButton.addEventListener('click', viewLeaderboard)





startButton.addEventListener('click', resetResult)

}





function resetResult()
{

    resultbox.classList.add("hide")
    questionElement.classList.remove('hide')
    answerButtonsElement.classList.remove('hide')
    leaderboardButton.classList.add('hide')


}




function viewLeaderboard()
{
    leaderboardButton.classList.add('hide')
    resultbox.classList.add('hide')



leaderboard.style.display="grid";

startButton.addEventListener('click', resetLeaderboard)

}


function resetLeaderboard()
{
leaderboard.style.display = "none";


}





/* 
issue as soon as the user has selected an answer they should be moved on, or all other questions hidden





Try to introduce cookies / local storage
Can now use cookies; what do i want to do with them? 


create a leaderboard of results 


     LEADERBORAD 


 NAME          RESULT

Matthew         5/5
Lewis           3/5
David           3/5
Alan            2/5
Matthew         2/5


create record [1-5] STRUCTURE = "Name,0" <---Name, Score--->

* After every quiz loop through the record[1-5] check if the currentresult is better than the result at the current index
If it create a new record and insert it into the list/array at that index and delete the last one




The function to do the above algorithm should be triggered on upon after the user has entered the last question


The cookies should be created upon the onload function by using the check coookies function - which will check for their existence - 
if they do not exist then use set cookies to create the copokies with some expiration date



*/







function getCookie(cookie_name)
{
var name = cookie_name + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
for (var i = 0; i < ca.length; i++)
{
var c = ca[i];
while(c.charAt(0) == ' ')
{
c = c.substring(1);
}
if(c.indexOf(name) == 0)
{
return c.substring(name.length, c.length);
}
}
return "";
}





function setCookie(name_ ,value ,expiry )
{
  var d = new Date();
  d.setTime(d. getTime() + (expiry*24*60*60*1000));
  var expires = "expires ="+ d.toUTCString();
  document.cookie = name_ + "=" + value + ";" + expires;
}



// Check if the 5 cookie records exist, if not, then create them
function checkCookie() 
{
    
    for (i=0; i < 5; i++)
    {
        console.log("record" + i + " " +getCookie("record" + i))
    }
    // set the 5 records to the cookes 
    const records = [ getCookie("record0"), getCookie("record1"), getCookie("record2"), getCookie("record3"), getCookie("record4") ];

    for (i=0; i < records.length; i++)
    {
        if (records[i] == "")
        {
            records[i] = "_____,0"+i ;
            setCookie("record" + i, records[i] , 365);

        }
    }

 



    


}






/* After every quiz loop through the record[1-5] check if the currentresult is better than the result at the current index
If it create a new record and insert it into the list/array at that index and delete the last one*/


function updateLeaderboard(currentScore){

    let flag = 0;
    let index;
    let name;
    const records = [ getCookie("record0"), getCookie("record1"), getCookie("record2"), getCookie("record3"), getCookie("record4") ];
let newRecord = "_____,0";

    // Get the index where the current score lies within the array
    for (i=0; i < records.length; i++)
    {
        const myArray = records[i].split(',');

        // if the flag variable is zero and the currenct score is greater than the 
        if (flag == 0 && currentScore >= parseInt(myArray[1]))
        {
            
            index = i;
            flag = 1;
            while(name == "" || name == null) 
            {
                name = prompt("Congratulations, you have made it onto the leaderborad! Please enter your name:", "");
            }

            newRecord = name + "," + currentScore;

        }


    }

// if the new record has been filled out then add it to the 
 if (newRecord != "_____,0"){
    console.log(records);
    records.pop();
    
    console.log("Second print" + records);

    const one = records.slice(0, (index));
    const two = records.slice(index, records.length)
   
       
   console.log(one);
   console.log(two);
   
   one.push(newRecord);
 
   const three = one.concat(two);
 
  console.log(three);
 

  for (i=0; i < 5; i++)
  {
      document.cookie = "record" + i + "="+ three[i] + ";";
  }
}







    for (i=0; i < 5; i++)
    {
        console.log("record" + i + " " + getCookie("record" + (i)))
        
        
        
        const myArray = getCookie("record" + (i)).split(',');
        
    
        console.log(myArray);

        document.getElementById(("p" + i)).innerHTML = myArray[0];
        document.getElementById(("hs" + i)).innerHTML = myArray[1];

    }

}




function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  

  sleep(2000);


/*
What to do now


--- Create a div for the highscore results to be displayed in 
--- in update leaderboard display the highscores within the group 
---  fix the quiz (do we need the next button?, can selec)

--- Make the quiz look pretty





--- Switch the questions and rewrite the code for the JAVA SCRIPT
--- Go through the webpages and add comments and adjust for code quality
*/