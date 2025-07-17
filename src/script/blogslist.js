document.addEventListener("DOMContentLoaded", () => {
  const postList = document.getElementById("postList");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const imageInput = document.getElementById("imageInput");
  const authorInput = document.getElementById("author");
  const postForm = document.getElementById("post-image");

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let editIndex = null;

  window.renderPosts = function () {
    posts = JSON.parse(localStorage.getItem("posts")) || [];
    postList.innerHTML = "";

    posts
      .slice()
      .reverse()
      .forEach((post, index) => {
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
            <button onclick="editPost(${posts.length - 1 - index})">Edit</button>
            <button onclick="deletePost(${posts.length - 1 - index})">Delete</button>
          </div>
        `;
        postList.appendChild(postDiv);
      });
  };

  window.deletePost = function (index) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  };

  window.editPost = function (index) {
    const post = posts[index];
    titleInput.value = post.title;
    descriptionInput.value = post.content;
    imageInput.value = post.imageUrl || "";
    authorInput.value = post.author;
    editIndex = index;

    // Scroll up to the form
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Override submit behavior for edit
    postForm.onsubmit = function (e) {
      e.preventDefault();

      post.title = titleInput.value.trim();
      post.content = descriptionInput.value.trim();
      post.imageUrl = imageInput.value.trim();
      post.author = authorInput.value.trim();
      post.createdAt = Date.now();

      posts[index] = post;
      localStorage.setItem("posts", JSON.stringify(posts));

      renderPosts();

      postForm.reset();
      authorInput.value = post.author;
      editIndex = null;

      // Restore normal post submit behavior
      postForm.onsubmit = null;
    };
  };

  // Initial render
  renderPosts();
});
