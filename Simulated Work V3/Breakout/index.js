document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const message = document.querySelector('h1');
  const blockWidth = 100;
  const blockHeight = 20;
  const ballDiameter = 20;
  const boardWidth = 560;
  const boardHeight = 300;
  let timerId;
  let xDirection = -2;
  let yDirection = 2;
  let score = 0;

  class Block {
      constructor(x, y) {
          this.bottomLeft = [x, y];
          this.bottomRight = [x + blockWidth, y];
          this.topLeft = [x, y + blockHeight];
          this.topRight = [x + blockWidth, y + blockHeight];
      }
  }

  const blocks = [];
  const blockPositions = [
      [10, 270], [120, 270], [230, 270], [340, 270], [450, 270],
      [10, 240], [120, 240], [230, 240], [340, 240], [450, 240],
      [10, 210], [120, 210], [230, 210], [340, 210], [450, 210]
  ];

  blockPositions.forEach(pos => {
      blocks.push(new Block(...pos));
  });

  function addBlocks() {
      blocks.forEach(block => {
          const blockElement = document.createElement('div');
          blockElement.classList.add('block');
          blockElement.style.left = block.bottomLeft[0] + 'px';
          blockElement.style.bottom = block.bottomLeft[1] + 'px';
          grid.appendChild(blockElement);
      });
  }

  addBlocks();

  const user = document.createElement('div');
  user.classList.add('user');
  user.style.left = '230px';
  user.style.bottom = '10px';
  grid.appendChild(user);

  let userPosition = [230, 10];

  function moveUser(e) {
      switch (e.key) {
          case 'ArrowLeft':
              if (userPosition[0] > 0) {
                  userPosition[0] -= 20;
                  user.style.left = userPosition[0] + 'px';
              }
              break;
          case 'ArrowRight':
              if (userPosition[0] < boardWidth - blockWidth) {
                  userPosition[0] += 20;
                  user.style.left = userPosition[0] + 'px';
              }
              break;
      }
  }

  document.addEventListener('keydown', moveUser);

  const ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.left = '270px';
  ball.style.bottom = '40px';
  grid.appendChild(ball);

  let ballPosition = [270, 40];

  function moveBall() {
      ballPosition[0] += xDirection;
      ballPosition[1] += yDirection;
      ball.style.left = ballPosition[0] + 'px';
      ball.style.bottom = ballPosition[1] + 'px';
      checkCollision();
  }

  function checkCollision() {
      const allBlocks = document.querySelectorAll('.block');
      allBlocks.forEach((block, index) => {
          const blockRect = block.getBoundingClientRect();
          const ballRect = ball.getBoundingClientRect();

          if (
              ballRect.bottom >= blockRect.top &&
              ballRect.top <= blockRect.bottom &&
              ballRect.right >= blockRect.left &&
              ballRect.left <= blockRect.right
          ) {
              allBlocks[index].classList.add('removed');
              allBlocks[index].style.display = 'none';
              blocks.splice(index, 1);
              yDirection *= -1;

              score++;
              scoreDisplay.textContent = score;

              if (blocks.length === 0) {
                  clearInterval(timerId);
                  message.textContent = `🎉 Congratulations! You Win! 🎉 Score: ${score}`;
                  message.classList.add('win');
              }
          }
      });

      if (ballPosition[0] >= boardWidth - ballDiameter || ballPosition[0] <= 0) {
          xDirection *= -1;
      }

      if (ballPosition[1] >= boardHeight - ballDiameter) {
          yDirection *= -1;
      }

      if (
          ballPosition[0] > userPosition[0] &&
          ballPosition[0] < userPosition[0] + blockWidth &&
          ballPosition[1] <= userPosition[1] + blockHeight
      ) {
          yDirection *= -1;
      }

      if (ballPosition[1] <= 0) {
          clearInterval(timerId);
          message.textContent = `Game Over! Score: ${score}`;
          message.classList.add('lose');
      }
  }

  timerId = setInterval(moveBall, 20);
});
