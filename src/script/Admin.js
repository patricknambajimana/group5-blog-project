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
  sidebar.innerHTML = `<h1>Hi <span>Name</span></h1>
            <ul>
                <li><a href="#">Blogs</a></li>
                <li><a href="#">Users List</a></li>
            </ul>
            <div class="profile">
                <div class="name-Abbrev">
                    <h2>TH</h2>
                </div>
                <a href="#">Logout</a>
            </div>`;
}
nav()

