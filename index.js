// Display posts from local storage
function displayPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach((post, index) => {
        const postCard = document.createElement('div');
        postCard.classList.add('bg-gray-100', 'p-4', 'rounded-lg', 'shadow-md', 'cursor-pointer');
        postCard.addEventListener('click', () => navigateToDetails(index)); // Add click event listener

        const image = document.createElement('img');
        image.src = post.imageUrl;
        image.alt = 'Post Image';
        image.classList.add('w-full', 'h-48', 'object-cover', 'rounded-md', 'mb-4');
        postCard.appendChild(image);

        const title = document.createElement('h3');
        title.textContent = post.title;
        title.classList.add('text-lg', 'font-semibold', 'mb-2');
        postCard.appendChild(title);

        const description = document.createElement('p');
        description.textContent = post.description;
        description.classList.add('text-gray-700', 'mb-4');
        postCard.appendChild(description);

        // Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'mr-2');
        editButton.addEventListener('click', (event) => editPost(event, index));
        postCard.appendChild(editButton);

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('bg-red-500', 'hover:bg-red-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');
        deleteButton.addEventListener('click', () => deletePost(index));
        postCard.appendChild(deleteButton);
        postsContainer.appendChild(postCard);
    });
}

// Function to open the add post modal

function openModal() {
    
    document.getElementById('post-modal').classList.remove('hidden');
}

// Function to close the add post modal
function closeModal() {
    document.getElementById('post-title').value = '';
    document.getElementById('post-description').value = '';
    document.getElementById('post-image-url').value = '';
    document.getElementById('post-modal').classList.add('hidden');
}

// Function to save a new post
// Function to save a new post
function savePost() {
    const title = document.getElementById('post-title').value;
    const description = document.getElementById('post-description').value;
    const imageUrl = document.getElementById('post-image-url').value;

    if (title.trim() !== '' && description.trim() !== '' && imageUrl.trim() !== '') {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const newPost = { title, description, imageUrl };

        // Prepend the new post to the beginning of the posts array
        posts.unshift(newPost);

        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts(posts);
        closeModal();
    } else {
        alert('Please fill out all fields');
    }
}


// Function to navigate to post details page
function navigateToDetails(index) {
    localStorage.setItem('selectedPostIndex', index);
    window.location.href = 'post-details.html'; // Navigate to the details page
}

// Function to edit a post
function editPost(event, index) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the post card

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postToEdit = posts[index];

    // Set values in the modal
    document.getElementById('post-title').value = postToEdit.title;
    document.getElementById('post-description').value = postToEdit.description;
    document.getElementById('post-image-url').value = postToEdit.imageUrl;

    // Save edited post when "Save" button is clicked
    const saveButton = document.getElementById('save-post');
    saveButton.removeEventListener('click', savePost); // Remove previous event listener
    saveButton.addEventListener('click', () => saveEditedPost(index));
    openModal();
}

// Function to save edited post
function saveEditedPost(index) {
    const title = document.getElementById('post-title').value;
    const description = document.getElementById('post-description').value;
    const imageUrl = document.getElementById('post-image-url').value;

    if (title.trim() !== '' && description.trim() !== '' && imageUrl.trim() !== '') {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts[index] = { title, description, imageUrl };
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
        closeModal();
    } else {
        alert('Please fill out all fields');
    }
}

// Function to delete a post
function deletePost(index) {
    

    
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
    
}
// Get the search input element
const searchInput = document.querySelector('.inputSearch');

// Add event listener to detect changes in the search input value
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    filterPosts(searchTerm);
});


// Event listeners
document.getElementById('add-post-button').addEventListener('click', openModal);
document.getElementById('save-post').addEventListener('click', savePost);
document.getElementById('close-modal').addEventListener('click', closeModal);

// Display existing posts on page load
displayPosts();