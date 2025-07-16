const userRoles = document.getElementById("roles");

userRoles.addEventListener("change",()=>{
    if(userRoles.value === "All"){
    alert("all users")
}
else if(userRoles.value === "Admin"){
    alert("Admin")
}
else if(userRoles.value === "Author"){
    alert("Author")
}
else{
    alert("error")
}
})

