import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyD-H_lFycLht7jCisVH5aj8Q0EzPAnnqTM",
    authDomain: "year11bookings.firebaseapp.com",
    databaseURL: "https://year11bookings-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "year11bookings",
    storageBucket: "year11bookings.appspot.com",
    messagingSenderId: "443728043487",
    appId: "1:443728043487:web:39397d7878e0743f94786a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const userNameInput = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const authForm = document.querySelector("#authForm");
const appointmentSelection = document.querySelector("#appointmentSelection");
const sessionSelect = document.querySelector("#session");
const appointmentSelect = document.querySelector("#appointment");
const form = document.getElementById("appointmentForm");
const confirmationMessage = document.getElementById("confirmationMessage");
const signUpButton = document.querySelector("#signUpButton");
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const toggleAppointmentsButton = document.querySelector("#toggleAppointmentsButton");
const sessionsList = document.getElementById("sessionsList");
const appointmentsHeading = document.getElementById("appointmentsHeading");

// Hide appointment form initially
appointmentSelection.style.display = "none";

// Authentication Functions
const userSignUp = async () => {
    const signUpName = userNameInput.value;
    const signUpEmail = userEmail.value;
    const signUpPassword = userPassword.value;
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(db, 'users/' + user.uid), {
                username: signUpName,
                email: signUpEmail
            }).then(() => {
                alert("Your account has been created!");
            }).catch((error) => {
                console.error("Error saving user data: ", error.message);
            });
        })
        .catch((error) => {
            console.error("Error during sign-up: ", error.message);
        });
};

const userSignIn = async () => {
    const signInEmail = userEmail.value;
    const signInPassword = userPassword.value;
    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((userCredential) => {
            alert("You have signed in successfully!");
        })
        .catch((error) => {
            console.error("Error during sign-in: ", error.message);
        });
};

const userSignOut = async () => {
    signOut(auth)
        .then(() => {
            alert("You have signed out successfully!");
        })
        .catch((error) => {
            console.error("Error during sign-out: ", error.message);
        });
};

// Check Authentication State
const checkAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            authForm.style.display = "none";
            appointmentSelection.style.display = "block";
            loadAvailableAppointments(); // Load available appointments when user is authenticated
        } else {
            authForm.style.display = "block";
            appointmentSelection.style.display = "none";
        }
    });
};

// Booking Functionality
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const session = sessionSelect.value;
    const appointment = appointmentSelect.value;
    const user = auth.currentUser;

    if (user) {
        const userId = user.uid;
        const appointmentRef = ref(db, `appointments/${session}/${appointment}`);

        get(appointmentRef).then((snapshot) => {
            if (snapshot.exists()) {
                confirmationMessage.textContent = "Sorry, this appointment slot is already taken.";
            } else {
                set(appointmentRef, {
                    userId: userId,
                    userName: userNameInput.value,
                    session: session,
                    appointment: appointment
                }).then(() => {
                    confirmationMessage.textContent = `Appointment booked successfully for ${userNameInput.value}.`;
                    loadAvailableAppointments(); // Refresh the available appointments view after booking
                }).catch((error) => {
                    console.error("Error booking appointment: ", error);
                });
            }
        }).catch((error) => {
            console.error("Error checking appointment: ", error);
        });
    } else {
        confirmationMessage.textContent = "Please sign in to book an appointment.";
    }
});

// Update Appointment Availability in Real-time
sessionSelect.addEventListener("change", updateAppointmentOptions);

function updateAppointmentOptions() {
    const session = sessionSelect.value;

    for (let i = 1; i <= 5; i++) {
        const appointment = `Appointment ${i}`;
        const appointmentRef = ref(db, `appointments/${session}/${appointment}`);

        onValue(appointmentRef, (snapshot) => {
            const option = document.querySelector(`option[value="${appointment}"]`);
            if (snapshot.exists()) {
                option.disabled = true;
            } else {
                option.disabled = false;
            }
        });
    }
}

