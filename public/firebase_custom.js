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