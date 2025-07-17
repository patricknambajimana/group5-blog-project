document.addEventListener("DOMContentLoaded", () => {
  const postList = document.getElementById("postList");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const imageInput = document.getElementById("imageInput");
  const authorInput = document.getElementById("author");
  const postForm = document.getElementById("post-image");

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  // RENDER FUNCTION
  window.renderPosts = function () {
    posts = JSON.parse(localStorage.getItem("posts")) || [];
    postList.innerHTML = "";

    posts
      .slice()
      .reverse()
      .forEach((post) => {
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
          <div class="actions">
            <button onclick="editPost(${post.id})">Edit</button>
            <button onclick="deletePost(${post.id})">Delete</button>
          </div>
        `;
        postList.appendChild(postDiv);
      });
  };

  // DELETE FUNCTION
  window.deletePost = function (postId) {
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  };

  // EDIT FUNCTION
  window.editPost = function (postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    titleInput.value = post.title;
    descriptionInput.value = post.content;
    imageInput.value = post.imageUrl || "";
    authorInput.value = post.author;

    // Scroll up to the form
    window.scrollTo({ top: 0, behavior: "smooth" });

    postForm.onsubmit = function (e) {
      e.preventDefault();

      const updatedPost = {
        ...post,
        title: titleInput.value.trim(),
        content: descriptionInput.value.trim(),
        imageUrl: imageInput.value.trim(),
        author: authorInput.value.trim(),
        createdAt: Date.now(),
      };

      posts = posts.map(p => (p.id === postId ? updatedPost : p));
      localStorage.setItem("posts", JSON.stringify(posts));
      renderPosts();

      postForm.reset();
      authorInput.value = updatedPost.author;
      postForm.onsubmit = null; // Restore original submit
    };
  };

  // INITIAL RENDER
  renderPosts();
});
