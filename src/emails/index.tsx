import {
    Body,
    Container,
    Hr,
    Html,
    Heading,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import { MOTORTREND_URL, MOTORTREND_STORE_URL } from "../utils/constants";
import React from 'react';

interface WelcomeEmailProps {
    name: string;
    headline: string;
    imageUrls: any[];
    articleUrls: string[];
    articleTitles: string[];
    articleDescriptions: string[];
}
   

export default function MotortrendNewsletterEmailTemplate({
    name,
    headline,
    imageUrls,
    articleUrls,
    articleTitles,
    articleDescriptions
}: WelcomeEmailProps) {


    return (
        <Html>
            <Preview>Motortrend</Preview>
            <Body style={main}>
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
            </Body>
        </Html>
    );
}
  
const main = {
    backgroundColor: "#dbddde",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
  
const container = {
    margin: "30px auto",
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden"
};
  
const containerContact = {
    backgroundColor: "#f0fcff",
    width: "90%",
    borderRadius: "5px",
    overflow: "hidden",
    paddingLeft: "20px",
};
  
const heading = {
    lineHeight: "1.3",
    fontWeight: "700"
};
  
const paragraphContent = {
    padding: "0 40px",
};
  
const paragraphList = {
    paddingLeft: 40,
};
  
const paragraph = {
    fontSize: "14px",
    lineHeight: "22px",
    color: "#3c4043",
};
  
const link = {
    ...paragraph,
    color: "#004dcf",
};
  
const hr = {
    borderColor: "#e8eaed",
    margin: "20px 0",
};
