
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { ToastService } from './toast.service';
import { Subscription } from 'rxjs';

@Injectable()
export class GameService {
     //Unused array for the model.
     private _ticTacModel = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
     ]
     //All available computer moves remaining.
     private _computerMovesRemaining = [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 0],
          [1, 1],
          [1, 2],
          [2, 0],
          [2, 1],
          [2, 2],
     ];
     //Variables for use within service. _variableName denotes variables for behaivor subject use.
     private _resetView: boolean = false;
     private _userToggle: boolean = true; //Whether it is user's turn.
     private _gameOff: boolean = false; //Whether the game is over.
     private currentColumn: number = 0; //Previously selected position.
     private currentRow: number = 0; //Previously selected position.
     private checkValue = 'X'; //Determine the value for checking.
     private twoPlayerGameMode = false;

     resetView = new BehaviorSubject<boolean>(false); //Used to reset view for tic-tac-toe board component.
     updateView = new BehaviorSubject<number[]>([]); //Used to hold positions passed to update view.
     userToggle = new BehaviorSubject<boolean>(this._userToggle); //Used to determine whether it's the user's turn or the opponents.
     gameOff = new BehaviorSubject<boolean>(this._gameOff); //Used to determine whether the game is still being played.

     constructor(private toaster: ToastService) {
     }

     setGameType(value: boolean) {
          value ? this.twoPlayerGameMode = true :
               this.twoPlayerGameMode = false;
     }

     updateResetView() {
          this._resetView = !this._resetView;
          this.resetView.next(this._resetView);
          this._resetView = !this._resetView;
          this.resetView.next(this._resetView);
     }

     addToModel(position: number[]) {
          //Splits up the position into row and columns and sets it to the global variable.
          this.currentRow = position[0];
          this.currentColumn = position[1];

          //Error handling checks if the position is already taken.
          if (this._ticTacModel[this.currentRow][this.currentColumn] !== '') {
               this.toaster.createAlert("That square has already been taken!");
               return; //Returns to game loop. Does not add position.
          }

          //Adds the value to the array.
          this._ticTacModel[this.currentRow][this.currentColumn] = this.checkValue;
          //Adds to the view to interact with user.
          this.updateView.next(position);
          //Ends the turn.
          this.endTurn();
     }

     endTurn() {
          this.checkIfWon(); //Check if user won.
          this.checkForDraw(); //Check if the draw.
          if (this._gameOff == false) {
               this._userToggle = !this._userToggle; //Changes to opposing player.
               this.userToggle.next(this._userToggle); //Passes to view.
               this._userToggle ? this.checkValue = 'X' : this.checkValue = 'O';
               if (this.twoPlayerGameMode) {
                    this.changeToOtherPlayer(); //Change to other player.
               }
               else {
                    if (this._userToggle == false) {
                         this.generateComputersMove();
                    }
               }
          }
     }

     checkIfWon() {
          if (this.checkIfWonByPosition([this.currentRow, this.currentColumn])) {
               this.toaster.createAlert(this._userToggle ? "You Won!" : "Other Player Won!");
               this._gameOff = true;
               this.gameOff.next(this._gameOff);
          }
     }
     checkForDraw() {
          for (let arrayIndex = 0; arrayIndex < 3; arrayIndex++) {
               for (let dataIndex = 0; dataIndex < 3; dataIndex++) {
                    if (this._ticTacModel[arrayIndex][dataIndex] === '') {
                         return; //If an empty position exists returns.
                    }
               }
          }
          this._gameOff = true;
          this.gameOff.next(this._gameOff);
          this.toaster.createAlert("It's A Draw");
     }

     changeToOtherPlayer() {
          //Makes an alert, toggle is already switched.
          this.toaster.createAlert(this._userToggle ? "User's Turn" : "Other Player's Turn");
     }

     checkIfWonByPosition(position: number[],
          passedArr?: string[][],
          checker?: string) {

          const currentRow = position[0]; //Updates search criteria
          const currentColumn = position[1]; //Updates search criteria.

          let checkValue: string; //Used to check for a certain value.
          let array: string[][] //Used to check a certain array.

          //Checks real time board following adding by player or calculating the potential move by computer.
          passedArr ? array = passedArr : array = this._ticTacModel;
          //Checks real time checkValue or passed in to evaluate computer's decision to block / win.
          checker ? checkValue = checker : checkValue = this.checkValue;
          //Check veritical.
          for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
               if (array[currentRow][rowIndex] !== checkValue) {
                    break;
               }
               if (rowIndex == 2) {
                    return true;
               }
          }
          //Check horizontal.
          for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
               if (array[columnIndex][currentColumn] !== checkValue) {
                    break;
               }
               if (columnIndex == 2) {
                    return true;
               }
          }
          //Check diagonal.
          for (let diagonalIndex = 0; diagonalIndex < 3; diagonalIndex++) {
               if (array[diagonalIndex][diagonalIndex] !== checkValue) {
                    break;
               }
               if (diagonalIndex == 2) {
                    return true;
               }
          }
          //Check reverse diagonal.
          for (let diagonalIndex = 2, diagonalIndex2 = 0; diagonalIndex2 < 3; diagonalIndex--, diagonalIndex2++) {
               if (array[diagonalIndex][diagonalIndex2] !== checkValue) {
                    break;
               }
               if (diagonalIndex2 == 2) {
                    return true;
               }
          }
          //If none of the values returned true, return false.
          return false;
     }


     endGame() {
          //Resets array.
          this._ticTacModel = this.resetArray();
          //Resets computer moves.
          this._computerMovesRemaining = this.resetComputerMoves();
          //Resets to user's turn.
          this._userToggle = true;
          //Resets positions.
          this.currentColumn = 0;
          this.currentRow = 0;
          //Sends the observable alerting the view.
          this.userToggle.next(this._userToggle);
          //Defaults to default checkValue.
          this.checkValue = 'X';
          this.updateView.next([0]);
          //Resets game.
          this._gameOff = false;
          this.gameOff.next(this._gameOff);
     }

     generateComputersMove() {
          //Used to hold the position for the computer and pass to the model.
          let chosenPosition: number[] = [];

          //Flattens 2D array to correspond with _computerMovesRemaining index.
          let flat = this._ticTacModel.flat();
          for (let i = 0; i < flat.length; i++) {
               if (flat[i] !== '') {
                    this._computerMovesRemaining[i] = [];
               }
          }
          //Filters out potential moves that are empty, set by the for loop above.
          let potentialMoves = this._computerMovesRemaining.filter((value) => { return value.length !== 0 });
          //Makes an array of all the potential moves and checks for wins and losses before passing the value.
          for (let position of potentialMoves) {
               let array = this.updateArrayFromCurrentArray(position, 'O');
               if (this.checkIfWonByPosition(position, array, 'O') == true) {
                    chosenPosition = position;
                    break;
               }
               array = this.updateArrayFromCurrentArray(position, 'X');
               if (this.checkIfWonByPosition(position, array, 'X') == true) {
                    chosenPosition = position;
                    break;
               }
          }
          //If no chosen position was found, passes the one left.
          if (!chosenPosition.length) {
               chosenPosition = potentialMoves[0];
          }
          this.addToModel(chosenPosition);
     }

     updateArrayFromCurrentArray(position: number[],
          checkValue: string): string[][] {
          //Creates a new array with the same elements in the _ticTacModel plus the new position passed with the correct checkValue passed.
          const newArr: string[][] = [];
          for (let arrayIndex = 0; arrayIndex < this._ticTacModel.length; arrayIndex++) {
               const row = [...this._ticTacModel[arrayIndex]];
               if (arrayIndex === position[0]) {
                    row[position[1]] = checkValue;
               }
               newArr.push(row);
          }
          //Returns the array.
          return newArr;
     }

     //Used to reset the array following completion of the game.
     resetArray() {
          return [
               ['', '', ''],
               ['', '', ''],
               ['', '', ''],
          ]
     }
     resetComputerMoves() {
          return [
               [0, 0],
               [0, 1],
               [0, 2],
               [1, 0],
               [1, 1],
               [1, 2],
               [2, 0],
               [2, 1],
               [2, 2],
          ]
     }
     //Return of BehaivorSubjects.
     getTurn() {
          //Used to tell the Squares what to mark the squares with.
          return this.userToggle;
     }
     getGameOff() {
          //Used to tell the view that the game is over.
          return this.gameOff;
     }
     getViewUpdater() {
          //Used for computer moves to update the display.
          return this.updateView;
     }
     getResetView() {
          //Used to reset screen in frontend.
          return this.resetView;
     }
}