import AWS from 'aws-sdk';

AWS.config.update({ 
region: 'your_aws_region',  
accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
});

const ses = new AWS.SES({ apiVersion: 'latest' });
