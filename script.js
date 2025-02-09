document.addEventListener('DOMContentLoaded', () => {
  const gameListSection = document.getElementById('game-list');
  const categoryLinks = document.querySelectorAll('nav a');
  const searchBar = document.getElementById('search-bar');

  // Admin Panel elements
  const adminPanelButton = document.getElementById('admin-panel-button');
  const adminPanel = document.getElementById('admin-panel');
  const adminPasswordInput = document.getElementById('admin-password');
  const adminLoginButton = document.getElementById('admin-login');
  const addGameForm = document.getElementById('add-game-form');
  const addGameButton = document.getElementById('add-game');
  const gameTitleInput = document.getElementById('game-title');
  const gameCategorySelect = document.getElementById('game-category');
  const gameImageUrlInput = document.getElementById('game-image-url');
  const gameUrlInput = document.getElementById('game-url');

  // Category creation elements
  const newCategoryNameInput = document.getElementById('new-category-name');
  const createCategoryButton = document.getElementById('create-category-button');
  const navUl = document.querySelector('nav ul');

  // Style Switcher elements
  const styleButton = document.getElementById('style-button');
  const styleOptions = document.getElementById('style-options');
  const themeButtons = document.querySelectorAll('#style-options button');

  let games = [];

  function displayGames(gamesToDisplay) {
    gameListSection.innerHTML = '';
    gamesToDisplay.forEach(game => {
      const gameCard = document.createElement('div');
      gameCard.classList.add('game-card');
      gameCard.innerHTML = `
        <a href="${game.url}">
          <img src="${game.imageUrl}" alt="${game.title}">
          <h3>${game.title}</h3>
        </a>
      `;
      gameListSection.appendChild(gameCard);
    });
  }

  function filterGames(category) {
    if (category === 'all') {
      displayGames(games);
    } else {
      const filteredGames = games.filter(game => game.category === category);
      displayGames(filteredGames);
    }
  }

  categoryLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const category = link.dataset.category;
      filterGames(category);
    });
  });

  searchBar.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredGames = games.filter(game =>
      game.title.toLowerCase().includes(searchTerm)
    );
    displayGames(filteredGames);
  });

  // Admin Panel Functionality
  adminPanelButton.addEventListener('click', () => {
    adminPanel.style.display = adminPanel.style.display === 'block' ? 'none' : 'block';
  });

  adminLoginButton.addEventListener('click', () => {
    const password = adminPasswordInput.value;
    if (password === '45674567') {
      addGameForm.style.display = 'block';
      adminPasswordInput.style.display = 'none';
      adminLoginButton.style.display = 'none';
      document.getElementById('create-category-container').style.display = 'block';

    } else {
      alert('Incorrect password');
    }
  });

  addGameButton.addEventListener('click', () => {
    const newGame = {
      title: gameTitleInput.value,
      category: gameCategorySelect.value,
      imageUrl: gameImageUrlInput.value,
      url: gameUrlInput.value
    };

    games.push(newGame);
    displayGames(games);
    addCategoryToSelect(newGame.category);

    // Clear the form
    gameTitleInput.value = '';
    gameCategorySelect.value = 'adventure';
    gameImageUrlInput.value = '';
    gameUrlInput.value = '';
  });

  // Category Creation Functionality
  document.getElementById('create-category-button').addEventListener('click', () => {
    const newCategoryName = newCategoryNameInput.value.trim();
    if (newCategoryName !== '') {
      addCategoryToNav(newCategoryName);
      addCategoryToSelect(newCategoryName);
      newCategoryNameInput.value = '';
    }
  });

  function addCategoryToNav(categoryName) {
    const newLi = document.createElement('li');
    const newA = document.createElement('a');
    newA.href = '#';
    newA.dataset.category = categoryName.toLowerCase();
    newA.textContent = categoryName;

    newA.addEventListener('click', (event) => {
      event.preventDefault();
      const category = newA.dataset.category;
      filterGames(category);
    });

    newLi.appendChild(newA);
    navUl.appendChild(newLi);
  }

  function addCategoryToSelect(categoryName) {
      let categoryExists = false;
      for (let i = 0; i < gameCategorySelect.options.length; i++) {
          if (gameCategorySelect.options[i].value === categoryName.toLowerCase()) {
              categoryExists = true;
              break;
          }
      }

      if (!categoryExists) {
          const newOption = document.createElement('option');
          newOption.value = categoryName.toLowerCase();
          newOption.textContent = categoryName;
          gameCategorySelect.appendChild(newOption);
      }
  }

  // Style Switcher Functionality
  styleButton.addEventListener('click', () => {
    styleOptions.style.display = styleOptions.style.display === 'block' ? 'none' : 'block';
  });

  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.dataset.theme;
      document.body.className = theme;
    });
  });

  // Initial display of all games
  displayGames(games);
});