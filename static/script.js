document.getElementById('decoderForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const plaintext = document.getElementById('plaintext').value;
    const cipherSelect = document.getElementById('cipherSelect').value;
    const shift = document.getElementById('shift').value;
    const substitutionKey = document.getElementById('substitutionKey').value;
    const keyword = document.getElementById('keyword').value;

    const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plaintext, cipherSelect, shift, substitutionKey, keyword })
    });

    const result = await response.json();
    document.getElementById('encryptedText').textContent = result.encryptedText;
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('plaintext').value = '';
    document.getElementById('cipherSelect').value = 'caesar';
    document.getElementById('shift').value = '';
    document.getElementById('substitutionKey').value = '';
    document.getElementById('keyword').value = '';
    document.getElementById('encryptedText').textContent = '';
});

document.getElementById('cipherSelect').addEventListener('change', function() {
    const cipherSelect = document.getElementById('cipherSelect').value;
    if (cipherSelect === 'caesar') {
        document.getElementById('shiftGroup').style.display = 'block';
        document.getElementById('substitutionGroup').style.display = 'none';
        document.getElementById('keywordGroup').style.display = 'none';
    } else if (cipherSelect === 'substitution') {
        document.getElementById('shiftGroup').style.display = 'none';
        document.getElementById('substitutionGroup').style.display = 'block';
        document.getElementById('keywordGroup').style.display = 'none';
    } else if (cipherSelect === 'vigenere') {
        document.getElementById('shiftGroup').style.display = 'none';
        document.getElementById('substitutionGroup').style.display = 'none';
        document.getElementById('keywordGroup').style.display = 'block';
    }
});

// Initialize the visibility of cipher input fields
document.getElementById('cipherSelect').dispatchEvent(new Event('change'));

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const rows = Math.floor(canvas.height / fontSize);

const grid = [];
for (let x = 0; x < columns; x++) {
    grid[x] = [];
    for (let y = 0; y < rows; y++) {
        grid[x][y] = letters.charAt(Math.floor(Math.random() * letters.length));
    }
}

const activeSpots = [];

function draw() {
    ctx.fillStyle = '#000'; // Black background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px arial`;

    if (Math.random() > 0.9) { // Slightly reduced probability for slower spawning
        const x = Math.floor(Math.random() * columns);
        const y = Math.floor(Math.random() * rows);
        activeSpots.push({ x, y, opacity: 1 });
    }

    for (let i = activeSpots.length - 1; i >= 0; i--) {
        const spot = activeSpots[i];
        ctx.fillStyle = `rgba(0, 255, 0, ${spot.opacity})`;

        const radius = 3; // Radius of the circle

        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                if (dx * dx + dy * dy <= radius * radius) {
                    const nx = spot.x + dx;
                    const ny = spot.y + dy;
                    if (nx >= 0 && nx < columns && ny >= 0 && ny < rows) {
                        ctx.fillText(grid[nx][ny], nx * fontSize, ny * fontSize);
                    }
                }
            }
        }

        spot.opacity -= 0.03;
        if (spot.opacity <= 0) {
            activeSpots.splice(i, 1);
        }
    }

    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            if (Math.random() > 0.999) {
                grid[x][y] = letters.charAt(Math.floor(Math.random() * letters.length));
            }
        }
    }
}

setInterval(draw, 100);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let x = 0; x < columns; x++) {
        grid[x] = [];
        for (let y = 0; y < rows; y++) {
            grid[x][y] = letters.charAt(Math.floor(Math.random() * letters.length));
        }
    }
});
