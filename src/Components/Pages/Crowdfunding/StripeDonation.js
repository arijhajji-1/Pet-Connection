import React, { useState, useEffect } from "react";
 
export function StripeDonation(props) {
  const [total, setTotal] = useState(5);
    const url = "http://localhost:3000/donation/create-checkout-session/"; 
    return (
      <section>
        <div className="product">
          <div
            style={{ color: "black", marginTop: "100px" }}
            className="description"
          >
            <h3>Contribute to this Crowdfunding : {total}$</h3>
          </div>
        </div>

        <form
          action={url + total + "/" + props.id + "/" + props.funding}
          method="POST"
        >
          <input
            style={{
              backgroundColor: "white",
              border: "1px solid black",
              color: "black",
              marginTop: "10px",
              width: "170px",
            }}
            type="number"
            min="0"
            onChange={(e) => setTotal(e.target.value)}
            value={total}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#008cdd",
              width: "170px",
              padding: "5px",
              borderRadius: "7px",
              color: "white",
            }}
          >
            Donate with Stripe
          </button>
          {/* <i
            className="fab fa-cc-stripe"
            style={{ marginLeft: "20px", fontSize: "30px" }}
          /> */}
        </form>
      </section>
    );
};
  