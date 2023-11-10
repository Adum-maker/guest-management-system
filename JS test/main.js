// Create an array to store guest objects
let guestList = [];

// Function to clear form fields
function clearFormFields() {
    const fieldsToClear = ["firstName", "lastName", "dateOfBirth", "country", "roomNumber", "arrivalDate", "departureDate"];
    fieldsToClear.forEach(field => {
        document.getElementById(field).value = "";
    });
}

function addGuest() {
    const firstName = getInputValue("firstName");
    const lastName = getInputValue("lastName");
    const dateOfBirth = new Date(getInputValue("dateOfBirth"));
    const country = getInputValue("country");
    const roomNumber = getInputValue("roomNumber");
    const arrivalDate = new Date(getInputValue("arrivalDate"));
    const departureDate = new Date(getInputValue("departureDate"));

    // Input validation
    if (!firstName || !lastName || isNaN(dateOfBirth) || !country || !roomNumber || isNaN(arrivalDate) || isNaN(departureDate)) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    const guest = {
        firstName,
        lastName,
        dateOfBirth,
        country,
        roomNumber,
        arrivalDate,
        departureDate,
    };

    guestList.push(guest);

    // Update the guest table
    updateGuestTable(guest);

    // Clear form fields after adding a guest
    clearFormFields();
}

function getInputValue(id) {
    return document.getElementById(id).value;
}

function updateGuestTable(guest) {
    const guestTable = document.getElementById("guestTable");
    if (guestTable.innerHTML === "") {
        // Add table headers
        guestTable.innerHTML = "<tr><th>First Name</th><th>Last Name</th><th>Date of Birth</th><th>Country</th><th>Room Number</th><th>Arrival Date</th><th>Departure Date</th></tr>";
    }

    // Add the new guest to the table
    const row = guestTable.insertRow();
    for (const key in guest) {
        const cell = row.insertCell();
        cell.innerHTML = key === "dateOfBirth" || key === "arrivalDate" || key === "departureDate" ? guest[key].toDateString() : guest[key];
    }
}

function highlightDepartures() {
    const guestTable = document.getElementById("guestTable");
    const currentDate = new Date();

    const rows = guestTable.rows;
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const departureDate = guestList[i - 1].departureDate;

        if (departureDate > currentDate) {
            row.classList.add("future-departure");
        } else if (departureDate < currentDate) {
            row.classList.add("overstayed");
        }
    }
}

