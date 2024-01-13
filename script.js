let compScore = 0;
let userScore = 0;

function addImage(src, alt, width, height, attributes = {}, labelFontSize = "30px") {
  const container = document.createElement("div");

  // Create an image element
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;

  // Set additional attributes
  for (const key in attributes) {
    img.setAttribute(key, attributes[key]);
  }

  // Set size if provided
  if (width) {
    img.width = width;
  }
  if (height) {
    img.height = height;
  }

  // Add mouseover event listener to each image
  img.addEventListener("mouseover", function () {
    // Increase size by 1.5x when hovered over
    img.style.transform = "scale(1.3)";
  });

  // Add mouseout event listener to reset size when not hovered
  img.addEventListener("mouseout", function () {
    img.style.transform = "scale(1)";
  });

  // Create a label for the image
  const label = document.createElement("p");
  label.innerText = alt;
  label.style.fontSize = labelFontSize;

  // Append image and label to the container
  container.appendChild(img);
  container.appendChild(label);

  return container;
}

// Create a container div
const imageContainer = document.createElement("div");
imageContainer.id = "image-container";

// Append the container to the body
document.body.appendChild(imageContainer);

// Add Stone, Paper, and Scissor images with labels, attributes, and size to the container
imageContainer.appendChild(
  addImage("stone.png", "Stone", 200, 200, { class: "game-image", id: "Stone" })
);
imageContainer.appendChild(
  addImage("paper.png", "Paper", 200, 200, { class: "game-image", id: "Paper" })
);
imageContainer.appendChild(
  addImage("scissors.png", "Scissor", 200, 200, { class: "game-image", id: "Scissors" })
);

function getRandomChoice() {
  const choices = ["Stone", "Paper", "Scissors"];
  const compChoice = Math.floor(Math.random() * choices.length);
  return choices[compChoice];
}

function displayResult(message, backgroundColor) {
  const result = document.getElementById("msg");
  result.innerText = message;
  result.style.backgroundColor = backgroundColor;
}

const choices = document.querySelectorAll(".game-image");

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    const computerChoice = getRandomChoice();

    let result = document.getElementById("msg");

    if (userChoice === computerChoice) {
      displayResult("Oops..!! Match draw, try again", "White");
      document.getElementById("msg").style.color ="black";

    } else if (
      (userChoice === "Stone" && computerChoice === "Paper") ||
      (userChoice === "Paper" && computerChoice === "Scissors") ||
      (userChoice === "Scissors" && computerChoice === "Stone")
    ) {
      displayResult("You lose! Computer wins, try again", "Red");
      compScore++;
    } else {
      displayResult("You win! Computer loses, Great play again", "Green");
      userScore++;
    }

    document.getElementById("user-choice").innerText = "Your Choice: " + userChoice;
    document.getElementById("comp-choice").innerText = "Computer's Choice: " + computerChoice;

    // Update the scores on the page
    document.getElementById("user-score").innerText = userScore;
    document.getElementById("comp-score").innerText = compScore;

    // Check if either the user or the computer has reached 10 points
    if (userScore === 10 || compScore === 10) {
      let winnerMessage;

      if (userScore === 10) {
        winnerMessage = "Congratulations! You won the match!";
      } else {
        winnerMessage = "Oops! Computer won the match. Better luck next time! , play again";
      }

      // Display the winner message
      displayResult(winnerMessage, "blue");

      // Reset the game
      userScore = 0;
      compScore = 0;

      // Update the scores on the page after resetting
      document.getElementById("user-score").innerText = userScore;
      document.getElementById("comp-score").innerText = compScore;
    }
  });
});
