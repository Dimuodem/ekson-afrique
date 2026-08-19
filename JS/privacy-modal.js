// ============================================
// Privacy Policy Modal - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const modal = document.getElementById('privacyModal');
    const openBtn = document.getElementById('privacyPolicyLink');
    const closeBtn = document.getElementById('closeModalBtn');
    const closeBtnSecondary = document.getElementById('closeModalBtnSecondary');

    // Function to open modal
    function openModal(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Open modal when clicking Privacy Policy link
    openBtn.addEventListener('click', openModal);

    // Close modal with close buttons
    closeBtn.addEventListener('click', closeModal);
    closeBtnSecondary.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal container
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Optional: Close modal with close icon inside header
    // (already handled above)
});