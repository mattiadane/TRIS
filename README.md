# Tic Tac Toe – Web App

This project is a simple implementation of the classic **Tic Tac Toe** game, built using  
**HTML**, **CSS**, and **JavaScript**.  
It was my **first programming project**, created during secondary high school, which is why the UI is intentionally simple and based on basic HTML/CSS.

Despite being a beginner project, it includes full game logic, match tracking, and a small statistics visualization.

---

## 🎮 Game Overview

The application starts from `index.html`, where the rules of the game are displayed.  
By clicking **“Comincia a giocare”**, the user is taken to the main Tic Tac Toe game page.

Gameplay features:

- The game **always starts with player X**
- Players alternate turns placing **X** and **O**
- Win and draw conditions are automatically detected
- The board can be **reset at any time** using the restart button

---

## 🏆 Match System (First to 3 Wins)

The game supports more than a single round.  
A full match is played using a **first‑to‑three‑wins** system:

- The first player to reach **3 victories** wins the match  
- After the match ends, a **Chart.js graph** is displayed showing:
  - Number of wins by player X  
  - Number of wins by player O  

This adds a competitive element and makes the game more engaging.

---

## 📊 Technologies Used

- **HTML5**  
- **CSS3**  
- **JavaScript (Vanilla)**  
- **Chart.js** (for match statistics)

---

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/mattiadane/TRIS.git
   ```
2. Open `index.html` in any modern browser.

No additional setup is required.

---

## 👤 Author

Developed by **Mattia Danese**  
First project created during secondary high school.

