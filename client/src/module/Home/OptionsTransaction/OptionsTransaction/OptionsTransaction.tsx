import { setAreaTransaction } from "../../../API/transaction";
import React from "react";
export default class OptionsTransaction { // Class representing a transaction UI component
  private label: string; // Label for the transaction UI

  constructor(label = 'New Transaction') {  // Default label
    this.label = label; // Initialize the label
  }

  setLabel(newLabel: string) {  // Method to set a new label
    this.label = newLabel;
  }

  renderHeader(): JSX.Element { // Method to render the header of the transaction UI
    return <h2>{this.label}</h2>;
  }

  renderFormField(): JSX.Element { // Method to render an input field
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent the default form submission behavior
      const formData = new FormData(e.currentTarget); // Create a FormData object from the form
      const description = formData.get("description"); // Get the value of the input field  
      console.log(description); // Log the value to the console

      if (description === null && typeof description === "string") return; // If the description is null, exit the function
      try {
        setAreaTransaction(Number(description)).then((result) => {
          if (result === "success") return;
        })
      } catch (error) {
        alert("Error"); // If the API call fails, show an alert
      }
    };

    return (
      <form
        action="#"
        onSubmit={(e) => { handleSubmit(e) }}>
        <input
          type="number"
          placeholder="Description"
          name="description"
        />
        <button type="submit">click me</button>
      </form>
    );
  }

  renderButton(onClick: () => void): JSX.Element {
    return <button onClick={onClick}>Submit</button>;
  }
}
