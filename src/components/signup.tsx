"use client";

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [state, setState] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setState('loading');
  
    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        body: JSON.stringify({
          firstName: formData.name,
          email: formData.email
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        // Handle the error based on your requirements
        console.error('Error submitting the form:', response.statusText);
        return;
      }
  
      // If successful, you can proceed with your logic here
      console.log('Form submitted successfully:', formData);
    } catch (error) {
      // Handle any other errors that might occur during the fetch
      console.error('An error occurred while submitting the form:', error);
    } finally {
      setState('ready');
    }
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" disabled={state === 'loading'}>Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
