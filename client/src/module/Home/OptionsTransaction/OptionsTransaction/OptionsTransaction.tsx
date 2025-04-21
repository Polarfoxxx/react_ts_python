// TransactionUI.ts
import React from 'react';

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

  renderInputField(value: string, onChange: (val: string) => void): JSX.Element { // Method to render an input field
    return (
      <input
        type="text"
        placeholder="Description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  renderButton(onClick: () => void): JSX.Element {
    return <button onClick={onClick}>Submit</button>;
  }
}
