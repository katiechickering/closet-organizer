# 👕 Closet Organizer


## 🌟 Highlights

- Register an account to enter the app
- Organize your clothing items by category
- Add clothing items to your closet
- View clothing item information such as size, brand, and color
- Delete or update clothing items if needed


## ℹ️ Overview

This project was built with a Node.js and Express backend and a React frontend styled with Tailwind CSS. Created with an MVC structure, this app uses MongoDB for the model, an Express API as the controller, and React for the view. The clothing item feature provides full CRUD functionality. We implemented login and registration using JSON Web Tokens, stored in browser cookies for authentication. We noticed the inefficiency and inconvenience of physically going through tons of clothes and accessories. We created a better solution by being able to have access to your entire closet in the palm of your hand.


## ✍️ Authors

Shadrach Tercy - http://github.com/theclassic2

Katie Chickering - https://github.com/katiechickering


## 🛜 Deployment

[Click here to view my deployed app!](https://main.dsrw9hnagm1lz.amplifyapp.com/)

To deploy our application, we used AWS App Runner for the backend API, and AWS Amplify for the frontend. Both services are connected to this GitHub monorepo and automatically update whenever changes are pushed to the repository. Environment variables were configured through the App Runner and Amplify interfaces. App Runner routes to the `server` folder, while Amplify routes to the `client` folder. To host the database, we used MongoDB Atlas.


## ⬇️ Local Installation

Open two terminals and route to the `server` folder and `client` folder respectively.

Run the command below in the `server` terminal:
```bash
npm install
```

Run the command below in the `client` terminal:
```bash
npm install
```

Then, create a `.env` file in both the `server` folder and `client` folder. Follow the instructions in the `.env.example` files to set up your environment variables.


## 🚀 Local Usage

First, run the command below in the `server` terminal:
```bash
npm start
```

Second, run the commands below in the `client` terminal:
```bash
npm run build
npm run preview
```

Copy and paste http://localhost:4173/ into your browser to view the application!


## 💭 Feedback and Contributing

If you found this insightful or if you have suggestions, please start a [discussion](https://github.com/katiechickering/closet-organizer/discussions/11)!