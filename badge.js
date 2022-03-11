        var greetingHeader = document.querySelector("#greetingHeader");
        var greetingInput = document.querySelector("#greetingInput");
        var userName = document.querySelector("#userName");
        var question = document.querySelector("#question");
        var quiz = document.querySelector("#quiz");
        var qn1Button = document.querySelector("#qn1Button");
        var qn2Button = document.querySelector("#qn2Button");
        var qn3Button = document.querySelector("#qn3Button");
        var q1a = document.querySelector("#q1a");
        var q1b = document.querySelector("#q1b");
        var q1c = document.querySelector("#q1c");
        var q1d = document.querySelector("#q1d");
        var iterationNumber = 0;
        var score = 0;

        var questionsList = [
            "Qn1: In which NZ city is the sky tower?", 
            "Qn2: Which planet is closest to the sun?",
            "Qn3: What is a baby goat called?"
        ]

        var aAnswerList = ["Dunedin", "Venus", "Tadpole"]
        var bAnswerList = ["Christchurch", "Mercury", "Joey"]
        var cAnswerList = ["Wellington", "Jupiter", "Kid"]
        var dAnswerList = ["Auckland", "Earth", "Chick"]
        
        var qnChoice = "";

        quiz.style.display = "none";
        qn1Button.style.display = "none";
        qn2Button.style.display = "none";
        qn3Button.style.display = "none";

        function reset() {
            question.innerHTML = questionsList[iterationNumber];
            q1a.innerHTML = aAnswerList[iterationNumber];
            q1b.innerHTML = bAnswerList[iterationNumber];
            q1c.innerHTML = cAnswerList[iterationNumber];
            q1d.innerHTML = dAnswerList[iterationNumber];
            q1a.style.color = "floralwhite";
            q1b.style.color = "floralwhite";
            q1c.style.color = "floralwhite";
            q1d.style.color = "floralwhite";   
        }
        
        
        function greeting() {
            greetingHeader.innerHTML = "";
            greetingHeader.innerHTML = "Hello " + userName.value + ", here is your quiz."
            greetingInput.style.display = "none";
            quiz.style.display = "block";
            qn1Button.style.display = "block";
            question.innerHTML = questionsList[iterationNumber];
            q1a.innerHTML = aAnswerList[iterationNumber];
            q1b.innerHTML = bAnswerList[iterationNumber];
            q1c.innerHTML = cAnswerList[iterationNumber];
            q1d.innerHTML = dAnswerList[iterationNumber];
        }

        function q1aFunction() {
            q1a.style.color = "red";
            q1b.style.color = "floralwhite";
            q1c.style.color = "floralwhite";
            q1d.style.color = "floralwhite";
            qnChoice = "a";
        }
        function q1bFunction() {
            q1a.style.color = "floralwhite";
            q1b.style.color = "red";
            q1c.style.color = "floralwhite";
            q1d.style.color = "floralwhite";
            qnChoice = "b";
        }
        function q1cFunction() {
            q1a.style.color = "floralwhite";
            q1b.style.color = "floralwhite";
            q1c.style.color = "red";
            q1d.style.color = "floralwhite";
            qnChoice = "c";
        }
        function q1dFunction() {
            q1a.style.color = "floralwhite";
            q1b.style.color = "floralwhite";
            q1c.style.color = "floralwhite";
            q1d.style.color = "red";
            qnChoice = "d";
        }

        function submitQn1() {
            if (qnChoice == "d") {
                score += 1;
            } 
            iterationNumber += 1;
            qn1Button.style.display = "none";
            qn2Button.style.display = "block";
            reset();
        }

        function submitQn2() {
            if (qnChoice == "b") {
                score += 1;
            } 
            iterationNumber += 1;
            qn2Button.style.display = "none";
            qn3Button.style.display = "block";
            reset();
        }

        function submitQn3() {
            if (qnChoice == "c") {
                score += 1;
            } 
            greetingHeader.innerHTML = "Your score is " + score;
            quiz.style.display = "none";
            question.innerHTML = questionsList[iterationNumber];
            reset();
        }