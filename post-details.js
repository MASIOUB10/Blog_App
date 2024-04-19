// Retrieve selected post index from local storage
const selectedPostIndex = localStorage.getItem('selectedPostIndex');

// Retrieve posts from local storage
const posts = JSON.parse(localStorage.getItem('posts')) || [];

// Get the selected post object
const selectedPost = posts[selectedPostIndex];

// Display post details
document.getElementById('post-title').textContent = selectedPost.title;
document.getElementById('post-image').src = selectedPost.imageUrl;
document.getElementById('post-description').textContent = selectedPost.description;

// Like button
const likeButton = document.getElementById('like-button');
const likeIcon = document.getElementById('like-icon');

// Check if post is liked
let isLiked = localStorage.getItem(`post-${selectedPostIndex}-liked`) === 'true';

// Update like icon based on the liked status
if (isLiked) {
    likeIcon.classList.remove('far');
    likeIcon.classList.add('fas');
}

// Function to toggle like state
function toggleLike() {
    isLiked = !isLiked;
    if (isLiked) {
        likeIcon.classList.remove('far');
        likeIcon.classList.add('fas');
    } else {
        likeIcon.classList.remove('fas');
        likeIcon.classList.add('far');
    }
    // Save the like status to local storage
    localStorage.setItem(`post-${selectedPostIndex}-liked`, isLiked);
}

// Add event listener to like button
likeButton.addEventListener('click', toggleLike);

// Function to add comment
document.getElementById('submit-comment').addEventListener('click', function() {
    const commentInput = document.getElementById('comment-input').value.trim();

    if (commentInput !== '') {
        // Get existing comments from local storage or initialize an empty array
        const comments = JSON.parse(localStorage.getItem('comments')) || [];

        // Add the new comment to the array with the index of the selected post
        comments.push({ postIndex: selectedPostIndex, text: commentInput });

        // Store the updated comments back to local storage
        localStorage.setItem('comments', JSON.stringify(comments));

        // Clear the input field
        document.getElementById('comment-input').value = '';

        // Display the comments specific to the selected post
        displayComments();
    }
});

// Function to display comments specific to the selected post
function displayComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const commentSection = document.getElementById('comment-section');
    commentSection.innerHTML = '';

    comments.forEach(comment => {
        if (comment.postIndex === selectedPostIndex) {
            const commentElement = document.createElement('div');
            commentElement.textContent = comment.text;
            commentSection.appendChild(commentElement);
        }
    });
}

displayComments();