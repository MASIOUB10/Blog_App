
const selectedPostIndex = localStorage.getItem('selectedPostIndex');
const posts = JSON.parse(localStorage.getItem('posts')) || [];
const selectedPost = posts[selectedPostIndex];

document.getElementById('post-title').textContent = selectedPost.title;
document.getElementById('post-image').src = selectedPost.imageUrl;
document.getElementById('post-description').textContent = selectedPost.description;

const likeButton = document.getElementById('like-button');
const likeIcon = document.getElementById('like-icon');

let isLiked = localStorage.getItem(`post-${selectedPostIndex}-liked`) === 'true';

// Update like icon based on the liked status
if (isLiked) {
    likeIcon.classList.remove('far');
    likeIcon.classList.add('fas');
}

function toggleLike() {
    isLiked = !isLiked;
    if (isLiked) {
        likeIcon.classList.remove('far');
        likeIcon.classList.add('fas');
    } else {
        likeIcon.classList.remove('fas');
        likeIcon.classList.add('far');
    }
    
    localStorage.setItem(`post-${selectedPostIndex}-liked`, isLiked);
}


likeButton.addEventListener('click', toggleLike);

// Function to add comment
document.getElementById('submit-comment').addEventListener('click', function() {
    const commentInput = document.getElementById('comment-input').value.trim();

    if (commentInput !== '') {
        
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ postIndex: selectedPostIndex, text: commentInput });
        localStorage.setItem('comments', JSON.stringify(comments));
        document.getElementById('comment-input').value = '';

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