document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-image");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const imageInput = document.getElementById("imageInput");
  const authorInput = document.getElementById("author");
  const postList = document.getElementById("postList");
const name = document.getElementById("authorname")

  // Get loggedInUser or set default
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {
    username: "GuestAuthor",
  };
  authorInput.value = loggedInUser.username;
  authorInput.disabled = true;
  name.textContent=loggedInUser.username;

  // Render a single post
  function renderPost(post) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      ${
        post.imageUrl
          ? `<a href="${post.imageUrl}" target="_blank"><img src="${post.imageUrl}" alt="Post image" class="postimage"></a>`
          : ""
      }
      <div class="post-meta">
        <span>By ${post.author}</span>
        <strong>${new Date(post.createdAt).toLocaleString()}</strong>
      </div>
    
    `;

    postList.prepend(postDiv);
  }

  // Handle form submission
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = descriptionInput.value.trim();
    const author = authorInput.value.trim();
    const imageUrl = imageInput.value.trim(); // Changed from imageFile to imageUrl for clarity

    if (!title || !content) {
      alert("Please fill in all required fields.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      imageUrl: imageUrl || null, // Store URL (or null if empty)
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
