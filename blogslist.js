const form = document.getElementById('blogForm');
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const imageInput = document.getElementById('imageInput');
  const author = document.getElementById('author');
  const date = document.getElementById('date');
  const blogList = document.getElementById('blogList');

  let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  let editIndex = null;

  function renderBlogs() {
    postList.innerHTML = '';

    blogs.forEach((blog, index) => {
      const blogDisplay = document.createElement('div');
      blogDisplay.className = 'blog';
      blogDisplay.innerHTML = `
        // <h3>${blog.title}</h3>
        // <p><strong>Author:</strong> ${blog.author} | <strong>Date:</strong> ${blog.date}</p>
        // <img src="${blog.image || ''}" alt="Blog Image" style="max-width: 200px; display: ${blog.image ? 'block' : 'none'};">
        // <p>${blog.description}</p>


        <div id ="actions-buttons">
          <button onclick="editBlog(${index})">Edit</button>
          <button onclick="deleteBlog(${index})">Delete</button>
        </div>
      `;
      blogList.appendChild(blogDisplay);
    });
  }

  function resetForm() {
    form.reset();
    editIndex = null;
  }

  function saveBlogs() {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const blog = {
      title: title.value.trim(),
      description: description.value.trim(),
      image: '', 
      author: author.value.trim(),
      date: date.value,
    };

    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        blog.image = reader.result;

        if (editIndex !== null) {
          blogs[editIndex] = blog;
        } else {
          blogs.push(blog);
        }

        saveBlogs();
        renderBlogs();
        resetForm();
      };
      reader.readAsDataURL(file);
    } else {
      if (editIndex !== null) {
        blogs[editIndex] = blog;
      } else {
        blogs.push(blog);
      }
      saveBlogs();
      renderBlogs();
      resetForm();
    }
  });

  window.editBlog = function (index) {
    const blog = blogs[index];
    title.value = blog.title;
    description.value = blog.description;
    author.value = blog.author;
    date.value = blog.date;
    editIndex = index;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.deleteBlog = function (index) {
    if (confirm('Are you sure you want to delete this blog?')) {
      blogs.splice(index, 1);
      saveBlogs();
      renderBlogs();
    }
  };

  // Initial load
  renderBlogs();