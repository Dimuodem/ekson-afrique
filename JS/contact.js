/* ============================================
   Ekson Afrique - Contact Form
   ============================================ */

const API_URL =
  "https://script.google.com/macros/s/AKfycby2aNN0m9EyOLuqXtr1UoRfAIh3upG1kVatwhCEKRQDLnBTG1WdcPZoa7e7MRzjI0Dc/exec";

const contactForm = document.getElementById("contactForm");

function createReference() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const random = Math.floor(100000 + Math.random() * 900000);

  return `EKA-${year}${month}${day}-${random}`;
}


if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton =
      contactForm.querySelector("button[type='submit']");

    const originalButtonHTML =
      submitButton.innerHTML;

    const fullName =
      contactForm.querySelector("[name='fullName']").value.trim();

    const email =
      contactForm.querySelector("[name='email']").value.trim();

    const phone =
      contactForm.querySelector("[name='phone']").value.trim();

    const service =
      contactForm.querySelector("[name='service']").value;

    const message =
      contactForm.querySelector("[name='message']").value.trim();


    // Basic validation
    if (!fullName || !email || !message) {

      alert(
        "Please enter your name, email address and message."
      );

      return;
    }


    const reference = createReference();


    const formData = new URLSearchParams();

    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("service", service);
    formData.append("message", message);
    formData.append("reference", reference);

    formData.append(
      "source",
      window.location.href
    );


    submitButton.disabled = true;

    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Sending...';


    try {

      await fetch(API_URL, {

        method: "POST",

        mode: "no-cors",

        body: formData

      });


      contactForm.reset();


      // Use your existing success modal
      if (typeof showSuccessModal === "function") {

        showSuccessModal(
          reference,
          email,
          "Inquiry received from"
        );

      } else {

        alert(
          `Thank you for contacting Ekson Afrique!\n\nReference Number: ${reference}`
        );

      }


    } catch (error) {

      console.error(
        "Submission Error:",
        error
      );

      alert(
        "We couldn't send your message. Please try again."
      );

    } finally {

      submitButton.disabled = false;

      submitButton.innerHTML =
        originalButtonHTML;

    }

  });

}