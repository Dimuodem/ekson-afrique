/* ============================================
   Ekson Afrique - Contact Form
   ============================================ */

const API_URL = "https://script.google.com/macros/s/AKfycbx7WBXklTePPLolgzlqBHUaHFlg8l66lD54Tnslj1FWsbRuyGaFWD2bh3eJFML9LbxogQ/exec";

/* Optional EmailJS client-side fallback
   To enable: set EMAILJS_ENABLED = true and provide your EmailJS service/template/public keys.
   Get keys from https://www.emailjs.com/ (or use another email provider of your choice).
*/
const EMAILJS_ENABLED = false; // set to true after configuration
const EMAILJS_SERVICE_ID = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
const EMAILJS_PUBLIC_KEY = "your_public_key"; // also called user_id in some docs
const COMPANY_EMAIL = "info@eksonafrique.com";

async function sendEmailJSConfirmation({ fullName, email, reference }) {
    if (!EMAILJS_ENABLED) return { ok: false, error: 'disabled' };

    const payload = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
            to_email: email,
            to_name: fullName,
            reference: reference,
            company_email: COMPANY_EMAIL
        }
    };

    try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) return { ok: true };
        const text = await res.text();
        return { ok: false, error: text };

    } catch (err) {
        return { ok: false, error: err.message };
    }

}

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitButton = contactForm.querySelector("button[type='submit']");
        const originalButtonHTML = submitButton.innerHTML;

        // Disable submit button
        submitButton.disabled = true;
        submitButton.innerHTML =
            '<i class="fas fa-spinner fa-spfin"></i> Sending...';

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

                // Try to send a confirmation email client-side (optional)
                let emailStatus = { ok: false, error: 'not-sent' };

                if (EMAILJS_ENABLED) {
                    emailStatus = await sendEmailJSConfirmation({
                        fullName: data.fullName,
                        email: data.email,
                        reference: result.reference
                    });
                }

                // Display success modal (loaded from success-modal.js)
                if (typeof showSuccessModal === "function") {

                    const statusText = emailStatus.ok ? 'Confirmation email sent to' : 'Confirmation email queued for';

                    showSuccessModal(
                        result.reference,
                        data.email,
                        statusText
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

            console.error("Submission Error:", error);console.error("Submission Error:", error);
            alert("DEBUG ERROR: " + error.message);

            

        } finally {

            // Restore button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHTML;

        }

    });

}