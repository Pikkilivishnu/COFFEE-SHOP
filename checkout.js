// const stripe = Stripe("pk_test_51R6kQmD1hbaPcyv3CHk5XUrvxcmgddG6SxDCoMTbzCWnPGXtoc5hedD0Oi3Vn67WFfOQZENwT0Am9IqfHGSU1NXk00ST1F2gNa`");

// const checkoutForm = document.getElementById("checkout-form");
// const payButton = document.getElementById("checkout-button2");
// const cardDetails = document.getElementById("card-details");
// const paymentMethodRadios = document.querySelectorAll("input[name='payment']");
// const elements = stripe.elements();
// const cardElement = elements.create("card");
// cardElement.mount("#card-number");


// document.addEventListener("DOMContentLoaded", () => {
//     const cardElementContainer = document.getElementById("card-element");
//     const cardRadioButton = document.getElementById("payment-card");
//     const cashRadioButton = document.getElementById("payment-cash");

//     // Stripe setup
//     const stripe = Stripe("your-publishable-key");
//     const elements = stripe.elements();
//     const cardNumberElement = elements.create("cardNumber");

//     // Function to toggle payment fields
//     function togglePaymentFields() {
//         if (cardRadioButton.checked) {
//             cardElementContainer.classList.remove("hidden"); // Show card fields
//             setTimeout(() => {
//                 cardNumberElement.mount("#card-number"); // Mount only when visible
//             }, 100); 
//         } else {
//             cardElementContainer.classList.add("hidden"); // Hide card fields
//         }
//     }

//     // Listen for payment method change
//     cardRadioButton.addEventListener("change", togglePaymentFields);
//     cashRadioButton.addEventListener("change", togglePaymentFields);

//     // Ensure correct fields are displayed on page load
//     togglePaymentFields();
// });


// paymentMethodRadios.forEach((radio) => {
//     radio.addEventListener("change", (event) => {
//         cardDetails.style.display = event.target.value === "card" ? "block" : "none";
//     });
// });

// payButton.addEventListener("click", async (event) => {
//     event.preventDefault();
    
//     const selectedPaymentMethod = document.querySelector("input[name='payment']:checked").value;
//     if (selectedPaymentMethod === "cash") {
//         alert("Order placed with Cash on Delivery!");
//         return;
//     }
    
//     const { paymentMethod, error } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//     });
    
//     if (error) {
//         alert(error.message);
//         return;
//     }
    
//     const orderTotal = parseFloat(document.getElementById("order-total").textContent.replace("$", "")) * 100;
    
//     const response = await fetch("http://localhost:3001/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             amount: orderTotal,
//             currency: "usd",
//             paymentMethodId: paymentMethod.id,
//         }),
//     });
    
//     const data = await response.json();
//     if (data.error) {
//         alert(data.error);
//         return;
//     }
    
//     const confirmResult = await stripe.confirmCardPayment(data.clientSecret);
    
//     if (confirmResult.error) {
//         alert(confirmResult.error.message);
//     } else {
//         alert("Payment successful! Order confirmed.");
//     }
// });
document.addEventListener("DOMContentLoaded", async () => {
    const cardElementContainer = document.getElementById("card-element");
    const cardNumberContainer = document.getElementById("card-number");
    const expiryContainer = document.getElementById("expiry");
    const cvvContainer = document.getElementById("cvv");
    const cardRadioButton = document.getElementById("payment-card");
    const cashRadioButton = document.getElementById("payment-cash");
    const checkoutButton = document.getElementById("checkout-button2");

    if (!cardElementContainer || !cardNumberContainer || !expiryContainer || !cvvContainer) {
        console.error("Missing required DOM elements.");
        return;
    }

    const stripe = Stripe("pk_test_51R6kQmD1hbaPcyv3CHk5XUrvxcmgddG6SxDCoMTbzCWnPGXtoc5hedD0Oi3Vn67WFfOQZENwT0Am9IqfHGSU1NXk00ST1F2gNa");
    const elements = stripe.elements();

    const cardNumberElement = elements.create("cardNumber");
    const cardExpiryElement = elements.create("cardExpiry");
    const cardCvcElement = elements.create("cardCvc");

    function togglePaymentFields() {
        if (cardRadioButton.checked) {
            cardElementContainer.classList.remove("hidden");
            setTimeout(() => {
                if (cardNumberContainer && expiryContainer && cvvContainer) {
                    cardNumberElement.mount("#card-number");
                    cardExpiryElement.mount("#expiry");
                    cardCvcElement.mount("#cvv");
                } else {
                    console.error("One or more card input containers are missing.");
                }
            }, 100);
        } else {
            cardElementContainer.classList.add("hidden");
        }
    }

    cardRadioButton.addEventListener("change", togglePaymentFields);
    cashRadioButton.addEventListener("change", togglePaymentFields);
    togglePaymentFields();

    checkoutButton.addEventListener("click", async (event) => {
        event.preventDefault();
        if (cardRadioButton.checked) {
            const { token, error } = await stripe.createToken(cardNumberElement);
            if (error) {
                alert(error.message);
            } else {
                console.log("Stripe Token:", token);
                alert("Payment successful!");
            }
        } else {
            alert("Cash on Delivery selected!");
        }
    });
});
