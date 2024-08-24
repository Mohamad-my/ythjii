
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('reservationForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent form submission to handle validation
        let valid = true;

        // Validate email
        const email = document.getElementById('Email').value;
        if (!email || !email.includes('@')) {
            document.getElementById('EmailError').textContent = 'Invalid email address';
            valid = false;
        } else {
            document.getElementById('EmailError').textContent = '';
        }

        // Validate password
        const password = document.getElementById('Password').value;
        if (!password || password.length < 6) {
            document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long';
            valid = false;
        } else {
            document.getElementById('passwordError').textContent = '';
        }

        // Validate dates
        const date1 = document.getElementById('d1').value;
        const date2 = document.getElementById('d2').value;
        if (!date1 || !date2 || new Date(date1) >= new Date(date2)) { // Ensure return date is after going date
            document.getElementById('dateError').textContent = 'Return date must be after the going date';
            valid = false;
        } else {
            document.getElementById('dateError').textContent = '';
        }

        // Validate number of tickets
        const numberTicket = document.getElementById('numberticket').value;
        if (!numberTicket || numberTicket < 1 || numberTicket > 10) {
            document.getElementById('numberticketError').textContent = 'Number of tickets must be between 1 and 10';
            valid = false;
        } else {
            document.getElementById('numberticketError').textContent = '';
        }

        // Validate destination and calculate ticket price
        const destination = document.getElementById('destination').value;
        let ticketPrice = 0;
        if (destination === 'select') {
            document.getElementById('destinationError').textContent = 'Please choose your destination';
            valid = false;
        } else {
            document.getElementById('destinationError').textContent = '';
            // Set ticket price based on destination
            switch (destination.toLowerCase()) {
                case 'macca':
                    ticketPrice = 210;
                    break;
                case 'switzerland':
                    ticketPrice = 300;
                    break;
                case 'french':
                    ticketPrice = 200;
                    break;
                case 'london':
                    ticketPrice = 250;
                    break;
                case 'aqaba':
                    ticketPrice = 190;
                    break; 
                case 'sharm shakh':
                    ticketPrice = 270;
                    break;
                case 'nederlands':
                    ticketPrice = 290;
                    break;                
                default:
                    ticketPrice = 80; // Default price for other destinations
                    break;
            }
        }

        // Validate ticket class and adjust ticket price
        const ticketClass = document.getElementById('t5').value;
        if (ticketClass === 'select') {
            document.getElementById('t5Error').textContent = 'Please select a ticket class';
            valid = false;
        } else {
            document.getElementById('t5Error').textContent = '';
            // Adjust ticket price based on class
            if (ticketClass === 'First class') {
                ticketPrice *= 2; // Increase price by 50% for First class
            }
            else if(ticketClass==='Economy class'){
               ticketPrice*=1.2;
            }
        }

        // Validate checkbox
        const checkbox = document.getElementById('checkbox').checked;
        if (!checkbox) {
            document.getElementById('checkboxError').textContent = 'You must agree to the terms';
            valid = false;
        } else {
            document.getElementById('checkboxError').textContent = '';
        }

        // If all validations pass
        if (valid) {
            const totalPrice = numberTicket * ticketPrice;
            const resultText = `
Email: ${email}
Password: ${password}
Going Day: ${date1}
Return Day: ${date2}
Number of Tickets: ${numberTicket}
Destination: ${destination}
Ticket Class: ${ticketClass}
Ticket Price (each): $${ticketPrice}
Total Price: $${totalPrice}
Terms Agreed: ${checkbox ? 'Yes' : 'No'}
`;

            // Output the result text to the textarea
            document.getElementById('result').value = resultText.trim();
        }
    });
});