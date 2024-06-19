from flask import Flask, request, jsonify, render_template
import string

app = Flask(__name__)

# Caesar Cipher Encryption
def encrypt_caesar(plaintext, shift):
    alphabet = string.ascii_uppercase
    encrypted = []
    for char in plaintext:
        if char.upper() in alphabet:
            idx = (alphabet.index(char.upper()) + shift) % 26
            encrypted.append(alphabet[idx] if char.isupper() else alphabet[idx].lower())
        else:
            encrypted.append(char)
    return ''.join(encrypted)

# Substitution Cipher Encryption
def encrypt_substitution(plaintext, key):
    alphabet = string.ascii_uppercase
    key_map = {alphabet[i]: key[i] for i in range(len(alphabet))}
    encrypted = []
    for char in plaintext:
        if char.upper() in key_map:
            encrypted.append(key_map[char.upper()] if char.isupper() else key_map[char.upper()].lower())
        else:
            encrypted.append(char)
    return ''.join(encrypted)

# Vigenère Cipher Encryption
def encrypt_vigenere(plaintext, keyword):
    alphabet = string.ascii_uppercase
    keyword_repeated = (keyword * (len(plaintext) // len(keyword) + 1))[:len(plaintext)]
    encrypted = []
    keyword_index = 0
    for p_char in plaintext:
        if p_char.upper() in alphabet:
            p_idx = alphabet.index(p_char.upper())
            k_idx = alphabet.index(keyword_repeated[keyword_index].upper())
            encrypted_char = alphabet[(p_idx + k_idx) % 26]
            encrypted.append(encrypted_char if p_char.isupper() else encrypted_char.lower())
            keyword_index += 1
        else:
            encrypted.append(p_char)
    return ''.join(encrypted)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/encrypt', methods=['POST'])
def encrypt_route():
    data = request.get_json()
    plaintext = data.get('plaintext')
    cipherSelect = data.get('cipherSelect')
    shift = data.get('shift')
    substitutionKey = data.get('substitutionKey')
    keyword = data.get('keyword')

    if cipherSelect == 'caesar':
        encrypted_text = encrypt_caesar(plaintext, int(shift))
    elif cipherSelect == 'substitution':
        encrypted_text = encrypt_substitution(plaintext, substitutionKey)
    elif cipherSelect == 'vigenere':
        encrypted_text = encrypt_vigenere(plaintext, keyword)
    else:
        encrypted_text = 'Cipher not implemented yet'

    return jsonify({'encryptedText': encrypted_text})

if __name__ == '__main__':
    app.run(debug=True)
