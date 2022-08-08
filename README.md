# Latin Squares Reactdoku

Reactdoku is an interactive Sudoku game I built in React. A live deployment [is available here.](https://programmerd.com/sudokuapp/)  The game board is not your traditional 3x3 sudoku board--instead the boards are rectangular [Latin Squares](https://en.wikipedia.org/wiki/Latin_square) (like 2x3 and 3x2). The board suggests valid moves to the player as numbers are placed. The gameboard is a responsive CSS flex grid.  While only one latin square size is shown on the demo site, a generic JSON file format can be used to create a game of any dimensions and initalization state if the backend ever changes.

The live demo site supports Continuous Integration/Continuous Deployment via a git hook script on the remote server that automatically builds and deploys the project when I push an update from development.

https://user-images.githubusercontent.com/11655234/183491921-2f886d6b-d506-44bc-be93-9bc0ddd35985.mov

The game boards are generated and loaded from a flask backend.  The python code to generate game boards was created by James Monroe Hammer, a batchmate at The Recurse Center.


