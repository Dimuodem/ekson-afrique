/* ============================================
   Ekson Afrique - Success Modal
============================================ */

const successModal = document.getElementById("successModal");
const referenceNumber = document.getElementById("referenceNumber");
const customerEmail = document.getElementById("customerEmail");
const closeModalButton = document.getElementById("closeModal");

function showSuccessModal(reference, email) {

    if (!successModal) return;

    referenceNumber.textContent = reference;

    customerEmail.innerHTML = `
        <strong>Confirmation email sent to</strong><br>
        ${email}
        <br><br>
        <span style="color:#00A651;">
            Our team will respond within 24 hours.
        </span>
    `;

    successModal.classList.add("active");

}

function hideSuccessModal() {

    if (!successModal) return;

    successModal.classList.remove("active");

}

if (closeModalButton) {

    closeModalButton.addEventListener("click", hideSuccessModal);

}

if (successModal) {

    successModal.addEventListener("click", function (e) {

        if (e.target === successModal) {

            hideSuccessModal();

        }

    });

}

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        hideSuccessModal();

    }

});