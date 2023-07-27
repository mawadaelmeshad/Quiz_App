const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text:"Hyperlinks and Text Markup Language", correct: false},
            {text:"Hyper Text Markup Language", correct: true},
            {text:"Hyper Tool and Text Markup Language", correct: false},
            {text:"Hot Mail", correct: false}
        ]
    },
    {
        question: "Who is the father of HTML?",
        answers: [
            {text:"Rasmus Lerdorf", correct: false},
            {text:"Tim Berners-Lee", correct: true},
            {text:"Brendan Eich", correct: false},
            {text:"Sergey Brin", correct: false}
        ]
    },
    {
    question: "Which of the following is used to read an HTML page and render it?",
    answers: [
        {text:"Web server", correct: false},
        {text:"Web network", correct: false},
        {text:"Web matrix", correct: false},
        {text:"Web browser", correct: true}
    ]
},
{
    question: "What is DOM in HTML?",
    answers: [
        {text:" Language dependent application programming", correct: false},
        {text:"Hierarchy of objects in ASP.NET", correct: false},
        {text:"Convention for representing and interacting with objects in html documents", correct: true},
        {text:"Application programming interface", correct: false}
    ]
},
{
    question: "In which part of the HTML metadata is contained?",
    answers: [
        {text:"head tag", correct: true},
        {text:"title tag", correct: false},
        {text:"html tag", correct: false},
        {text:"body tag", correct: false}
    ]
},
{
    question: " Which attribute specifies a unique alphanumeric identifier to be associated with an element?",
    answers: [
        {text:"id", correct: true},
        {text:"type", correct: false},
        {text:"article", correct: false},
        {text:"class", correct: false}
    ]
},
{
    question: "How many standard color names does HTML supports?",
    answers: [
        {text:"120", correct: false},
        {text:"130", correct: false},
        {text:"90", correct: false},
        {text:"140", correct: true}
    ]
},
{
    question: "Which of the following is not set with font-style property?",
    answers: [
        {text:"capitalize", correct: true},
        {text:"normal", correct: false},
        {text:"italic", correct: false},
        {text:"oblique", correct: false}
    ]
},
{
    question: "Which of the following is not used with text-decoration property?",
    answers: [
        {text:"underline", correct: false},
        {text:"overline", correct: false},
        {text:"inline", correct: true},
        {text:"line-through", correct: false}
    ]
},
{
    question: "Which of the following property converts text to initial capitals, all uppercase, or all lowercase?",
    answers: [
        {text:"text-uppercase", correct: false},
        {text:"text-decoration", correct: false},
        {text:"text", correct: false},
        {text:"text-transform", correct: true}
    ]
}
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
           button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
     if(score == questions.length){
        questionElement.innerHTML = `Congratulations you won !`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }
    else if (score == 0){
        questionElement.innerHTML = `Sorry you lost !`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }
    else{
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }
  

}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();