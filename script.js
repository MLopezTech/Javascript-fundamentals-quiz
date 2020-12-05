function inQuiz() {



    //  the time remaining 
        let timeLeft=0;
    
        
    //  click "lets go!" button starts the quiz

        const start = document.getElementById("start-button");
        const remainingTime = document.getElementById("time-remaining");
        const scoreEle = document.getElementById("final-score");
        const numQuestions = questions.length;
        const containerEle = document.getElementById("landing-container");
        const quizContainerEl = document.getElementById("quiz-container");
        const finalContainerElement = document.getElementById("final-container");
        const submitElement = document.getElementById("submit-initials");
        const highscorebuttonelements = document.getElementById("highscore-button");
        const highScoreContainEle = document.getElementById("highscore-container");
        let highScores = [];





        if (JSON.parse(localStorage.getItem('scores')) !== null) {
            highScores = JSON.parse(localStorage.getItem("scores"));
        }
    
        function beginQuiz() {
            
            
            containerEle.setAttribute("class","container d-none");
            let rowElements = null;
            let columnElements = null;
            let headElements = null;
            let buttonelements = null;
            quizContainerEl.setAttribute("class","container");

            let liveQuestion = 1;
            let score = 0;



            timeLeft=numQuestions * 15;
            remainingTime.setAttribute("value",timeLeft);


            let interim = setInterval(function() {
                if (timeLeft<1) {
                    clearInterval(interim);


                    quizContainerEl.setAttribute("class","container d-none");
                    finalContainerElement.setAttribute("class","container");
                    return;
                }
                timeLeft = timeLeft - 1;
                remainingTime.setAttribute("value",timeLeft);
            },900);
            let clickBreather = false;
            function createQues(questionNum) {



                quizContainerEl.innerHTML = "";
                rowElements = document.createElement("div");
                rowElements.setAttribute("class","row");
                quizContainerEl.append(rowElements);

                columnElements = document.createElement("div");
                columnElements.setAttribute("class","col-0 col-sm-2");
                rowElements.append(columnElements);

                columnElements = document.createElement("div");
                columnElements.setAttribute("class","col-12 col-sm-8");
                rowElements.append(columnElements);

                columnElements = document.createElement("div");
                columnElements.setAttribute("class","col-0 col-sm-2");
                rowElements.append(columnElements);

                columnElements = rowElements.children[1];
                rowElements = document.createElement("div");
                rowElements.setAttribute("class","row mb-3");
                columnElements.append(rowElements);

                columnElements = document.createElement("div");
                columnElements.setAttribute("class","col-12");
                rowElements.append(columnElements);

                headElements = document.createElement("h2");
                headElements.innerHTML = questions[questionNum-1].title;
                columnElements.append(headElements);

                columnElements = quizContainerEl.children[0].children[1];



                for (let i=0; i<4; i++) {

                    let rowElements = document.createElement("div");
                    rowElements.setAttribute("class","row mb-1");
                    columnElements.append(rowElements);

                    let columnElements2 = document.createElement("div");
                    columnElements2.setAttribute("class","col-12");
                    rowElements.append(columnElements2);

                    buttonelements = document.createElement("button");
                    buttonelements.setAttribute("class","btn btn-primary");
                    buttonelements.setAttribute("type","button");
                    buttonelements.innerHTML = questions[liveQuestion-1].choices[i];
                    columnElements2.append(buttonelements);
                    buttonelements.addEventListener("click",function(){


                        if (clickBreather) {

                            return;
                        }
                        clickBreather = true;
                        clearInterval(interim);
                        let columnElements = quizContainerEl.children[0].children[1];
                        let rowElements = document.createElement("div");
                        rowElements.setAttribute("class","row border-top");
                        columnElements.append(rowElements);

                        columnElements = document.createElement("div");
                        columnElements.setAttribute("class","col-12");
                        rowElements.append(columnElements);

                        let parEl = document.createElement("p");
                        columnElements.append(parEl);
                        if (this.innerHTML === questions[liveQuestion - 1].answer) {
                            parEl.innerHTML = "Correct!";
                        } else {
                            parEl.innerHTML = "Incorrect";
                            timeLeft = timeLeft - 15;
                            if (timeLeft < 0) {
                                timeLeft = 0;
                            }
                            remainingTime.setAttribute("value",timeLeft);
                        }
                        liveQuestion++;
                        if (liveQuestion>questions.length) {
                            score = timeLeft;
                        }
                        setTimeout(function() {


                            if (liveQuestion>questions.length) {
                                // Move to the results page
                                quizContainerEl.setAttribute("class","container d-none");
                                finalContainerElement.setAttribute("class","container");
                                scoreEle.setAttribute("value",score);
                            } else {
                                createQues(liveQuestion);
                                clickBreather = false;
                                interim = setInterval(function() {
                                    if (timeLeft<1) {
                                        clearInterval(interim);
                                        quizContainerEl.setAttribute("class","container d-none");
                                        finalContainerElement.setAttribute("class","container");
                                        return;
                                    }
                                    timeLeft = timeLeft - 1;
                                    remainingTime.setAttribute("value",timeLeft);
                                },1000);
                            }
                        },2000);
                    });

            
                }
                

            }
            function highestScoreStored() {
                let initialsEl = document.getElementById("initials-entry");
                let newHighScore = {
                    initials: initialsEl.value,
                    highScore: score
                };
                console.log(newHighScore);
                highScores.push(newHighScore);
                console.log(highScores);
                localStorage.setItem("scores",JSON.stringify(highScores));
            }


            submitElement.addEventListener("click",highestScoreStored);
            
            createQues(liveQuestion);

            
        }

        start.addEventListener("click",beginQuiz);

        highscorebuttonelements.addEventListener("click",function() {
            containerEle.setAttribute("class","container d-none");
            quizContainerEl.setAttribute("class","container d-none");
            finalContainerElement.setAttribute("class","container d-none");
            highScoreContainEle.setAttribute("class","container");
            let columnElements = document.getElementById("highscore-table");
            for (i=0; i<highScores.length; i++) {
                let rowElements = document.createElement("div");
                rowElements.setAttribute("class","row mb-1");
                columnElements.append(rowElements);

                let columnElements2 = document.createElement("div");
                columnElements2.setAttribute("class","col-12 text-center");
                rowElements.append(columnElements2);

                let parEl = document.createElement("div");
                parEl.innerHTML = "Initials: " + highScores[i].initials + "   Score: " + highScores[i].highScore;
                columnElements2.append(parEl);
            }
        });
    
        
    
    
    
    
    
    
    }
    
inQuiz();