let showsList = [
    {
        date: 1682381644429,
        venue: 'Ronald Lane',
        location: 'San Francisco, CA'
    },
    {
        date: 1710070020992,
        venue: 'Pier 3 East',
        location: 'San Francisco, CA'
    },
    {
        date: 1687437739965,
        venue: 'View Lounge',
        location: 'San Francisco, CA'
    },
    {
        date: 1704643560308,
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA'
    },
    {
        date: 1695782193678,
        venue: 'Moscow Center',
        location: 'San Francisco, CA'
    },
    {
        date: 1707456935363,
        venue: 'Press Club',
        location: 'San Francisco, CA'
    }
];

let formatTimestamp = (timestamp) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const formattedText = `${date.toDateString().slice(0, 3)} ${month} ${day} ${year}`;
    return formattedText;
}

let renderShowsCards = (arr) => {
    const showsContainer = document.getElementById('shows-container');
    showsContainer.innerHTML = "";
    arr.forEach(item => {
        const card = document.createElement('div');
        card.className = 'shows-list__container__card';
        const dateElem = document.createElement('div');
        dateElem.className = 'shows-list__container__card__element';
        const dateTitle = document.createElement('p');
        dateTitle.textContent = 'DATE'
        dateTitle.className = 'shows-list__container__card__element__title'
        const dateValue = document.createElement('p');
        dateValue.textContent = formatTimestamp(item.date);
        dateValue.classList.add('shows-list__container__card__element__value', 'bold');
        dateElem.appendChild(dateTitle);
        dateElem.appendChild(dateValue);
        card.appendChild(dateElem);
        const venueElem = document.createElement('div');
        venueElem.className = 'shows-list__container__card__element';
        const venueTitle = document.createElement('p');
        venueTitle.textContent = 'VENUE';
        venueTitle.className = 'shows-list__container__card__element__title';
        const venueValue = document.createElement('p');
        venueValue.textContent = item.venue;
        venueValue.className = 'shows-list__container__card__element__value';
        venueElem.appendChild(venueTitle);
        venueElem.appendChild(venueValue);
        card.appendChild(venueElem);
        const locationElem = document.createElement('div');
        locationElem.className = 'shows-list__container__card__element';
        const locationTitle = document.createElement('p');
        locationTitle.textContent = 'LOCATION';
        locationTitle.className = 'shows-list__container__card__element__title';
        const locationValue = document.createElement('p');
        locationValue.textContent = item.location;
        locationValue.className = 'shows-list__container__card__element__value';
        locationElem.appendChild(locationTitle);
        locationElem.appendChild(locationValue);
        card.appendChild(locationElem);
        const buyButton = document.createElement('button');
        buyButton.className = 'shows-list__container__card__button';
        buyButton.textContent = 'BUY TICKETS'
        card.appendChild(buyButton);
        showsContainer.appendChild(card);
    });
}

let renderShowsTable = (arr) => {
    const showsTable = document.getElementById('shows-table');
    showsTable.innerHTML = '';
    const table = document.createElement('table');
    table.cellPadding = 0;
    table.cellSpacing = 0;
    table.id = 'shows-list-table';
    const headingRow = table.insertRow();
    const dateHeading = headingRow.insertCell(0);
    dateHeading.outerHTML = '<th>DATE</th>';
    const venueHeading = headingRow.insertCell(1)
    venueHeading.outerHTML = '<th>VENUE</th>';
    const locationHeading = headingRow.insertCell(2)
    locationHeading.outerHTML = '<th>LOCATION</th>';
    const buyTicketsHeading = headingRow.insertCell(3)
    buyTicketsHeading.outerHTML = '<th></th>';
    arr.forEach((item) => {
        const newRow = table.insertRow();
        const dateValue = newRow.insertCell(0);
        dateValue.textContent = formatTimestamp(item.date);
        dateValue.className = 'bold';
        const venueValue = newRow.insertCell(1);
        venueValue.textContent = item.venue;
        const locationValue = newRow.insertCell(2);
        locationValue.textContent = item.location;
        const buyTicketButtonValue = newRow.insertCell(3);
        const buyButton = document.createElement('button');
        buyButton.className = 'shows-list__container__table__button';
        buyButton.textContent = 'BUY TICKETS';
        buyTicketButtonValue.appendChild(buyButton);
    })
    showsTable.appendChild(table);

    const activeRow = (row)=>{
        const tableRows = document.querySelectorAll('#shows-list-table tr');
        tableRows.forEach((tr)=>{
            tr.classList.remove('active');
        })
        row.classList.add('active');
    }

    const tableRows = document.querySelectorAll('#shows-list-table tr');
    tableRows.forEach((row)=>{
        row.addEventListener('click', ()=>{
            activeRow(row)
        })
    })
}

renderShowsCards(showsList);
renderShowsTable(showsList);
