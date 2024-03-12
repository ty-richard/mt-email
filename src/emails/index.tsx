import {
    Body,
    Container,
    Column,
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
import React from 'react';

interface WelcomeEmailProps {
    name: string;
    headline: string;
    imageUrls: any[];
}
   

export default function MotortrendNewsletterEmailTemplate({
    name,
    headline,
    imageUrls
}: WelcomeEmailProps) {


    return (
        <Html>
            <Preview>Motortrend</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={heading}>
                        <Heading as="h1"  style={{ textAlign: "center" }}>
                            Motortrend
                        </Heading>
                        <Heading as="h3" style={{ textAlign: "center" }}>
                           Welcome {name}!
                        </Heading>
                        <Heading as="h2" style={{ textAlign: "center" }}>
                            {headline}
                        </Heading>
                    </Section>
                    <Section>
                        {imageUrls.map((image, index) => (
                        <Img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            width="100%"
                            height="auto"
                            style={{ marginBottom: '20px' }}
                        />
                        ))}
                    </Section>
                    <Section style={paragraphList}>
                        <Text style={paragraph}>
                            Come visit us at the Motortrend Group to see the latest news and
                            updates.
                        <Link href="https://www.motortrend.com/" style={link}>
                            See more
                        </Link>
                        </Text>
                    </Section>
                    <Section style={paragraphContent}>
                        <Text style={paragraph}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Dolor morbi non arcu risus quis varius.
                        Orci ac auctor augue mauris augue neque gravida in. Leo urna molestie at elementum eu
                        facilisis sed. Convallis posuere morbi leo urna molestie. Ornare suspendisse sed nisi
                        lacus sed viverra tellus in hac. Nisi scelerisque eu ultrices vitae auctor eu. Diam quam
                        nulla porttitor massa id neque aliquam vestibulum morbi. Volutpat blandit aliquam etiam
                        erat velit.
                        </Text>
                        <Hr style={hr} />
                    </Section>
        
                    <Section style={paragraphContent}>
                        <Text style={paragraph}>Thank you,</Text>
                        <Text style={{ ...paragraph, fontSize: "20px" }}>
                        The Motortrend Group
                        </Text>
                    </Section>
        
                    <Section style={containerContact}>
                        <Row>
                            <Text style={{ ...paragraph }}>Connect with us</Text>
                            <Link href="https://www.motortrend.com/"  style={{ paddingBottom: 20 }}>
                                    Here at Motortrend!!
                            </Link>
                        </Row>
                    </Section>
                    <Section style={{ ...paragraphContent, paddingBottom: 30 }}>
                        <Text
                        style={{
                            ...paragraph,
                            fontSize: "12px",
                            textAlign: "center",
                            margin: 0,
                        }}
                        >
                        The Motortrend Group 831 S Douglass St, El Segundo, CA
                        90245
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
