// creating dynamic nav bar
function nav() {
  const sidebar = document.querySelector(".nav");
  if (!sidebar) return;
  sidebar.innerHTML = `<h1>Hi <span id="UserName">Name</span></h1>
            <ul>
                <li><a href="./AdminBlog.html">Blogs</a></li>
                <li><a href="./Admin.html">Users List</a></li>
            </ul>
            <div class="profile">
                <div class="name-Abbrev">
                    <h2>TH</h2>
                </div>
                <a href="/src/pages/Login.html">Logout</a>
            </div>`;
}
nav();

// rendering blog posts to admin pages

const renderBlogs = () => {
  const blogCards = document.querySelector(".blog-cards");
  if (!blogCards) return;
  const blogs = JSON.parse(localStorage.getItem("posts"));
  const blogposts = Array.isArray(blogs) ? blogs : [];

  blogposts.forEach((blog) => {
    const contents =
      blog.content.split(" ").slice(0, 20).join(" ") + `.........`;
    blogCards.innerHTML += `
     <div class="card">
                    <div class="image">
                        <img src=${blog.imageUrl} alt="">
                    </div>
                    <div class="contents">
                        <div class="groupItems">
                            <p>${blog.createdAt}</p>
                            <p>Author: <span id="authorName">${blog.author}</span></p>
                        </div>
                        <h3 id="blog-title">${blog.title}</h3>
                        <p class="paragraph">${contents}</p>
                        <a class="readMore">Read more</a>
                       
                    </div>`;
  });
};
renderBlogs();

const tbody = document.getElementById("tbody");
const registeredUsers = JSON.parse(localStorage.getItem("users"));
const users = Array.isArray(registeredUsers) ? registeredUsers : [];
const displayUsers = () => {
  users.map((user) => {
    tbody.innerHTML += `
         <tr>
                <td>${user.id}</td>
                <td id="uName">${user.username}</td>
                <td id="role">${user.role}</td>
                <td class="Actions">
                  <button>Edit</button><button>Delete</button>
                </td>
              </tr>
   `;
  });
};
displayUsers();

// filtering Users

const roles = document.querySelector("#roles");

const displaySelected = () => {
  roles.addEventListener("change", () => {
    if(roles.value === "Admin"){
      tbody.innerHTML = "";
    users.filter((role) => role.role.toLowerCase() === "admin")
    .map(users =>tbody.innerHTML += `
         <tr>
                <td>${users.id}</td>
                <td id="uName">${users.username}</td>
                <td id="role">${users.role}</td>
                <td class="Actions">
                  <button>Edit</button><button>Delete</button>
                </td>
              </tr>
   `)
    }
    else if(roles.value === "Author"){
      tbody.innerHTML = "";
    users.filter((role) => role.role.toLowerCase() === "author")
    .map(users =>tbody.innerHTML += `
         <tr>
                <td>${users.id}</td>
                <td id="uName">${users.username}</td>
                <td id="role">${users.role}</td>
                <td class="Actions">
                  <button>Edit</button><button>Delete</button>
                </td>
              </tr>
   `)
    }
    else{
      displayUsers();
    }

    //   if(roles.value === "Admin"){
    //     users.map(users =>     tbody.innerHTML += `
    //        <tr>
    //               <td>${users.id}</td>
    //               <td id="uName">${users.username}</td>
    //               <td id="role">${users.role}</td>
    //               <td class="Actions">
    //                 <button>Edit</button><button>Delete</button>
    //               </td>
    //             </tr>
    //  `)
    //   }
  });
};

displaySelected();
