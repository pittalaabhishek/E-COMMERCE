import React, { useState } from "react";
import "../../styles/DebitCardInput.css";

const DebitCardInput = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, "");

    const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    return formattedValue.slice(0, 19);
  };

  const formatExpiry = (value) => {
    const cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length > 2) {
      return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
    }

    return cleanedValue;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
  };

  return (
    <div className="debit-card-container">
      <div className="debit-card">
        <div className="card-front">
          <div className="card-logo">💳</div>

          <div className="card-number-container">
            <input
              type="text"
              className="card-number-input"
              placeholder="Card Number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength="19"
            />
          </div>

          <div className="card-details">
            <input
              type="text"
              className="card-holder-input"
              placeholder="Card Holder Name"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
            />

            <div className="card-expiry-cvv">
              <input
                type="text"
                className="card-expiry-input"
                placeholder="MM/YY"
                value={expiry}
                onChange={handleExpiryChange}
                maxLength="5"
              />
              <input
                type="password"
                className="card-cvv-input"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.slice(0, 3))}
                maxLength="3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebitCardInput;
