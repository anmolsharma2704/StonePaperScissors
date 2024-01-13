function addImage(src, alt, attributes = {}, width, height) {
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

  return img;
}

// Create a container div
const imageContainer = document.createElement("div");
imageContainer.id = "image-container";

// Append the container to the body
document.body.appendChild(imageContainer);

// Add Stone, Paper, and Scissor images with attributes and size to the container
imageContainer.appendChild(
  addImage("stone.png", "Stone", { class: "game-image", id: "Stone" }, 200, 200)
);
imageContainer.appendChild(
  addImage("paper.png", "Paper", { class: "game-image", id: "Paper" }, 200, 200)
);
imageContainer.appendChild(
  addImage(
    "scissors.png",
    "Scissor",
    { class: "game-image", id: "Scissors" },
    200,
    200
  )
);

let compScore = 0;
let userScore = 0;


function getRandomChoice() {
  const choices = ["Stone", "Paper", "Scissors"];
  const compChoice = Math.floor(Math.random() * choices.length);
  return choices[compChoice];
}

let userChoice; // Declare userChoice outside the event listener

const choices = document.querySelectorAll(".game-image");

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        userChoice = choice.getAttribute("id");

        const computerChoice = getRandomChoice();

        let result = document.getElementById("msg");

        if (userChoice === computerChoice) {
            result.innerText = "Oops..!!  Match draw , try again";
            result.style.backgroundColor = "White";
            result.style.color = "Black";

        } else if (userChoice === 'Stone') {
            if (computerChoice === 'Paper') {
                result.innerHTML = "You lose! Computer wins , try again";
                result.style.backgroundColor = "Red";
                compScore++;
            } else {
                result.innerHTML = "You win! Computer loses , Great play again";
                result.style.backgroundColor = "Green";
                userScore++;
            }
        } else if (userChoice === 'Paper') {
            if (computerChoice === 'Scissors') {
                result.innerHTML = "You lose! Computer wins , try again";
                result.style.backgroundColor = "Red";
                compScore++;
            } else {
                result.innerHTML = "You win! Computer loses , Great play again";
                result.style.backgroundColor = "Green";
                userScore++;
            }
        } else if (userChoice === 'Scissors') {
            if (computerChoice === 'Stone') {
                result.innerHTML = "You lose! Computer wins , try again";
                result.style.backgroundColor = "Red";
                compScore++;
            } else {
                result.innerHTML = "You win! Computer loses , Great play again";
                result.style.backgroundColor = "Green";
                userScore++;
            }
        }
        document.getElementById("user-choice").innerText = "Your Choice: " + userChoice;
        document.getElementById("comp-choice").innerText = "Computer's Choice: " + computerChoice;

        // Update the scores on the page
        document.getElementById("user-score").innerText = userScore;
        document.getElementById("comp-score").innerText = compScore;
    });
});
