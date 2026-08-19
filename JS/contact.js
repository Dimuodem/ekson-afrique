/* ============================================
   Ekson Afrique - Contact Form
   ============================================ */

const API_URL = "https://script.google.com/macros/s/AKfycbx7WBXklTePPLolgzlqBHUaHFlg8l66lD54Tnslj1FWsbRuyGaFWD2bh3eJFML9LbxogQ/exec";

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitButton = contactForm.querySelector("button[type='submit']");
        const originalButtonHTML = submitButton.innerHTML;

        // Disable submit button
        submitButton.disabled = true;
        submitButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Collect form data
        const data = {
            fullName: contactForm.querySelector("[name='fullName']").value.trim(),
            email: contactForm.querySelector("[name='email']").value.trim(),
            phone: contactForm.querySelector("[name='phone']").value.trim(),
            service: contactForm.querySelector("[name='service']").value,
            message: contactForm.querySelector("[name='message']").value.trim()
        };

        // Client-side validation
        if (!data.fullName || !data.email || !data.message) {

            alert("Please fill in all required fields.");

            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHTML;

            return;

        }

        try {

            const response = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(data)
            });

            const result = await response.json();

            console.log("Server Response:", result);

            if (result.success) {

                // Reset form
                contactForm.reset();

                // Display success modal (loaded from success-modal.js)
                if (typeof showSuccessModal === "function") {

                    showSuccessModal(
                        result.reference,
                        data.email
                    );

                } else {

                    alert(
                        `Thank you!\n\nReference Number:\n${result.reference}`
                    );

                }

            } else {

                alert(result.message || "Something went wrong while submitting your inquiry.");

            }

        } catch (error) {

            console.error("Submission Error:", error);

            alert(
                "Unable to submit your inquiry.\n\nPlease check your internet connection and try again."
            );

        } finally {

            // Restore button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHTML;

        }

    });

}