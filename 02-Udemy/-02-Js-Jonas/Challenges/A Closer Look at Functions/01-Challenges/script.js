"use strict";

const poll = {
  questions: "What is your favourite programming language",
  options: ["0:JAVASCRIPT", "1:PAYTHON", "2:RUST", "3:C++"],
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    // get answer
    const answer = Number(
      prompt(
        `${this.questions} \n ${this.options.join("\n")}
       \n (Write option number)`
      )
    );
    console.log(answer);
    // register answer
    typeof answer === "number" &&
      answer < this.answers.length &&
      this.answers[answer]++;
    this.displayResults();
    this.displayResults("string");
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`poll results are ${this.answers.join(",")}`);
    }
  },
};
// poll.registerNewAnswer();
document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
