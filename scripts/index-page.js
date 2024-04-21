let formatTimestamp = (timestamp) => {
    const currentTime = new Date();
    const targetTime = new Date(timestamp); 

    const elapsed = currentTime - targetTime; 

    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
        return seconds < 5 ? 'a few seconds ago' : `${seconds} seconds ago`;
    }
}

let comments = [
    {
        name: 'Victor Pinto',
        timestamp: 1713385605615,
        commentText: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this work deserves some kind of praise. Let us appreciate this for what it is and what it contains.'
    },
    {
        name: 'Christina Cabrera',
        timestamp: 1713385605615,
        commentText: 'I feel blessed to have seen them in person. What a show!They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.'
    },
    {
        name: 'Issac Tadesse',
        timestamp: 1713385605615,
        commentText: 'I cant stop listening. Everytime I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Cant get enough.'
    }
]

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
        commentText.textContent = item.commentText;
        header.appendChild(username);
        header.appendChild(timestamp);
        info.appendChild(header);
        info.appendChild(commentText);
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
        timestamp: Date.now(),
        commentText: formData.get('commentText')
    }
    comments.push(newComment);
    renderComments(comments);
    document.getElementById('comment-name').value = "";
    document.getElementById('comment-text').value = "";
}

const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', handleFormSubmit);
renderComments(comments);
