// ==================== PAGE LOAD ANIMATIONS ====================
window.addEventListener('DOMContentLoaded', () => {
  // ==================== HEADER TEXT DROP ANIMATION ====================
  const headerText = document.querySelector('.middle-section h1');
  if (headerText) {
    const text = headerText.textContent;
    headerText.textContent = '';
    headerText.style.display = 'flex';
    headerText.style.gap = '2px';

    // Split into individual letters
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(-50px)';
      span.style.display = 'inline-block';
      span.style.animation = `dropLetter 0.5s ease forwards ${index * 0.05}s`;
      headerText.appendChild(span);
    });
  }

  // ==================== PRICE RANDOMIZE ANIMATION ====================
  const priceElements = document.querySelectorAll('.ticket-box h4');
  
  priceElements.forEach(priceEl => {
    const originalPrice = priceEl.textContent;
    const priceMatch = originalPrice.match(/[\d.]+/);
    
    if (priceMatch) {
      const targetPrice = parseFloat(priceMatch[0]);
      let iterations = 0;
      const maxIterations = 20;
      
      const randomizeInterval = setInterval(() => {
        const randomPrice = (Math.random() * 100).toFixed(2);
        priceEl.textContent = `RM ${randomPrice}`;
        iterations++;
        
        if (iterations >= maxIterations) {
          clearInterval(randomizeInterval);
          priceEl.textContent = originalPrice;
        }
      }, 50);
    }
  });

  // ==================== LOGO FLOAT ANIMATION ====================
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.animation = 'floatLogo 3s ease-in-out infinite';
  }
});

// ==================== FORM VALIDATION ====================
function validateForm() {
  const form = document.querySelector('.pass-left form');
  const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="date"], input[type="tel"], input[type="month"]');
  const paymentMethod = form.querySelector('input[name="payment"]:checked');
  
  // Check all text inputs
  for (let input of inputs) {
    if (!input.value.trim()) {
      return false;
    }
  }
  
  // Check payment method
  if (!paymentMethod) {
    return false;
  }
  
  // Check card number (16 digits)
  const cardNumber = form.querySelector('input[inputmode="numeric"]');
  if (!cardNumber || cardNumber.value.length !== 16) {
    return false;
  }
  
  // Check CVC (3 digits)
  const cvc = form.querySelector('#cvc');
  if (!cvc || cvc.value.length !== 3) {
    return false;
  }
  
  return true;
}

// ==================== CONFIRM BUTTON HANDLER ====================
document.addEventListener('DOMContentLoaded', () => {
  const confirmBtn = document.querySelector('.confirm');
  const successToggle = document.getElementById('success-toggle');
  const modalToggle = document.getElementById('modal-toggle-admission');
  
  if (confirmBtn) {
    confirmBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Validate form
      if (!validateForm()) {
        // Shake the confirm button
        confirmBtn.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
          confirmBtn.style.animation = '';
        }, 500);
        
        // Highlight empty fields
        const form = document.querySelector('.pass-left form');
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="date"], input[type="tel"], input[type="month"]');
        
        inputs.forEach(input => {
          if (!input.value.trim()) {
            input.style.animation = 'shake 0.5s ease';
            input.style.borderColor = '#ff5555';
            setTimeout(() => {
              input.style.animation = '';
              input.style.borderColor = '';
            }, 500);
          }
        });
        
        alert('Please fill in all fields before confirming.');
        return;
      }
      
      // Close the purchase modal
      modalToggle.checked = false;
      
      // Show loading screen
      showLoadingScreen();
    });
  }

  // ==================== CLICK OUTSIDE TO CLOSE MODAL ====================
  const modal = document.querySelector('.modal');
  const modalSuccess = document.querySelector('.modal-success');
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modalToggle.checked = false;
      }
    });
  }
  
  if (modalSuccess) {
    modalSuccess.addEventListener('click', (e) => {
      if (e.target === modalSuccess) {
        successToggle.checked = false;
        document.querySelector('.pass-left form').reset();
      }
    });
  }
});

// ==================== LOADING SCREEN ====================
function showLoadingScreen() {
  // Create loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'loading-overlay';
  loadingOverlay.innerHTML = `
    <div class="loading-spinner"></div>
    <p class="loading-text">Processing Payment...</p>
  `;
  document.body.appendChild(loadingOverlay);
  
  // After 2.5 seconds, show success
  setTimeout(() => {
    loadingOverlay.remove();
    showSuccessModal();
  }, 2500);
}

// ==================== SUCCESS MODAL ====================
function showSuccessModal() {
  const successToggle = document.getElementById('success-toggle');
  successToggle.checked = true;
  
  // After 1 second, show close button
  setTimeout(() => {
    const closeBtn = document.querySelector('.modal-success .close-modal');
    if (closeBtn) {
      closeBtn.style.display = 'inline-block';
      closeBtn.style.animation = 'fadeIn 0.3s ease';
    }
  }, 1000);
}
