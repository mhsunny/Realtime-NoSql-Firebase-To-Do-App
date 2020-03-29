"# Javascript noSql firebase To-do list web app" 

This is a javascript web app using es6, and firebase nosql database

# Created by:
<p><a href="https://www.mmhsunny.com/" rel="nofollow">MH Sunny </a> Hire me: Contact <a href="https://www.mmhsunny.com/" rel="nofollow">https://www.mmhsunny.com/</a>.</p>


# Project Demo :
https://javascript-nosql-todo-list.firebaseapp.com/

# Source code:
https://github.com/mhsunny/Realtime-NoSql-Firebase-To-Do-App

# Javascript 
<pre>
<code>
const list = document.querySelector('ul');
const form = document.querySelector('form');
const button = document.querySelector('button');
const addReceipe = (recipe, id) => {

    // const time = new Date(recipe.created_at.toDate()) // or;

    let html = `
     

     <li data-id="${id}" class="list-group-item d-flex justify-content-between align-items-center">
                        <span>${recipe.title} </span>
                        <i class="far fa-trash-alt delete"></i>
                    </li> 
                    
    `;

    list.innerHTML += html;
    // console.log(html);
    // let node = document.createElement(`li`);
    // let textnode = document.createTextNode(`${recipe.title}`);
    // node.appendChild(textnode);
    // list.appendChild(node);

}
const deleteRecipe = (id) => {
    const recipes = document.querySelectorAll('li');
    recipes.forEach(recipe => {
        if (recipe.getAttribute('data-id') === id) {
            recipe.remove();
        }
    })
}

// db.collection("recipes").get().then((querySnapshot) => {
//     // console.log(querySnapshot.docs[0].data());    
//     querySnapshot.docs.forEach((doc) => {

//         addReceipe(doc.data(), doc.id)
//     });
// });
const unsub = db.collection('recipes').onSnapshot(snapshot => {
    // console.log(snapshot.docChanges())
    snapshot.docChanges().forEach(change => {
        console.log(change)
        const doc = change.doc;
        if (change.type === 'added') {
            addReceipe(doc.data(), doc.id)
        } else if (change.type === 'removed') {
            deleteRecipe(doc.id)
        }
    })
});

form.addEventListener('submit', e => {

    e.preventDefault();
    if (form.recipe.value == '')
        return;

    const now = new Date();
    const recepie = {
        title: form.recipe.value,
        create_at: firebase.firestore.Timestamp.fromDate(now)
    }
    db.collection('recipes').add(recepie).then(() => {
        form.recipe.value = '';
        console.log('Recipe added');
    }).catch((error) => {
        console.log(error);
    })

})

// delete 
list.addEventListener('click', e => {
        console.log(e)
        if (e.target.tagName === 'I') {
            const id = e.target.parentElement.getAttribute('data-id');
            //e.target.parentNode.parentNode.getAttribute("data-id");
            console.log(id);
            db.collection('recipes').doc(id).delete().then(() => {
                console.log('delete');
            }).catch(error => {
                console.log('problem');
            })
        }
    })
    //
    button.addEventListener('click', () => {
    unsub();
    console.log("unsubscription from chnages")
})
</code>
</pre>

# HTML

<pre>
  <code>

  <html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Firebase JS</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

    <style>
        body {
            background: #352f5b;
            color: #fff;
        }
        
        .container {
            width: 400px;
            max-width: 100%;
        }
        
        input[type=text],
        input[type=text]:focus {
            color: #fff;
            border: none;
            background: rgba(0, 0, 0, 0.2);
            max-width: 400px;
        }
        
        .todos li {
            background: #423a6f;
        }
        
        .delete {
            cursor: pointer;
        }
        
        .error {
            border: 1px solid red;
        }
        
        .success {
            border: 1px solid limegreen;
        }
        
        .filtered {
            display: none !important;
        }
    </style>
</head>

<body>


    <div class="container my-5 mx-auto text-center">

        <div class="row">

            <div class="col-sm-12">
                <h1 class="title h3" style="color:orange;">Javascript Firebase noSQL To-do List Web App</h1>
                <h2>Recipes</h2>


                <ul class="list-group todos mx-auto text-light">


                </ul>

                <form class="">
                    <label for="recipe">Add a new recipe:</label>
                    <div class="input-group">
                        <input type="text" class="form-control" name="recipe" id="recipe" required>
                        <div class="input-group-append">
                            <input type="submit" value="add" class="btn btn-outline-secondary">
                        </div>
                    </div>
                </form>
                <button>Unsubscribe from changes</button>


            </div>
        </div>

    </div>



    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-firestore.js"></script>
    <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
    <!-- <script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-analytics.js"></script> -->

    <script>
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "your api key",
            authDomain: "",
            databaseURL: "your db url",
            projectId: "",
            storageBucket: "your firebase url",
            messagingSenderId: "your msg id",
            appId: "your app id"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        const db = firebase.firestore();
    </script>
    <script src="firebase_custom.js"></script>
</body>

</html>

</code>
</pre>