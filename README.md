# CipherEncrypter
Cipher Encrypter
Overview
Welcome to the Cipher Encrypter project! This project allows you to encrypt plaintext using three different cipher techniques: Caesar Cipher, Substitution Cipher, and Vigenère Cipher. The application features a visually appealing interface with a Matrix-style digital rain background.

Features
Caesar Cipher Encryption: Encrypts plaintext by shifting each letter by a specified number of positions.
Substitution Cipher Encryption: Encrypts plaintext using a specified substitution key.
Vigenère Cipher Encryption: Encrypts plaintext using a keyword to create a polyalphabetic substitution.
Matrix-Style Background: Aesthetic, live Matrix-style digital rain background.
Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Flask, Python
Styling: Custom CSS for neon green text and dark theme
Usage
Open the application in your browser (usually http://localhost:5000).
Enter the plaintext you want to encrypt.
Select the cipher technique (Caesar, Substitution, or Vigenère).
Provide the required parameters:
For Caesar Cipher: Enter the shift value (1-8).
For Substitution Cipher: Enter the substitution key (a permutation of the alphabet).
For Vigenère Cipher: Enter the keyword.
Click the "Encrypt" button to get the encrypted text.
The encrypted text will be displayed in the "Encrypted Text" field.
Debugging Steps
Print Statements
Used various print statements in the Flask backend for debugging:
Printing received plaintext, selected cipher, and parameters.
Printing data before and after encryption.
Printing error messages and stack traces.
Console Logs
Used console.log() extensively in the JavaScript code to verify data flows and UI updates:
Logging form submissions and API responses.
Logging state changes and data flows.
Backend Logs
Checked Flask logs to monitor requests, data processing, and potential errors.
Functionality
Caesar Cipher Encryption
Data Structure: A list to store the encrypted characters.
Algorithm:
Shift each letter by the specified number of positions.
Append the shifted character to the list.
Join the list to form the encrypted string.
Substitution Cipher Encryption
Data Structure: A list to store the encrypted characters.
Algorithm:
Create a mapping of each letter to its substitution based on the provided key.
Substitute each letter in the plaintext according to the mapping.
Append the substituted character to the list.
Join the list to form the encrypted string.
Vigenère Cipher Encryption
Data Structure: A list to store the encrypted characters.
Algorithm:
Repeat the keyword to match the length of the plaintext.
Shift each letter of the plaintext by the corresponding letter of the repeated keyword.
Append the shifted character to the list.
Join the list to form the encrypted string.
Matrix-Style Background
Implementation: Custom CSS and JavaScript to create a live Matrix-style digital rain background.
Example Input and Expected Output
Caesar Cipher

Plaintext: HELLO WORLD
Shift: 3
Encrypted Text: KHOOR ZRUOG
Substitution Cipher

Plaintext: HELLO WORLD
Substitution Key: QWERTYUIOPASDFGHJKLZXCVBNM
Encrypted Text: ITSSG VGKSR
Vigenère Cipher

Plaintext: HELLO WORLD
Keyword: KEY
Encrypted Text: RIJVS UYVJN
