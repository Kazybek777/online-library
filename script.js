const books = [
  {
    id: 1,
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    category: 'Классика',
    cover: 'https://kartinki.pibig.info/uploads/posts/2023-04/1682442197_kartinki-pibig-info-p-kartinki-dlya-oblozhki-muzikalnogo-alboma-64.jpg'
  },
  {
    id: 2,
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    category: 'Классика',
    cover: 'https://kartinki.pibig.info/uploads/posts/2023-04/1682442133_kartinki-pibig-info-p-kartinki-dlya-oblozhki-muzikalnogo-alboma-17.jpg'
  },
  {
    id: 3,
    title: '1984',
    author: 'Джордж Оруэлл',
    category: 'Фантастика',
    cover: 'https://kartinki.pibig.info/uploads/posts/2023-04/1682442155_kartinki-pibig-info-p-kartinki-dlya-oblozhki-muzikalnogo-alboma-2.jpg'
  },
  {
    id: 4,
    title: 'Шерлок Холмс',
    author: 'Артур Конан Дойл',
    category: 'Детектив',
    cover: 'https://kartinki.pibig.info/uploads/posts/2023-04/1682442193_kartinki-pibig-info-p-kartinki-dlya-oblozhki-muzikalnogo-alboma-32.jpg'
  },
  {
    id: 5,
    title: 'Гарри Поттер и философский камень',
    author: 'Дж. К. Роулинг',
    category: 'Фэнтези',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvuOJKhl79TIowOL-VJh9vfvpK9-dQTN2nYg&s'
  },
  {
    id: 6,
    title: 'Евгений Онегин',
    author: 'Александр Пушкин',
    category: 'Поэзия',
    cover: 'https://cs11.pikabu.ru/post_img/2019/01/03/11/1546543628148719348.jpg'
  },
  {
    id: 7,
    title: 'Три товарища',
    author: 'Эрих Мария Ремарк',
    category: 'Роман',
    cover: 'https://kartinki.pibig.info/uploads/posts/2023-04/1682442152_kartinki-pibig-info-p-kartinki-dlya-oblozhki-muzikalnogo-alboma-40.jpg'
  },
  {
    id: 8,
    title: 'Война и мир',
    author: 'Лев Толстой',
    category: 'Классика',
    cover: 'https://kartinki.pibig.info/uploads/posts/2023-04/1682442196_kartinki-pibig-info-p-kartinki-dlya-oblozhki-muzikalnogo-alboma-1.jpg'
  },
  {
    id: 9,
    title: 'Маленький принц',
    author: 'Антуан де Сент-Экзюпери',
    category: 'Детская',
    cover: 'https://kartinki.pibig.info/uploads/posts/2023-04/1682442196_kartinki-pibig-info-p-kartinki-dlya-oblozhki-muzikalnogo-alboma-38.jpg'
  },
  {
    id: 10,
    title: 'Атлант расправил плечи',
    author: 'Айн Рэнд',
    category: 'Философия',
    cover: 'https://kartinki.pibig.info/uploads/posts/2023-04/thumbs/1682442212_kartinki-pibig-info-p-kartinki-dlya-oblozhki-muzikalnogo-alboma-71.jpg'
  }
];

const allCategories = [...new Set(books.map(book => book.category))];
allCategories.sort();

const booksContainer = document.getElementById('books-container');
const bookForm = document.getElementById('book-form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const categoryFilter = document.querySelector('.category-filter');
const categoryOptions = document.getElementById('category-options');
const categoryInput = document.getElementById('category');

let selectedCategory = 'all';
let currentSearchTerm = '';

function initCategoryButtons() {
  categoryFilter.querySelectorAll('.category-btn:not([data-category="all"])').forEach(btn => btn.remove());
  categoryOptions.innerHTML = '';

  allCategories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    btn.textContent = category;
    btn.dataset.category = category;
    btn.addEventListener('click', filterByCategory);
    categoryFilter.appendChild(btn);

    const option = document.createElement('div');
    option.className = 'category-option';
    option.textContent = category;
    option.dataset.category = category;
    option.addEventListener('click', selectCategory);
    categoryOptions.appendChild(option);
  });

  if (allCategories.length > 0) {
    const firstOption = categoryOptions.querySelector('.category-option');
    if (firstOption) {
      firstOption.classList.add('selected');
      categoryInput.value = firstOption.dataset.category;
    }
  }
}

