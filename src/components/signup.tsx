"use client";

import React, { useState, useEffect } from 'react';
import OpenAI from "openai";

interface FormData {
  name: string;
  email: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [state, setState] = useState<string>();
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://mt-lite-api.vercel.app/api/articles');
        if (!response.ok) {
          console.error('Error fetching articles:', response.statusText);
          return;
        }
        const data = await response.json();
        const articleData = data.data;
        const randomArticles = getRandomArticles(articleData, 6);
        setArticles(randomArticles);
      } catch (error) {
        console.error('An error occurred while fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const getRandomArticles = (allArticles: string[], count: number): string[] => {
    const shuffledArticles = allArticles.slice().sort(() => 0.5 - Math.random());
    return shuffledArticles.slice(0, count);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("TITLE::::", articles[0].articleTitle)
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setState('loading');

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    const { articleTitle } = articles[0];
  
    try {
      const generatedHeadline = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "You will be provided with an article title, and your task is to generate attention grabbing headline from title."
          },
          {
            "role": "user",
            "content": articleTitle

          }
        ],
        temperature: 0.8,
        max_tokens: 30,
        top_p: 1,
      });

      const { choices: [{ message: { content } }] } = generatedHeadline;

      setFormData((prevData) => ({ ...prevData, headline: content }));
  
      const response = await fetch('/api/emails', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          headline: content,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.error('Error submitting the form:', response.statusText);
        return;
      }
  
      console.log('Form submitted successfully:', formData);
    } catch (error) {
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
