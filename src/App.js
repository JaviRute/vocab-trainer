//TTD
//* Create better vocab lists for each lesson, 20 to 30 expressions to translate
//* Asegurarse q en los vocab lists todos los verbos puedan ser acceptados con o sin "to" delante (run / to run)
//* Integrar con verbstrainer
//* hacer q no sea case-sensitive (da error si el usuario no pone mayusculas/minusculas a la perfeccion)
//* cambia la fuente del user text y la expression q te pone abajo, se ve muy fea
//* hacer q el hint aparezca con la primera letra subrayada (ya lo intenté, fue un coñazo y no consegui nada)
//* hacer q en la traducción English to Spanish te avise si has puesto la expresión bien pero con un fallo de acento
//* alternativamente podría hacerlo q los acentos no tuvieran efecto en la traducción
//* añadir vocabulario frances
//* añadir teacher mode


import './App.css';
import { useState, useRef, useEffect } from 'react';


//Components
import Buttons from './components/Buttons'
import Expression from './components/Expression';
import Input from './components/Input';
import SpecialCharactersSp from './components/SpecialCharactersSp';
import TopRow from './components/TopRow';
import Hint from './components/Hint';
import SelectionRow from './components/SelectionRow';

import legacyVivaSpanish from './data/spanish-vocab.json';
import kerboodleSpanishData from './data/kerboodle-spanish-vocab.json'

//Sound files
import wrongSoundFile from './sound/wrong.mp3';
import correctSoundFile from './sound/correct.mp3';



