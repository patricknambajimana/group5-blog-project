document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-image");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const imageInput = document.getElementById("imageInput");
  const authorInput = document.getElementById("author");
  const postList = document.getElementById("postList");

  // Get loggedInUser or set default
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {
    username: "GuestAuthor",
  };
  authorInput.value = loggedInUser.username;
  authorInput.disabled = true;

  // Render a single post
  function renderPost(post) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    // Create image URL if file exists
    let imageUrl = "";
    if (post.imageFile) {
      if (post.imageFile instanceof File) {
        imageUrl = URL.createObjectURL(post.imageFile);
      } else if (typeof post.imageFile === "string") {
        imageUrl = post.imageFile;
      }
    }

    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      ${
        imageUrl
          ? `<img src="${imageUrl}" alt="Post Image" style="max-width: 200px;">`
          : ""
      }
      <div class="post-meta">
        <span>By ${post.author}</span>
        <strong>${new Date(post.createdAt).toLocaleString()}</strong>
      </div>
      <hr>
    `;

    postList.prepend(postDiv);
  }

  // Handle form submission
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = descriptionInput.value.trim();
    const author = authorInput.value.trim();
    const imageFile = imageInput.value;
    const img = document.createElement("img");
    img.src = imageFile;

    if (!title || !content) {
      // Removed author check since it's disabled,
      alert("Please fill in all required fields.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      imageFile: imageFile || null, 
      author,
      createdAt: Date.now(),
    };

    // Save to localStorage
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    // Render immediately
    renderPost(newPost);

    postForm.reset();
    authorInput.value = loggedInUser.username; 
  });

  // Load existing posts on page load
  const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
  existingPosts.forEach((post) => renderPost(post));
});
