document.addEventListener("DOMContentLoaded", function () {
  const manualOption = document.getElementById("manual");
  const isbnOption = document.getElementById("isbn");

  // Sections to toggle
  const manualSection = document.getElementById("manualSection"); 
  const isbnSection = document.getElementById("isbnSection"); 

  function toggleSections() {
    if (manualOption.checked) {
      manualSection.style.display = "block";
      isbnSection.style.display = "none";
    } else if (isbnOption.checked) {
      manualSection.style.display = "none";
      isbnSection.style.display = "block";
    }
  }

  // Add listeners
  manualOption.addEventListener("change", toggleSections);
  isbnOption.addEventListener("change", toggleSections);

  // Run once on page load
  toggleSections();
});
const manualOption = document.getElementById("manual");
const isbnOption = document.getElementById("isbn");
const manualSection = document.getElementById("manualSection");
const isbnSection = document.getElementById("isbnSection");

const bookType = document.getElementById("bookType");
const bookCategory = document.getElementById("bookCategory");
const subcategorySection = document.getElementById("subcategorySection");

// Subcategories for each book type
const subcategories = {
  college: [
    "Bachelor of Agriculture (B.Sc. Agriculture)",
    "Bachelor of Architecture (B.Arch)",
    "Bachelor of Arts (BA)",
    "Bachelor of Ayurvedic Medicine & Surgery (BAMS)",
    "Bachelor of Business Administration (BBA)",
    "Bachelor of Commerce (B.Com)",
    "Bachelor of Computer Applications (BCA)",
    "Bachelor of Design (B.Des)",
    "Bachelor of Education (B.Ed)",
    "Bachelor of Engineering (B.E/B.Tech)",
    "Bachelor of Fine Arts (BFA)",
    "Bachelor of Hotel Management (BHM)",
    "Bachelor of Laws (LLB)",
    "Bachelor of Medicine & Surgery (MBBS)",
    "Bachelor of Pharmacy (B.Pharm)",
    "Bachelor of Science (B.Sc)",
    "Bachelor of Social Work (BSW)",
    "Bachelor of Technology (B.Tech)",
    "Master of Arts (MA)",
    "Master of Business Administration (MBA)",
    "Master of Commerce (M.Com)",
    "Master of Computer Applications (MCA)",
    "Master of Education (M.Ed)",
    "Master of Laws (LLM)",
    "Master of Pharmacy (M.Pharm)",
    "Master of Science (M.Sc)"
  ],
  exam: [
    "Arts, Design and Education Exams",
    "Banking & Insurance Recruitment Exams",
    "Civil Services Entrance Exams",
    "Defence Entrance Exams",
    "Engineering Entrance Exams",
    "Law Entrance Exams",
    "Management Entrance Exams",
    "Medical Entrance Exams",
    "Other Competitive Exams",
    "Post Graduation Entrance Exams",
    "Research & Fellowship Exams",
    "Teaching Entrance Exams"
  ],
  reading: [
    "Action & Adventure",
    "Arts, Film & Photography",
    "Biographies, Diaries & True Accounts",
    "Business & Economics",
    "Children & Young Adult",
    "Comics & Graphic Novels",
    "Computers & Internet",
    "Crafts, Home & Lifestyle",
    "Crime, Thriller & Mystery",
    "Health, Family & Personal Development",
    "History & Politics",
    "Humor",
    "Language, Linguistics & Writing",
    "Law",
    "Literature & Fiction",
    "Religion & Spirituality",
    "Science & Mathematics",
    "Science Fiction & Fantasy",
    "Self-Help",
    "Society & Social Sciences",
    "Sports",
    "Travel & Tourism"
  ],
  school: [
    "Pre-Primary (Nursery to UKG)",
    "Primary (Class 1 to 5)",
    "Middle (Class 6 to 8)",
    "Secondary (Class 9 to 10)",
    "Senior Secondary (Class 11 to 12 - Science)",
    "Senior Secondary (Class 11 to 12 - Commerce)",
    "Senior Secondary (Class 11 to 12 - Arts/Humanities)"
  ]
};

// Toggle between manual & ISBN
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

// Run on page load
toggleSections();
document.getElementById("fetchBtn").addEventListener("click", function () {
    const isbn = document.getElementById("isbnInput").value.trim();

    if (!isbn) {
        alert("Please enter an ISBN number");
        return;
    }

    // Google Books API URL
    const url = https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn};

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.totalItems > 0) {
                const book = data.items[0].volumeInfo;

                // Fill the HTML placeholders
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
const fileUploadDiv = document.getElementById("fileUploadDiv");
const uploadPhotos = document.getElementById("uploadPhotos");
const previewContainer = document.getElementById("previewContainer");

fileUploadDiv.addEventListener("click", () => {
    uploadPhotos.click(); // Open camera/gallery
});

uploadPhotos.addEventListener("change", () => {
    const files = uploadPhotos.files;

    if (files.length > 4) {
        alert("You can upload up to 4 images only.");
        uploadPhotos.value = ""; // reset selection
        previewContainer.innerHTML = "";
        return;
    }

    // Clear previous previews
    previewContainer.innerHTML = "";

    // Loop through files and display preview
    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "100px";       // adjust size
            img.style.height = "100px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "8px";
            previewContainer.appendChild(img);
        };

        reader.readAsDataURL(file); // Convert file to URL
    });
});