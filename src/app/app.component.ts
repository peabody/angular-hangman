import { Component, OnInit, OnDestroy } from '@angular/core';

const HANG_MAN =
`----
|   |
|   o
|  /|\\
|  / \\
-
 |`;

const PARTS = [15, 20, 21, 22, 27, 29];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'hangman';
  wordInput = '';
  needWord = true;
  currentWord: string[] = [];
  currentFound: string[] = [];
  guessedLetters: string[] = [];
  gameOver = false;
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  lettersLeft: string[] = [];
  partsCounter = 0;
  hangMan = HANG_MAN.split('').map((val, i) => PARTS.includes(i) ? ' ' : val );

  onWordSubmit() {
    this.needWord = false;
    this.currentWord = this.wordInput.toUpperCase().split('');
    this.currentFound = this.currentWord.map((i) => i.match(/[A-Z]/) ? null : i);
    this.guessedLetters = [];
    document.addEventListener('keypress', this.onKey);
    return true;
  }

  guessLetter = (val: string) => {
    const letter = val.toUpperCase();
    if (!this.guessedLetters.includes(letter)) {
      this.guessedLetters.push(letter);
      this.alphabet = this.alphabet.filter(i => i !== letter);
      if (!this.revealLetter(letter)) {
        console.log('draw going to be called');
        this.draw();
      }
      this.checkWinLoss();
    } else {
      // post snack bar message
    }
  }

  revealLetter(letter: string) {
    let found = false;
    for (let i = 0; i < this.currentWord.length; i++) {
      if (this.currentWord[i] === letter) {
        this.currentFound[i] = letter;
        found = true;
      }
    }

    return found;
  }

  draw() {
    this.partsCounter++;
    this.hangMan = HANG_MAN.split('').map((val, i) => PARTS.slice(this.partsCounter).includes(i) ? ' ' : val );
  }

  checkWinLoss() {
    if (this.partsCounter === 6 || !this.currentFound.includes(null)) {
      this.alphabet = [];
      this.currentFound = this.currentWord;
      this.gameOver = true;
      document.removeEventListener('keypress', this.onKey);
    }
  }

  reset() {
    this.wordInput = '';
    this.needWord = true;
    this.currentWord = [];
    this.currentFound = [];
    this.guessedLetters = [];
    this.gameOver = false;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    this.lettersLeft = [];
    this.partsCounter = 0;
    this.hangMan = HANG_MAN.split('').map((val, i) => PARTS.includes(i) ? ' ' : val );
  }

  onKey = (e) => {
    if (!this.gameOver && e.key.match(/[a-zA-Z]/)) {
      this.guessLetter(e.key);
    }
  }

  ngOnInit(): void {
    this.reset();
  }

  ngOnDestroy(): void {
  }
}
