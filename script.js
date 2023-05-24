// Store the lines from the text files
let lines1 = [];
let lines2 = [];

// Fetch the lines from the first text file
fetch('lines1.txt')
  .then(response => response.text())
  .then(data => {
    lines1 = data.split('\n');
    lines1 = lines1.map(line => formatLine(line.trim())).filter(line => line !== ''); // Format each line and remove empty lines
  })
  .catch(error => console.log('Error fetching lines1:', error));

// Fetch the lines from the second text file
fetch('lines2.txt')
  .then(response => response.text())
  .then(data => {
    lines2 = data.split('\n');
    lines2 = lines2.map(line => formatLine(line)); // Format each line
  })
  .catch(error => console.log('Error fetching lines2:', error));

// Function to format the line and italicize text within parentheses
function formatLine(line) {
  return line.replace(/\((.*?)\)/g, '<em>($1)</em>');
}

// Function to display a random line as a popup
function displayRandomLine(lines, popupContainer, popupId) {
  // Generate a random index to select a random line
  const randomIndex = Math.floor(Math.random() * lines.length);

  // Create a popup element to display the random line
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.id = popupId;

  const formattedLine = formatLine(lines[randomIndex]); // Format the line with italicized text
  popup.innerHTML = formattedLine;

  // Clear any existing popups
  const existingPopups = document.querySelectorAll('.popup');
  existingPopups.forEach(popup => popup.remove());

  // Add the popup to the container
  popupContainer.appendChild(popup);
}

// Add a click event listener to the MTG card
const mtgCard = document.getElementById('pic4');
const popupContainer = document.getElementById('popup-container'); // Reference the popup container

mtgCard.addEventListener('click', () => displayRandomLine(lines1, popupContainer, 'popup1'));

// Add a click event listener to the second MTG card
const mtgCard2 = document.getElementById('mtg-card2');
const popupContainer2 = document.getElementById('popup-container2'); // Reference the second popup container

mtgCard2.addEventListener('click', () => {
  let line1 = lines2[Math.floor(Math.random() * lines2.length)];
  let line2 = lines2[Math.floor(Math.random() * lines2.length)];

  // Generate a new value for line2 until it is different from line1
  while (line2 === line1) {
    line2 = lines2[Math.floor(Math.random() * lines2.length)];
  }
  const combinedLine = line1 + ' and ' + line2.trim() + '.';
  const formattedLine = formatLine(combinedLine);

  // Create a popup element to display the combined line
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.id = 'popup2';
  popup.innerHTML = formattedLine;

  // Clear any existing popups
  const existingPopups = document.querySelectorAll('.popup');
  existingPopups.forEach(popup => popup.remove());

  // Add the popup to the container
  popupContainer2.appendChild(popup);
});

// Remove the popups when clicking anywhere on the page
document.addEventListener('click', (event) => {
  if (!event.target.closest('#pic4, #mtg-card2')) {
    const existingPopups = document.querySelectorAll('.popup');
    existingPopups.forEach(popup => popup.remove());
  }
});
