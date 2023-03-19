import React from "react";

function Alerts({ message }) {
  return (
    <div>
      <div className="alert alert-dismissible alert-success">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
        ></button>
        <strong>{message}</strong>
      </div>
    </div>
  );
}

export default Alerts;
