import BandSiteApi from "./band-site-api.js";

let formatTimestamp = (timestamp) => {
    const currentTime = new Date(); // Current time
    const targetTime = new Date(timestamp); // Timestamp to format

    const elapsed = currentTime - targetTime; // Time difference in milliseconds

    // Convert milliseconds to seconds, minutes, hours, and days
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    // Format the timestamp into user-friendly text
    if (years > 0) {
        return years === 1 ? '1 year ago' : `${years} years ago`;
    } else if (months > 0) {
        return months === 1 ? '1 month ago' : `${years} months ago`;
    } else if (days > 0) {
        return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
        return seconds < 5 ? 'a few seconds ago' : `${seconds} seconds ago`;
    }
}

let comments = [];

const apiKey = 'cab19056-57d0-447a-ad67-f1df60f708e8';
const api = new BandSiteApi(apiKey);

let getComments = () => {
    api.getComments().then((data) => {
        comments = data;
        renderComments(comments);
    })
}

let renderComments = (arr) => {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = "";
    arr.forEach(item => {
        const card = document.createElement('div');
        card.className = 'comments-section__content__card';
        const profile = document.createElement('div');
        profile.className = 'comments-section__content__profile';
        const userImage = document.createElement('span');
        profile.appendChild(userImage);
        const info = document.createElement('div');
        info.className = 'comments-section__content__info';
        const header = document.createElement('div');
        header.className = 'comments-section__content__info__header';
        const timestamp = document.createElement('p');
        timestamp.className = 'comments-section__content__info__timestamp';
        timestamp.textContent = formatTimestamp(item.timestamp);
        const username = document.createElement('p');
        username.className = 'comments-section__content__info__username';
        username.textContent = item.name;
        const commentText = document.createElement('p');
        commentText.className = 'comments-section__content__info__comment';
        commentText.textContent = item.comment;
        const additionalButtons = document.createElement('div');
        additionalButtons.className = 'comments-section__content__info__additionalbuttons';
        const likesInfo = document.createElement('p');
        likesInfo.className = 'comments-section__content__info__additionalbuttons__likes';
        likesInfo.textContent = `${item.likes} Like${item.likes > 1 ? 's' : ''}`;
        likesInfo.addEventListener('click', () => handleLike(item.id));
        const deleteButton = document.createElement('button');
        deleteButton.className = 'comments-section__content__info__additionalbuttons__deletebutton';
        deleteButton.textContent = 'Delete comment';
        deleteButton.addEventListener('click', () => handleDelete(item.id))
        additionalButtons.appendChild(likesInfo);
        additionalButtons.appendChild(deleteButton);
        header.appendChild(username);
        header.appendChild(timestamp);
        info.appendChild(header);
        info.appendChild(commentText);
        info.appendChild(additionalButtons);
        card.appendChild(profile);
        card.appendChild(info);
        commentsContainer.appendChild(card);
    });
}

let handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let newComment = {
        name: formData.get('name'),
        comment: formData.get('commentText')
    }
    api.postComment(newComment).then((data) => {
        comments.unshift(data);
        renderComments(comments);
        document.getElementById('comment-name').value = "";
        document.getElementById('comment-text').value = "";
    })
}

let handleDelete = (id) => {
    api.deleteComment(id).then((a)=>{
        comments = comments.filter((cmt)=>cmt.id !== id);
        renderComments(comments);
    })
}

let handleLike = (id) => {
    api.likeComment(id).then((a)=>{
        comments.forEach((elem)=>{
            if(elem.id === id){
                elem.likes = a.likes
            }
        })
        renderComments(comments);
    })
}

const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', (e)=>handleFormSubmit(e));
getComments();