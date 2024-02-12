# Project Feedback Collector

Project Feedback Collector is a web application focused on collecting user feedback on two different products. Developed using React and coded in VSCode, this application is deployed on AWS Amplify. It utilizes Amazon Web Services (AWS) Lambda functions, API Gateway, and S3 Bucket for processing feedback forms.

View Live Application: [https://master.d73081eebwwdg.amplifyapp.com/](https://master.d73081eebwwdg.amplifyapp.com/)

## Features

- **Feedback Form**: Users can submit feedback by filling in 8-9 different information fields such as name, phone number, etc. Most fields are mandatory, and validation is performed using `userSchema`.
- **Automatic Updates**: The application automatically updates whenever a push is made to the GitHub repository.
- **AWS Lambda and API Gateway**: Lambda functions are used to manage feedback data, with CORS configurations set up through API Gateway.
- **AWS S3 Bucket**: User feedback submissions are stored in an S3 Bucket.

## Technologies

### Frontend

- **HTML, CSS, JavaScript, React**: The core technologies used for building the user interface.
- **react-select**: Used for creating a searchable, customizable select dropdown for country selection.
- **Phone Input Library**: Utilizes a component (`import Phone from "./Phone";`) to facilitate phone number input, enhancing form usability and validation.

### Backend

- **AWS Lambda**: Manages backend processes, such as form submission handling, in a serverless architecture.
- **AWS API Gateway**: Provides a RESTful API interface for the frontend to communicate with backend services securely.

### Data Storage

- **AWS S3 Bucket**: Stores user feedback submissions in a scalable, secure web bucket.

### Deployment

- **AWS Amplify**: Facilitates deployment and hosting of the web application, providing seamless integration with other AWS services.

## About AWS Services

### AWS Lambda

AWS Lambda is a compute service that runs your code in response to events. In this project, Lambda functions are utilized to process user feedback form data.

### API Gateway

AWS API Gateway is a service for creating, publishing, maintaining, monitoring, and securing HTTP, RESTful APIs, and WebSocket APIs. CORS configuration is managed through this service.

### S3 Bucket

Amazon S3 (Simple Storage Service) provides scalable storage over the Internet. This project uses an S3 Bucket to store user feedback.

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/okanozman-create/contact-form-reactjs.git
Install dependencies:
npm install
Run the application:
npm start

## Contributing
If you wish to contribute to the project, please follow these steps:

Fork the project and create your branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to your branch (git push origin feature/AmazingFeature).
Open a Pull Request.
## License
Distributed under the MIT License. See LICENSE for more information.

