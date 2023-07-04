import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-analytics.js";
import { getDatabase, push, set, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


 const firebaseConfig = {
    apiKey: "AIzaSyDWQJCSxf7icqywTHFm3JC3_PTmzi3QKEg",
    authDomain: "todo-app-with-database-6e035.firebaseapp.com",
    projectId: "todo-app-with-database-6e035",
    storageBucket: "todo-app-with-database-6e035.appspot.com",
    messagingSenderId: "554762508322",
    appId: "1:554762508322:web:2bbdda1100d7d6c500127b",
    measurementId: "G-DTQHY05L0G"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Db = getDatabase()

//FIreBase Khtm//


window.add = function () {
    var obj = {
        todo: document.getElementById('a').value
    }

    var Userref = push(ref(Db, 'Todos/'))
    obj.id = Userref.key

    set(Userref, obj)
}


window.get = function () {
    var render = document.getElementById('render')

    onValue(ref(Db, 'Todos/'), function (todo) {
        render.innerHTML = ""
        var Todos = Object.values(todo.val())
        for (var i = 0; i < Todos.length; i++) {
            var app = Todos[i]
            console.log(app.todo)
            render.innerHTML += `<p class="text-center d-flex justify-content-evenly ms-3 pt-4">TODO : ${app.todo}   <button onclick="TodoUpdate('${app.id}')" class="btn bg-success p-2 px-5  text-light">EDIT</button>
    <button onclick="Tododel('${app.id}')" class="btn bg-danger text-center p-2 px-5  text-light">DELETE</button> </p> <br/>`

        }
        var a = document.getElementById('a').value = ""

    })
}
get()
window.Tododel = function (id) {
    remove(ref(Db, `Todos/${id}`))
}
window.deleteAll = function (id) {
    remove(ref(Db, `Todos/`))
}

window.TodoUpdate = function (id) {
    // console.log(id);
    var NewTodo = prompt('Enter Update')

    update(ref(Db, `Todos/${id}`), {
        todo: NewTodo
    })
}