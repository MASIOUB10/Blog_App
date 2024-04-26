
// Function to navigate to post details page
function navigateToDetails(index) {
    localStorage.setItem('selectedPostIndex', index);
    window.location.href = 'post-details.html'; 
}


// Function to display posts from local storage
function displayPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach((post, index) => {
        const postCard = document.createElement('div');
        postCard.id = `post-${index}`;
        postCard.classList.add('bg-gray-100', 'p-4', 'rounded-lg', 'shadow-md', 'cursor-pointer');
        postCard.addEventListener('click', () => navigateToDetails(index));
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

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'mr-2');
        editButton.addEventListener('click', (event) => editPost(event, index));
        postCard.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.id = 'deleteButton';
        deleteButton.classList.add(
            'bg-red-500',
            'hover:bg-red-700',
            'text-white',
            'font-bold',
            'py-2',
            'px-4',
            'rounded'
        );
        deleteButton.addEventListener('click', (event) => deletePost(event, index));
        postCard.appendChild(deleteButton);
        postsContainer.appendChild(postCard);
    });
}




function openModal() {
    document.getElementById('post-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('post-title').value = '';
    document.getElementById('post-description').value = '';
    document.getElementById('post-image-url').value = '';
    document.getElementById('post-modal').classList.add('hidden');
}

// Function to save a new post
function savePost() {
    const title = document.getElementById('post-title').value;
    const description = document.getElementById('post-description').value;
    const imageUrl = document.getElementById('post-image-url').value;

    if (title.trim() !== '' && description.trim() !== '' && imageUrl.trim() !== '') {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const newPost = { title, description, imageUrl };
        posts.unshift(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        const postComments = comments.filter(comment => comment.postIndex === 0);
        postComments.forEach(comment => {
            comment.postIndex = posts.length - 1;
        });
        localStorage.setItem('comments', JSON.stringify([...comments, ...postComments]));
        
        
        displayPosts();
        closeModal();
    } else {
        alert('Please fill out all fields');
    }
}
// Function to edit a post
function editPost(event, index) {
    event.stopPropagation(); 

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postToEdit = posts[index];

    // Fill input fields with post information
    document.getElementById('post-title').value = postToEdit.title;
    document.getElementById('post-description').value = postToEdit.description;
    document.getElementById('post-image-url').value = postToEdit.imageUrl;

    // Save edited post when "Save" button is clicked
    const saveButton = document.getElementById('save-post');
    saveButton.removeEventListener('click', savePost); 
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
    } 
}


// Function to delete a post
function deletePost(event, index) {
    event.stopPropagation(); 

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);     
    localStorage.setItem('posts', JSON.stringify(posts));

    
    const postCard = document.getElementById(`post-${index}`);
    postCard.removeEventListener('click', navigateToDetails);

    // Check if there are any remaining posts
    if (posts.length === 0) {
        // If no posts left, stay on the same page
        displayPosts();
    } else {
        const selectedIndex = parseInt(localStorage.getItem('selectedPostIndex'));
        // Check if the deleted post was the last post
        if (index === posts.length) {
            // If the deleted post was the last one, update the selected index to the previous post
            localStorage.setItem('selectedPostIndex', index - 1);
        }
        // Display posts with the updated selected index
        displayPosts();
    }
}

// Function to handle search
function handleSearch() {
    const searchInput = document.querySelector('.inputSearch').value.trim().toLowerCase(); // Trim whitespace and convert to lowercase
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (searchInput === '') {
        // If the search input is empty, display the featured and recent posts sections
        document.getElementById('featured-posts').classList.remove('hidden');
        document.getElementById('posts').classList.remove('hidden');
        document.getElementById('search-posts').classList.add('hidden');
    } else {
        // Perform search and display search results
        const searchResults = posts.filter(post => {
            // Convert post title and description to lowercase for case-insensitive search
            const postTitle = post.title.toLowerCase();
            const postDescription = post.description.toLowerCase();
            // Check if search query matches post title or description
            return postTitle.includes(searchInput) || postDescription.includes(searchInput);
        });
        displaySearchResults(searchResults);
    }
}



// Function to display search results
function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('search-posts');
    searchResultsContainer.innerHTML = '';

    results.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('bg-gray-100', 'p-4', 'rounded-lg', 'shadow-md', 'cursor-pointer');
                postCard.addEventListener('click', () => navigateToDetails(index));


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

        postCard.addEventListener('click', () => navigateToDetails(post));
        searchResultsContainer.appendChild(postCard);
    });

    // Show the section containing search results
    searchResultsContainer.classList.remove('hidden');
    // Hide the sections containing featured and recent posts
    document.getElementById('featured-posts').classList.add('hidden');
    document.getElementById('posts').classList.add('hidden');
    if (window.innerWidth >= 768) {
        searchResultsContainer.classList.add('grid', 'grid-cols-1','mx-12', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-4'); // Add Tailwind CSS grid classes for larger screens
    }

}



// Event listeners
document.getElementById('add-post-button').addEventListener('click', openModal);
document.getElementById('save-post').addEventListener('click', savePost);
document.querySelector('.inputSearch').addEventListener('input', handleSearch);
document.getElementById('close-modal').addEventListener('click', closeModal);

// Display existing posts on page load
displayPosts();
