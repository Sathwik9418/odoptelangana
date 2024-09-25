// Function to load posts from the server and display them
const loadPosts = async () => {
    const response = await fetch('https://odopsample.vercel.app/api/posts'); // Fetch all posts from the server
    if (response.ok) {
        const posts = await response.json();
        displayPosts(posts); // Display all fetched posts
    } else {
        console.error('Error loading posts');
    }
};

// Function to display posts (single or multiple)
const displayPosts = (posts) => {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = ''; // Clear the existing posts
    posts.forEach(post => {
        const postDiv = createPostElement(post);
        postsDiv.appendChild(postDiv); // Append each post to the postsDiv
    });
};

// Function to create a post element
const createPostElement = (post) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><small>${new Date(post.createdAt).toLocaleString()}</small>`;
    return postDiv;
};

// Event listener for the post form submission
document.getElementById('postForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch('https://odopsample.vercel.app/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
        const newPost = await response.json();
        const postsDiv = document.getElementById('posts');
        const newPostElement = createPostElement(newPost);
        postsDiv.insertBefore(newPostElement, postsDiv.firstChild); // Prepend the new post
        document.getElementById('postForm').reset();
    } else {
        console.error('Error adding post');
    }
});

// Load posts when the page is loaded
document.addEventListener('DOMContentLoaded', loadPosts);
