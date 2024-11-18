let myLibrary = [];

const bookCards = document.querySelector(".book-cards");
const addBtn = document.querySelector(".add-btn");
const modal = document.querySelector("#addBookModal");
const addBookForm = document.querySelector("#addBookForm");

// Close form when click outside
window.onclick = function (e) {
  // Check if the click happened on the modal itself (not the modal content)
  if (e.target === modal) {
    modal.classList.toggle("show");
  }
};

// Open form when add book
addBtn.addEventListener("click", () => {
  modal.classList.toggle("show");
});

// Check submit form
addBookForm.addEventListener("submit", (e) => {
  // Prevent the form from submitting
  e.preventDefault();

  // Get inputs
  const inputs = addBookForm.querySelectorAll("input, textarea");

  // Set default values when data is given by user
  const book = {
    description: "No description",
    cover: "./assets/book-covers-big-2019101610.jpg",
    isRead: false,
  };

  // If not user image, show the default image, else wait for the reader.onload
  let isUserImage = false;

  // Loop through inputs
  inputs.forEach((input) => {
    // Only get non-empty input
    if (input.value) {
      if (input.type === "file") {
        const file = input.files[0];

        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          isUserImage = true;

          reader.onload = function () {
            book[input.name] = reader.result; // Set the image data URL
            addNewBook(book);
          };
        }
      } else {
        book[input.name] = input.value;
      }
    }
  });

  if (!isUserImage) {
    addNewBook(book);
  }

  // Close the modal
  modal.classList.toggle("show");

  // Delete content of inputs
  inputs.forEach((input) => {
    input.value = "";
  });
});

function addNewBook(book) {
  book.id = Date.now();
  myLibrary.push(book);
  bookCards.appendChild(createBookCard(book));
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("book-card");

  //   Book cover
  const cover = document.createElement("div");
  const image = document.createElement("img");
  cover.classList.add("book-cover");
  image.src = book["cover"];
  image.alt = "Book Cover";
  cover.appendChild(image);

  //   Book info
  const info = document.createElement("div");
  const title = document.createElement("div");
  const titleHeader = document.createElement("h2");
  let state = document.createElement("span");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const genre = document.createElement("p");
  const description = document.createElement("p");
  const readToggleBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  info.classList.add("book-info");

  //   Book title
  title.classList.add("book-title");
  titleHeader.textContent = book["title"];
  title.appendChild(titleHeader);
  state.classList.add("title-state");
  state.textContent = "Unread";
  title.appendChild(state);

  //   Book author
  author.classList.add("book-author");
  author.textContent = `by ${book["author"]}`;

  //   Book pages
  pages.classList.add("book-pages");
  pages.textContent = `Pages: ${book["pages"]}`;

  //   Book genre
  genre.classList.add("book-genre");
  genre.textContent = `Genre: ${book["genre"]}`;

  //   Book description
  description.classList.add("book-description");
  description.textContent = `${book["description"]}`;

  //   Read toggle button
  readToggleBtn.classList.add("read-toggle-btn");
  readToggleBtn.textContent = "Mark as Read";
  state.textContent = "Unread";

  readToggleBtn.addEventListener("click", () => {
    const isRead = readToggleBtn.classList.toggle("read");
    state.classList.toggle("read");
    book["isRead"] = isRead;

    if (isRead) {
      readToggleBtn.textContent = "Mark as Unread";
      state.textContent = "Read";
    } else {
      readToggleBtn.textContent = "Mark as Read";
      state.textContent = "Unread";
    }
  });

  //   Remove button
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    card.remove();
    myLibrary = myLibrary.filter((b) => b.id !== book.id);
  });

  info.appendChild(title);
  info.appendChild(author);
  info.appendChild(pages);
  info.appendChild(description);
  info.appendChild(readToggleBtn);
  info.appendChild(removeBtn);

  card.appendChild(cover);
  card.appendChild(info);

  return card;
}