// Load Available Appointments Functionality with Expand/Collapse
function loadAvailableAppointments() {
    appointmentsHeading.textContent = 'Available Appointments';
    sessionsList.innerHTML = ''; // Clear the current list

    const allSessions = ['Wed 4th Sept P5', 'Fri 6th Sept P1', 'Mon 9th Sept P4', 'Thur 12th Sept P1'];
    const allAppointments = {
        'Wed 4th Sept P5': ['Appointment 1', 'Appointment 2', 'Appointment 3', 'Appointment 4', 'Appointment 5'],
        'Fri 6th Sept P1': ['Appointment 1', 'Appointment 2', 'Appointment 3', 'Appointment 4', 'Appointment 5'],
        'Mon 9th Sept P4': ['Appointment 1', 'Appointment 2', 'Appointment 3', 'Appointment 4', 'Appointment 5'],
        'Thur 12th Sept P1': ['Appointment 1', 'Appointment 2', 'Appointment 3', 'Appointment 4', 'Appointment 5'],
    };

    const appointmentsRef = ref(db, 'appointments');
    onValue(appointmentsRef, (snapshot) => {
        const takenAppointments = {};
        snapshot.forEach(sessionSnapshot => {
            const sessionId = sessionSnapshot.key;
            takenAppointments[sessionId] = [];
            sessionSnapshot.forEach(appointmentSnapshot => {
                takenAppointments[sessionId].push(appointmentSnapshot.key);
            });
        });

        allSessions.forEach(session => {
            const sessionLi = document.createElement('li');
            sessionLi.textContent = session;
            sessionLi.classList.add('session-item');
            sessionLi.addEventListener('click', () => toggleSession(sessionLi, session));

            const appointmentUl = document.createElement('ul');
            appointmentUl.classList.add('appointment-list', 'hidden');

            const availableAppointments = allAppointments[session].filter(appointment => !takenAppointments[session]?.includes(appointment));
            availableAppointments.forEach(appointment => {
                const appointmentLi = document.createElement('li');
                appointmentLi.textContent = `${appointment} is available`;
                appointmentUl.appendChild(appointmentLi);
            });

            sessionLi.appendChild(appointmentUl);
            sessionsList.appendChild(sessionLi);
        });
    });
}

// Toggle session visibility
function toggleSession(sessionLi, session) {
    const appointmentUl = sessionLi.querySelector('.appointment-list');
    appointmentUl.classList.toggle('hidden');
}

// Toggle Appointments View Functionality
let isViewingBookedAppointments = false;

toggleAppointmentsButton.addEventListener('click', () => {
    if (isViewingBookedAppointments) {
        // Show available appointments
        loadAvailableAppointments();
        toggleAppointmentsButton.textContent = 'View Booked Appointments';
    } else {
        // Show booked appointments
        loadBookedAppointments();
        toggleAppointmentsButton.textContent = 'View Available Appointments';
    }
    isViewingBookedAppointments = !isViewingBookedAppointments;
});

// View Booked Appointments Functionality
function loadBookedAppointments() {
    appointmentsHeading.textContent = 'Booked Appointments';
    sessionsList.innerHTML = ''; // Clear the current list

    const appointmentsRef = ref(db, 'appointments');
    onValue(appointmentsRef, (snapshot) => {
        sessionsList.innerHTML = ''; // Clear the list to avoid duplication
        snapshot.forEach(sessionSnapshot => {
            const sessionId = sessionSnapshot.key;
            sessionSnapshot.forEach(appointmentSnapshot => {
                const appointmentData = appointmentSnapshot.val();
                const li = document.createElement('li');
                li.textContent = `Session: ${appointmentData.session}, Appointment: ${appointmentData.appointment}, Booked by: ${appointmentData.userName}`;
                sessionsList.appendChild(li);
            });
        });
    });
}

updateAppointmentOptions(); // Initial call to populate availability

checkAuthState(); // Check the authentication state on page load

// Event Listeners
signUpButton.addEventListener('click', userSignUp);
signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);
