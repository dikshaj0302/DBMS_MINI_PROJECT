document.addEventListener("DOMContentLoaded", function () {
  const manualOption = document.getElementById("manual");
  const isbnOption = document.getElementById("isbn");
  const manualSection = document.getElementById("manualSection");
  const isbnSection = document.getElementById("isbnSection");

  const bookType = document.getElementById("bookType");
  const bookCategory = document.getElementById("bookCategory");
  const subcategorySection = document.getElementById("subcategorySection");

  const subcategories = {
    college: [
      "Bachelor of Agriculture (B.Sc. Agriculture)",
      "Bachelor of Architecture (B.Arch)",
      "Bachelor of Arts (BA)",
      "Bachelor of Commerce (B.Com)",
      "Bachelor of Science (B.Sc)"
    ],
    exam: ["Engineering Entrance Exams", "Law Entrance Exams", "Medical Entrance Exams"],
    reading: ["Fiction", "History", "Science", "Comics"],
    school: ["Primary", "Secondary", "Senior Secondary"]
  };

  function toggleSections() {
    if (manualOption.checked) {
      manualSection.style.display = "block";
      isbnSection.style.display = "none";
    } else if (isbnOption.checked) {
      manualSection.style.display = "none";
      isbnSection.style.display = "block";
    }
  }

  manualOption.addEventListener("change", toggleSections);
  isbnOption.addEventListener("change", toggleSections);
  toggleSections();

  // Populate subcategories when book type changes
  bookType.addEventListener("change", function () {
    const selected = bookType.value;
    bookCategory.innerHTML = '<option value="">Please select book category</option>';

    if (subcategories[selected]) {
      subcategories[selected].forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.toLowerCase().replace(/\s+/g, "_");
        option.textContent = cat;
        bookCategory.appendChild(option);
      });
      subcategorySection.style.display = "block";
    } else {
      subcategorySection.style.display = "none";
    }
  });

  // Fetch Book Details via ISBN
  document.getElementById("fetchBtn").addEventListener("click", function () {
    const isbn = document.getElementById("isbnInput").value.trim();
    if (!isbn) {
      alert("Please enter an ISBN number");
      return;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.totalItems > 0) {
          const book = data.items[0].volumeInfo;
          document.getElementById("bookTitle").textContent = book.title || "N/A";
          document.getElementById("bookAuthor").textContent = (book.authors && book.authors.join(", ")) || "N/A";
          document.getElementById("bookPublisher").textContent = book.publisher || "N/A";
          document.getElementById("bookDate").textContent = book.publishedDate || "N/A";
        } else {
          alert("No book found for this ISBN");
        }
      })
      .catch(error => {
        console.error("Error fetching book details:", error);
        alert("Something went wrong while fetching book details");
      });
  });

  // File upload preview
  const fileUploadDiv = document.getElementById("fileUploadDiv");
  const uploadPhotos = document.getElementById("uploadPhotos");
  const previewContainer = document.getElementById("previewContainer");

  fileUploadDiv.addEventListener("click", () => {
    uploadPhotos.click();
  });

  uploadPhotos.addEventListener("change", () => {
    const files = uploadPhotos.files;

    if (files.length > 4) {
      alert("You can upload up to 4 images only.");
      uploadPhotos.value = "";
      previewContainer.innerHTML = "";
      return;
    }

    previewContainer.innerHTML = "";

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });
});
