// const userRoles = document.getElementById("roles");

// userRoles.addEventListener("change",()=>{
//     if(userRoles.value === "All"){
//     alert("all users")
// }
// else if(userRoles.value === "Admin"){
//     alert("Admin")
// }
// else if(userRoles.value === "Author"){
//     alert("Author")
// }
// else{
//     alert("error")
// }
// })

function nav() {
  const sidebar = document.querySelector(".nav");
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

const blogCards = document.querySelector(".blog-cards");
const renderBlogs = () => {
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