function App() {

  //This is here to allow Input.js to focus on the input when the user clicks on Play
  const inputRef = useRef(null);

  //We take the data and split it by themes
  const theme1 = kerboodleSpanishData["Theme 1"];
  const theme2 = kerboodleSpanishData["Theme 2"];
  const theme3 = kerboodleSpanishData["Theme 3"];


  // -------STATE -------STATE -------STATE -------STATE -------STATE -------STATE -------STATE 
  
  const [targetExpression, setTargetExpression] = useState([["q pasa tio"], ["q pasa tio"]]);
  const [userResponse, setUserResponse] = useState("");

  const [userTries, setUserTries] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [questionAlreadyAnswered, setQuestionAlreadyAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintGiven, setHintGiven] = useState(false);
  const [numberOfHints, setNumberOfHints] = useState(5);
  const [expressionsToAnswer, setExpressionsToAnswer] = useState(0);
  const [expressionsAnswered, setExpressionsAnswered] = useState(0);
  const [remainingExpressions, setRemainingExpressions] = useState([]);
  const [spToEngMode, setSpToEngMode] = useState(true);
  
  //This state changes the style of the text when you give the right/wrong answer
  const [rightAnswer, setRightAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const [theme, setTheme] = useState("");
  const [lesson, setLesson] = useState("");


  // Sound-----------Sound---------------Sound----------------Sound---------------Sound--------------Sound---------

  //preload sounds to avoid delay
  const wrongSound = new Audio(wrongSoundFile);
  const correctSound = new Audio(correctSoundFile);

  const playWrongSound = () => {
    wrongSound.currentTime = 0;
    wrongSound.play();
  }
  const playCorrectSound = () => {
    correctSound.currentTime = 0;
    correctSound.play();
  }

  // FUNCTIONS-------------FUNCTIONS-------------FUNCTIONS-------------FUNCTIONS-------------FUNCTIONS-------------

  //These 2 next functions are used in handleCheck, to make sure user answer is not case sensitive, and 
  //all instances of "'" are deleted, to make the game less frustrating
  const formatString = (str) => {
    str = str.replaceAll(/['’‘`]/g, "");
    return str.toLowerCase();
  }

  const formatArray = (arr) => {
    return arr.map(formatString);
  }

  const handleCheck = () => {
    if(!gameOver) {
      if(!questionAlreadyAnswered){
        if (spToEngMode === true ) {
          if (formatArray(targetExpression[1]).includes(formatString(userResponse)) || userResponse === "▲") {
            setRightAnswer(true);
            setWrongAnswer(false);
            playCorrectSound();
            setExpressionsAnswered(prevValue => prevValue + 1);
            if (expressionsAnswered != 0 && expressionsAnswered % 5 === 0) {
              setNumberOfHints(prevVal => prevVal + 1)
            }
            setUserResponse(`${targetExpression[0][0]} = ${targetExpression[1][0]}`);
            //Remove answered expression
            setRemainingExpressions(prevVal => prevVal.filter(expr => expr !== targetExpression));
            setQuestionAlreadyAnswered(true);            
          } else if (userTries === 1 && targetExpression[0][0] !== userResponse) {
            setGameOver(true);
            setUserTries(0);
            setUserResponse(`The answer was: "${targetExpression[1][0]}"`);
            playWrongSound();
          } else if (userResponse === "") {
              setUserResponse("Type your answer!")
          } else {
            setUserTries(prevValue => prevValue -1)
            setRightAnswer(false);
            setWrongAnswer(true);
            playWrongSound();
          } 
        } else {
            if (formatArray(targetExpression[0]).includes(formatString(userResponse)) || userResponse === "▲") {
              setRightAnswer(true);
              setWrongAnswer(false);
              playCorrectSound();
              setExpressionsAnswered(prevValue => prevValue + 1);
              if (expressionsAnswered != 0 && expressionsAnswered % 5 === 0) {
                setNumberOfHints(prevVal => prevVal + 1)
              }
              setUserResponse(`${targetExpression[1][0]} = ${targetExpression[0][0]}`);
              //Remove answered expression
              setRemainingExpressions(prevVal => prevVal.filter(expr => expr !== targetExpression));
              setQuestionAlreadyAnswered(true);
              
            } else if (userTries === 1 && targetExpression[1][0] !== userResponse) {
              setGameOver(true);
              setUserTries(0);
              setUserResponse(`The answer was: "${targetExpression[0][0]}"`);
              playWrongSound();
            } else if (userResponse === "") {
                setUserResponse("Type your answer!")
            } else {
              setUserTries(prevValue => prevValue -1)
              setRightAnswer(false);
              setWrongAnswer(true);
              playWrongSound();
          } 
        }
      }
    }
  }

  const handlePlay = () => {
    setHintGiven(false);
    setQuestionAlreadyAnswered(false);
    if (remainingExpressions.length > 0) {
      // all this commented text is old code when it took a random expression from the whole vocab list
      // const themes = Object.keys(kerboodleSpanishData);
      // const randomThemeKey = themes[Math.floor(Math.random() * themes.length)];
      // const randomTheme = kerboodleSpanishData[randomThemeKey];
      // const lessons = Object.keys(randomTheme);
      // const randomLessonKey = lessons[Math.floor(Math.random() * lessons.length)];
      // const randomLesson = randomTheme[randomLessonKey];

      const randomItem = remainingExpressions[Math.floor(Math.random() * remainingExpressions.length)];
      setTargetExpression(randomItem);
      setRightAnswer(false);
      setWrongAnswer(false);
      setUserResponse("");
      setShowHint(false);
      setGameOver(false);
      setUserTries(3);

      // Focus on the input field
      if (inputRef.current) {
          inputRef.current.focus();
      }
      if (spToEngMode === true) {console.log(`Pssssst! The answer is "${randomItem[1]}"`)};
      if (spToEngMode === false) {console.log(`Pssssst! The answer is "${randomItem[0]}"`)};
    } else {
      setGameOver(true);
      setUserResponse("All expressions answered, YOU WIN!")
    }

  }

  // Function to handle the insertion of special characters
  const handleSpecialCharacter = (char) => {
    setUserResponse((prevInput) => prevInput + char);
    inputRef.current.focus();
  };

  const chooseTheme = (theme) => {
    setTheme(theme);
    setLesson();
    setExpressionsAnswered(0);
    setExpressionsToAnswer(0);
  }

  const chooseLesson = (lesson) => {
    setLesson(lesson); 
    setRemainingExpressions(lesson.slice(1));
    setExpressionsAnswered(0);
    setExpressionsToAnswer(0);
  }

  const restartThemeSelection = () => {
    setTheme('');
    setLesson('');
  }

  const restartLessonSelection = () => {
    setLesson('');
  }

  const handleHint = () => {
    if(!questionAlreadyAnswered){
      setHintGiven(true);
      if(numberOfHints > 0) {
        setShowHint(true);
        setNumberOfHints(prevVal => prevVal - 1);
        inputRef.current?.focus(); //focus the input so the user does not have to click on it to start typing
      } else {
        playWrongSound();
      }
    }   
  }

  // UseEffect to call handlePlay() when lesson changes
  // This is necessary because the state does not update immediately after choosing the lesson
  useEffect(() => {
    if (lesson && lesson.length > 0) {
      handlePlay();
      setExpressionsToAnswer(lesson.length - 1);
    }
  }, [lesson]);

  return (
    <div className="App">
      <div className='framework'>
        <TopRow spToEngMode={spToEngMode} setSpToEngMode={setSpToEngMode} restartThemeSelection={restartThemeSelection}/>

        <SelectionRow 
          theme={theme} 
          lesson={lesson} 
          theme1={theme1}
          theme2={theme2}
          theme3={theme3}
          chooseTheme={chooseTheme}
          chooseLesson={chooseLesson}
          restartThemeSelection={restartThemeSelection}
          restartLessonSelection={restartLessonSelection}
          />
        
        {theme && lesson && 
          <>
          <div className='tries-container'>
            <p className='tries'>{`Attempts left: ${userTries}`}</p>
            <p className='tries'>{`Hints: ${numberOfHints}`}</p>
            <p className='tries'>{`Expressions: ${expressionsAnswered} / ${expressionsToAnswer}`}</p>
          </div>
            
            
          </>
        }


        {showHint && <Hint 
                        targetExpression={targetExpression} 
                        gameOver={gameOver} 
                        numberOfHints={numberOfHints}
                        setNumberOfHints={setNumberOfHints}
                        inputRef={inputRef}
                        spToEngMode={spToEngMode}
                        />}
        {/* Lo de abajo es un elemento q aparece si no hay hint para rellenar el hueco, pero se veia mal */}
        {/* {!showHint && <p className='dummy-hint'>Hint</p>} */}
        {theme && lesson && 
          <>
              <Input 
                inputRef={inputRef}
                targetExpression={targetExpression} 
                handleCheck={handleCheck}
                setUserResponse={setUserResponse}
                userResponse={userResponse}
                rightAnswer={rightAnswer}
                wrongAnswer={wrongAnswer}
                />
            <Expression targetExpression={targetExpression} spToEngMode={spToEngMode}/>
          </>
        }

      </div>

        {theme && lesson && 
        <>
          <Buttons 
            userResponse={userResponse} 
            targetExpression={targetExpression}
            handleCheck={handleCheck}
            handlePlay={handlePlay}
            handleHint={handleHint}
            hintGiven={hintGiven}
            numberOfHints={numberOfHints}
            questionAlreadyAnswered={questionAlreadyAnswered}
            />
            {/* I am commenting Special characters until I make a mode to answer expressions in Spanish */}
          {!spToEngMode && <SpecialCharactersSp 
            handleSpecialCharacter={handleSpecialCharacter}
            setUserResponse={setUserResponse}
            />}
        </>}


    </div>
  );
}

export default App;
