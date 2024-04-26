// Function to add comment
document.getElementById('submit-comment').addEventListener('click', function() {
    const commentInput = document.getElementById('comment-input').value.trim();
    const selectedPostIndex = localStorage.getItem('selectedPostIndex');

    if (commentInput !== '') {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const selectedPost = posts[selectedPostIndex];
        
        // Add comment to the selected post
        selectedPost.comments = selectedPost.comments || [];
        selectedPost.comments.push(commentInput);

        localStorage.setItem('posts', JSON.stringify(posts));
        document.getElementById('comment-input').value = '';

        displayComments(selectedPost.comments); // Display comments for the selected post
    }
});

// Function to display comments specific to the selected post
function displayComments(comments) {
    const commentSection = document.getElementById('comment-section');
    commentSection.innerHTML = '';

    comments.forEach(commentText => {
        const commentElement = document.createElement('div');
        commentElement.textContent = commentText;
        commentSection.appendChild(commentElement);
    });
}

// Function to display post details
function displayPostDetails() {
    const selectedPostIndex = localStorage.getItem('selectedPostIndex');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const selectedPost = posts[selectedPostIndex];

    document.getElementById('post-title').textContent = selectedPost.title;
    document.getElementById('post-image').src = selectedPost.imageUrl;
    document.getElementById('post-description').textContent = selectedPost.description;

    const likeButton = document.getElementById('like-button');
    const likeIcon = document.getElementById('like-icon');

    // Retrieve like status from localStorage
    let isLiked = localStorage.getItem(`post-${selectedPostIndex}-liked`) === 'true';

    // Update like icon based on the liked status
    if (isLiked) {
        likeIcon.classList.remove('far');
        likeIcon.classList.add('fas');
    } else {
        likeIcon.classList.remove('fas');
        likeIcon.classList.add('far');
    }

    function toggleLike() {
        isLiked = !isLiked;
        if (isLiked) {
            likeIcon.classList.remove('far');
            likeIcon.classList.add('fas','text-red-500');
        } else {
            likeIcon.classList.remove('fas' , 'text-red-500');
            likeIcon.classList.add('far');
        }

        // Update like status in localStorage
        localStorage.setItem(`post-${selectedPostIndex}-liked`, isLiked);
    }

    likeButton.addEventListener('click', toggleLike);



    // Display comments for the selected post
    displayComments(selectedPost.comments || []);
}

// Call displayPostDetails function to display post details and associated comments
displayPostDetails();