function displayBooks(booksToDisplay) {
  booksContainer.innerHTML = '';

  if (booksToDisplay.length === 0) {
    const noBooks = document.createElement('div');
    noBooks.className = 'no-books';
    noBooks.textContent = 'Книги не найдены';
    booksContainer.appendChild(noBooks);
    return;
  }

  booksToDisplay.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';

    const colors = ['#e1f5fe', '#e8f5e9', '#f3e5f5', '#fff3e0', '#e0f7fa'];
    const color = colors[book.id % colors.length];

    bookCard.innerHTML = `
        <div class="book-cover" style="background-color: ${color}">
          ${book.cover ? `<img src="${book.cover}" alt="${book.title}" style="max-width:100%; max-height:100%;">` : book.title.charAt(0)}
        </div>
        <div class="book-info">
          <div class="book-title">${book.title}</div>
          <div class="book-author">${book.author}</div>
          <span class="book-category">${book.category}</span>
       
        </div>
      `;

    booksContainer.appendChild(bookCard);
    bookCard.addEventListener('click', () => {
      showBookDetails(book);
    });
  });
}
function showBookDetails(book) {
  const modal = document.getElementById('book-modal');
  const modalContent = modal.querySelector('.modal-content');

  modalContent.innerHTML = `
      <span class="close-button">&times;</span>
      <h2>${book.title}</h2>
      <p><strong>Автор:</strong> ${book.author}</p>
      <p><strong>Категория:</strong> ${book.category}</p>
      
        <a href="https://wa.me/+996555102030" target="_blank"><button class="book-details-btn">Купить</button></a> 
      ${book.cover ? `<img src="${book.cover}" alt="${book.title}" class="modal-cover">` : ''}
    `;

  modal.style.display = 'block';

  modal.querySelector('.close-button').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}


function filterByCategory(e) {
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  e.target.classList.add('active');
  selectedCategory = e.target.dataset.category;
  applyFilters();
}

function searchBooks() {
  currentSearchTerm = searchInput.value.toLowerCase();
  applyFilters();
}

function applyFilters() {
  let filteredBooks = [...books];

  if (selectedCategory !== 'all') {
    filteredBooks = filteredBooks.filter(book => book.category === selectedCategory);
  }

  if (currentSearchTerm) {
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(currentSearchTerm) ||
      book.author.toLowerCase().includes(currentSearchTerm) ||
      book.category.toLowerCase().includes(currentSearchTerm)
    );
  }

  displayBooks(filteredBooks);
}

function selectCategory(e) {
  document.querySelectorAll('.category-option').forEach(option => {
    option.classList.remove('selected');
  });

  e.target.classList.add('selected');
  categoryInput.value = e.target.dataset.category;
}

function updateCategories(category) {
  if (!allCategories.includes(category)) {
    allCategories.push(category);
    allCategories.sort();
    initCategoryButtons();
  }
}

function resetCategorySelection() {
  document.querySelectorAll('.category-option').forEach(option => {
    option.classList.remove('selected');
  });
  const firstOption = categoryOptions.querySelector('.category-option');
  if (firstOption) {
    firstOption.classList.add('selected');
    categoryInput.value = firstOption.dataset.category;
  }
}

bookForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const category = document.getElementById('category').value;
  const fileInput = document.getElementById('cover');
  const file = fileInput.files[0];

  if (!title || !author || !category) return;

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const newBook = {
        id: books.length + 1,
        title,
        author,
        category,
        cover: e.target.result
      };

      books.push(newBook);
      updateCategories(category);
      applyFilters();
      bookForm.reset();
      resetCategorySelection();
    };
    reader.readAsDataURL(file);
  } else {
    const newBook = {
      id: books.length + 1,
      title,
      author,
      category,
      cover: null
    };

    books.push(newBook);
    updateCategories(category);
    applyFilters();
    bookForm.reset();
    resetCategorySelection();
  }
});

searchButton.addEventListener('click', searchBooks);
searchInput.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    searchBooks();
  }
});

initCategoryButtons();
applyFilters();

