import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";

interface question {
  question: string;
  answers: string[];
  correct: number;
  incorrectMessage: string;
}

const Home: NextPage = () => {
  const questions: Array<question> = [
    {
      question: "What is the full form of MLH?",
      answers: [
        "My Local Hack",
        "Major League Hacking",
        "Mono Limb Hacks",
        "Medical League Hacking",
      ],
      correct: 1,
      incorrectMessage: "Major League Hacking is the correct answer.",
    },
    {
      question: "Who is your favourite MLHer?",
      answers: ["Ryan", "Sashrika", "Mary", "TNR"],
      correct: -1,
      incorrectMessage:
        "There can't be any incorrect here :P All MLHers are great!",
    },
    {
      question:
        "What is the name of the hackathon that starts the new seasons?",
      answers: ["MLH LHD", "MLH Startover", "MLH: INIT", "MLH Local Hack Day"],
      correct: 2,
      incorrectMessage:
        "Looks like you have never participated in MLH INIT! No probs, it happens each year!",
    },
    {
      question: "Do you like Hacking?",
      answers: ["Yes", "No", "I don't know", "I need some time to think"],
      correct: 0,
      incorrectMessage:
        "You should definitely try it out! It's a great way to learn new things!",
    },
    {
      question: "Are you a part of EddieHub?",
      answers: ["Yes", "No", "I don't know", "I need some time to think"],
      correct: 0,
      incorrectMessage: "You should definitely join EddieHub! eddiehub.org!",
    },
    {
      question: "Do you use any open source project in your daily life?",
      answers: ["Yes", "No", "I don't know", "I need some time to think"],
      correct: 0,
      incorrectMessage:
        "Even this project uses a lot of open source projects under the hood :P",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [life, setLife] = useState(3);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showResetButton, setResetButton] = useState(false);

  const handleAnswer = (question: question, indexOfAnswer: number) => {
    const correct = question.correct;

    let correctNess = false;

    if (correct === -1) {
      correctNess = true;
    } else if (correct === indexOfAnswer) {
      correctNess = true;
    } else {
      correctNess = false;
    }

    const nextQuestion = currentQuestion + 1;

    if (correctNess) {
      setScore(
        score +
          currentQuestion *
            Math.floor(Math.random() * (score + currentQuestion))
      );
    } else {
      setLife(life - 1);

      if (life == 1) {
        handleGameOver(false);
        return correctNess;
      }

      setMessage(question.incorrectMessage);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      handleGameOver(true);
    }

    return correctNess;
  };

  function handleGameOver(win: boolean) {
    if (win) {
      setMessage(`Cheers! You hacked the ghost! Score: ${score}!`);
      setShowMessage(true);
      setResetButton(true);
    } else {
      setMessage(`Oh no! The ghost hacked you! Score: ${score} :(`);
      setShowMessage(true);
      setResetButton(true);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.ghost}>
          <svg
            width="320"
            height="332.5"
            viewBox="0 0 128 133"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M116.223 125.064C117.255 123.881 117.546 122.334 117.614 121.317V54.76C117.614 54.76 112.989 19.885 81.489 10.385C49.989 0.885001 15.489 17.01 9.364 54.385L8.583 117.604C8.645 121.801 9.688 123.781 10.391 124.61C12.331 126.421 15.799 128.075 20.49 124.01C27.99 117.51 28.865 114.01 33.24 117.135C37.615 120.26 39.115 126.885 46.865 126.385C54.615 125.885 59.615 117.385 60.615 116.76C61.615 116.135 64.99 114.885 67.615 118.01C70.24 121.135 72.99 126.26 80.49 125.885C87.99 125.51 93.115 117.51 93.115 117.51C93.115 117.51 95.365 113.635 100.365 117.885C105.365 122.135 107.99 127.635 114.74 126.01C114.739 126.01 115.412 125.902 116.223 125.064Z"
              fill="#FFF6F4"
            />
            <path
              d="M86.238 64.552C89.9201 64.552 92.905 61.5671 92.905 57.885C92.905 54.2029 89.9201 51.218 86.238 51.218C82.5559 51.218 79.571 54.2029 79.571 57.885C79.571 61.5671 82.5559 64.552 86.238 64.552Z"
              fill="#013E51"
            />
            <path
              d="M40.072 64.552C43.7541 64.552 46.739 61.5671 46.739 57.885C46.739 54.2029 43.7541 51.218 40.072 51.218C36.3899 51.218 33.405 54.2029 33.405 57.885C33.405 61.5671 36.3899 64.552 40.072 64.552Z"
              fill="#013E51"
            />
            <path
              d="M71.916 62.782C71.966 61.674 71.107 60.736 69.999 60.687C69.326 60.657 68.719 60.966 68.332 61.458C67.574 62.224 65.849 63.693 63.636 63.816C61.94 63.91 60.198 63.191 58.445 61.679C58.442 61.676 58.438 61.673 58.434 61.67L58.436 61.675C58.104 61.381 57.679 61.187 57.201 61.166C56.093 61.117 55.155 61.975 55.106 63.083C55.074 63.807 55.433 64.453 55.993 64.832C55.992 64.832 55.991 64.831 55.99 64.831C58.211 66.702 60.526 67.711 62.902 67.817C63.235 67.831 63.572 67.829 63.909 67.807C67.072 67.616 69.481 65.865 70.797 64.641L71.249 64.188C71.27 64.169 71.289 64.147 71.309 64.127L71.343 64.093C71.336 64.1 71.328 64.107 71.322 64.113C71.666 63.771 71.892 63.307 71.916 62.782Z"
              fill="#013E51"
            />
            <path
              d="M18.614 102.718C20.4321 102.718 21.906 101.244 21.906 99.426C21.906 97.6079 20.4321 96.134 18.614 96.134C16.7959 96.134 15.322 97.6079 15.322 99.426C15.322 101.244 16.7959 102.718 18.614 102.718Z"
              fill="#FCEFED"
              stroke="#FEEBE6"
              stroke-miterlimit="10"
            />
            <path
              d="M95.364 31.967C97.1816 31.967 98.655 30.4936 98.655 28.676C98.655 26.8584 97.1816 25.385 95.364 25.385C93.5464 25.385 92.073 26.8584 92.073 28.676C92.073 30.4936 93.5464 31.967 95.364 31.967Z"
              fill="#FCEFED"
              stroke="#FEEBE6"
              stroke-miterlimit="10"
            />
            <path
              d="M24.739 96.218C26.2119 96.218 27.406 95.0239 27.406 93.551C27.406 92.0781 26.2119 90.884 24.739 90.884C23.2661 90.884 22.072 92.0781 22.072 93.551C22.072 95.0239 23.2661 96.218 24.739 96.218Z"
              fill="#FCEFED"
              stroke="#FEEBE6"
              stroke-miterlimit="10"
            />
            <path
              d="M101.489 35.717C102.961 35.717 104.155 34.5234 104.155 33.051C104.155 31.5786 102.961 30.385 101.489 30.385C100.017 30.385 98.823 31.5786 98.823 33.051C98.823 34.5234 100.017 35.717 101.489 35.717Z"
              fill="#FCEFED"
              stroke="#FEEBE6"
              stroke-miterlimit="10"
            />
            <path
              d="M18.738 90.55C20.3026 90.55 21.571 89.2816 21.571 87.717C21.571 86.1524 20.3026 84.884 18.738 84.884C17.1734 84.884 15.905 86.1524 15.905 87.717C15.905 89.2816 17.1734 90.55 18.738 90.55Z"
              fill="#FCEFED"
              stroke="#FEEBE6"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
        <div className={styles.questionBox}>
          <div className={styles.lives}>
            <div
              className={`${styles.life} ${life > 0 ? styles.filled : ""}`}
            ></div>
            <div
              className={`${styles.life} ${life >= 2 ? styles.filled : ""}`}
            ></div>
            <div
              className={`${styles.life} ${life === 3 ? styles.filled : ""}`}
            ></div>
          </div>
          <div
            className={`${showMessage ? styles.hide : ""} ${
              styles.questionBoxMain
            }`}
          >
            <h3 className={styles.question}>
              {questions[currentQuestion].question}
            </h3>
            <div className={styles.options}>
              {questions[currentQuestion].answers.map((answer, index) => (
                <div
                  className={styles.answer}
                  onClick={() =>
                    handleAnswer(questions[currentQuestion], index)
                  }
                >
                  {answer}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.messageBox}>
            <p
              className={`${styles.message} ${showMessage ? "" : styles.hide}`}
            >
              {message}
            </p>
            <button
              className={`${styles.reset} ${
                showResetButton ? "" : styles.hide
              }`}
              onClick={() => {
                setCurrentQuestion(0);
                setLife(3);
                setScore(0);
                setMessage("");
                setShowMessage(false);
                setResetButton(false);
              }}
            >
              Let's restart!
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
