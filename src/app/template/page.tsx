"use client";

import { Container } from "@react-email/container"; 
import { Hr } from "@react-email/hr";
import { Heading } from "@react-email/heading";
import { Img } from "@react-email/img";
import { Link } from "@react-email/link";
import { Preview } from "@react-email/preview";
import { Row } from "@react-email/row";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { MOTORTREND_URL, MOTORTREND_STORE_URL } from "../../utils/constants";
import React, { useState, useEffect } from "react";
import OpenAI from "openai";
   
export default function TemplatePage() {
    const [state, setState] = useState<string>();
    const [articles, setArticles] = useState<any[]>([]);
    // const [trending, setTrending] = useState<any[]>([]);
    const [headline, setHeadline] = useState<string>("Welcome to Motortrend!");
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [articleUrls, setArticleUrls] = useState<string[]>([]);
    const [articleTitles, setArticleTitles] = useState<string[]>([]);
    const [articleDescriptions, setArticleDescriptions] = useState<string[]>([]);

    // useEffect(() => {
    //     const fetchTrending = async () => {
    //         try {
    //             const response = await fetch('https://os-interactions.stg.motortrend.com');
    //             if (!response.ok) {
    //                 console.error('Error fetching trending:', response.statusText);
    //                 return;
    //             }
    //             const data = await response.json();
    //             const trendingData = data.data;
    //             setArticles(trendingData);
    //         } catch (error) {
    //             console.error('An error occurred while fetching trending:', error);
    //         }
    //     };

    //     fetchTrending();
    // }, []);

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

    useEffect(() => {
        if (articles.length > 0) {
            headlineGenerator();
        }
    }, [articles]);

    const getRandomArticles = (allArticles: string[], count: number): string[] => {
        const shuffledArticles = allArticles.slice().sort(() => 0.5 - Math.random());
        return shuffledArticles.slice(0, count);
    };

    const headlineGenerator = async () => {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
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
            setHeadline(content!);
            const urls = articles.map((article) => article.articleFeaturedImage);
            setImageUrls(urls);
            const articleUrls = articles.map((article) => article.articlePath);
            setArticleUrls(articleUrls);
            const articleTitles = articles.map((article) => article.articleTitle);
            setArticleTitles(articleTitles);
            const articleDescriptions = articles.map((article) => article.articleMetaDescription);
            setArticleDescriptions(articleDescriptions);
            console.log("update commits")
        } catch (error) {
            console.error('An error occurred while submitting the form:', error);
        } finally {
            setState('ready');
        }
    };

    return (
        <Container className="mx-auto max-w-3xl bg-gray-200 p-4">
            <Preview>Motortrend</Preview>
            <Section className="text-center">
                <Heading as="h1" className="text-3xl text-black font-bold mb-2">
                    Motortrend 75
                </Heading>
                <Heading as="h2" className="text-2xl text-black font-bold mb-4">
                    {headline}
                </Heading>
                <Row className="my-7 text-black">
                    <Link href={`${MOTORTREND_URL}auto-news`} className="text-black mx-8 hover:underline">News</Link>
                    <Link href={`${MOTORTREND_URL}car-reviews`} className="text-black mx-8 hover:underline">Reviews</Link>
                    <Link href={`${MOTORTREND_URL}cars`} className="text-black mx-8 hover:underline">Find a Car</Link>
                    <Link href={`${MOTORTREND_URL}plus/`} className="text-black mx-8 hover:underline">Watch</Link>
                    <Link href={MOTORTREND_STORE_URL} className="text-black mx-8 hover:underline">Merch</Link>
                </Row>
            </Section>
            <Hr className="my-4 bg-gray-800" />
            <Section className="flex flex-wrap justify-center">
                {imageUrls.map((image, index) => (
                    <div key={index} className="h-full w-full flex items-center mb-4">
                        <a href={`${MOTORTREND_URL}${articleUrls[index]}`} className="w-full md:w-5/6" target="_blank" rel="noopener noreferrer">
                            <Img
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="h-auto w-auto object-cover rounded-lg"
                            />
                        </a>
                        
                        <div className="ml-4 h-full flex flex-col justify-center">
                            <Heading as="h4" className="text-xl text-black font-bold mb-4">
                                {articleTitles[index]}
                            </Heading>
                            <p className="text-base text-black">
                                {articleDescriptions[index] && articleDescriptions[index].length > 50 ? articleDescriptions[index].substring(0, 50) + "..." : articleDescriptions[index]}
                                {articleDescriptions[index] && articleDescriptions[index].length > 50 ? (
                                    <span>
                                        <br />
                                        <a href={`${MOTORTREND_URL}${articleUrls[index]}`} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">READ MORE</a>
                                    </span>
                                ) : (
                                    <span className="text-base text-black">READ MORE</span>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </Section>
            <Section className="px-4">
                <Text className="text-base text-black">
                    Come visit us at the Motortrend Group to see the latest news and
                    updates.{' '}
                    <Link
                        href={`${MOTORTREND_URL}`}
                        className="text-blue-500 hover:underline"
                    >
                        See more
                    </Link>
                </Text>
            </Section>
            <Section className="px-4">
                <Text className="text-base text-black">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor
                    morbi non arcu risus quis varius. Orci ac auctor augue mauris augue
                    neque gravida in. Leo urna molestie at elementum eu facilisis sed.
                    Convallis posuere morbi leo urna molestie. Ornare suspendisse sed nisi
                    lacus sed viverra tellus in hac. Nisi scelerisque eu ultrices vitae
                    auctor eu. Diam quam nulla porttitor massa id neque aliquam vestibulum
                    morbi. Volutpat blandit aliquam etiam erat velit.
                </Text>
                <Hr className="my-4 border-gray-300" />
            </Section>
            <Section className="px-4">
                <Text className="text-base text-black">Thank you,</Text>
                <Text className="text-lg font-bold text-black">
                    The Motortrend Group
                </Text>
            </Section>
            <Section className="px-4">
                <Row className="mb-4">
                    <Text className="text-base text-black">Connect with us</Text>
                    <Link
                        href={`${MOTORTREND_URL}`}
                        className="text-blue-500 hover:underline"
                    >
                        Here at Motortrend!!
                    </Link>
                </Row>
            </Section>
            <Section className="px-4 pb-4">
                <Text className="text-xs text-black text-center">
                    The Motortrend Group 831 S Douglass St, El Segundo, CA 90245
                </Text>
            </Section>
        </Container>
    );
}
