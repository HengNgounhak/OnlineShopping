var btnSave = document.getElementById("saveBtn");
btnSave.addEventListener("click", saveComment());

function saveComment() {
    const formData = new FormData(document.querySelector('form'));
    let dataToSubmit = {};
    for (var pair of formData.entries()) {
        dataToSubmit[pair[0]] = pair[1];
    }
    axios.post('http://localhost:3000/comment', {
            dataToSubmit,
        })
        .then(result => {
            console.log(result);
            // render new post
            // let parentPost = document.getElementById("task-list");

            // let childPost = document.createElement("li");
            // childPost.innerHTML = `

            // <span id="taskTitle"><input type="checkbox"> ${result.data.data.title}</span>
            // <span id="time">7:00am</span>
            // <span class="icon">
            //     <i class="fas fa-edit"></i>
            //     <i class="fas fa-trash-alt"></i>
            // </span>`;
            // parentPost.appendChild(childPost);
        }).catch(err => {
            console.log(err);
        });
}