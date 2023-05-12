# Loan

A simple webapp to inquire a loan with customer details

##### USAGE

<u>Prior to anything, you should have Node installed in your machine</u>

Open the project folder with VSCode.

Open a terminal window and navigate to **client**.

```bash
cd client
```

Once in the correct path, run:

```bash
yarn install
# this will install all needed dependencies
# if you don't have yarn installed in your machine, delete the file
# yarn.lock in the root of the app folder and run the following command
npm i
```

To run the app locally, run the following command in the terminal window.

```bash
yarn start
# for npm
npm start
# this will run the app locally in your default browser using port 3000
# if a message emerges saying port 3000 is already in use, VSCode will
# suggest using another port, select yes
# to stop the app from running use Ctrl + c (on mac, and windows)
```

If running the app locally

```bash
# app will load with this address
http://localhost:3000
# add this line to the address
/partner_test.html
# select user id by adding
?id={number}
# id 0 = blank form
# id 1 | 2 = will load both users in db with different details
```

If running the app on the provided link: https://loan-form-dr3nan.web.app/partner_test.html

```bash
# add
?id={number}
# (same ids as in previous example)
# to load form and/or users
```



##### PROCESS

As first step I need to have a roadmap about how I will handle version control, select the preferred platform (GitHub), create the the repo, clone and continue.

Read all the requirements of the task at hand, and understanding what is needed, gather as much info as possible about the client and collect ideas from their page layout, such as design patterns and create a simple sketch.

I started the process by thinking about the app structure, the tools I was goign to use, and installing all needed dependencies. Since this project is small, I created a development branch to maintain a clean environment.

*Committing often is key to maintain good practices and makes turning back from an unwanted mistake easier.*

I continue by creating a development branch and work in said branch. My first approach is to create basic components, and their styling file. If I am working with TypeScript, I create the interfaces, create some state, minimal handlers and helpers to be able to run the app.

Once I have finished basic logic of the app, I proceed to create a feature branch and start implementing any features I need (again, since this is such small project, there is not really a need to create all branches at once, but the usual procedure would be to create all necessary branches from the start).

I test if the app's behaviour is correct and follows with requirements. Once happy with the results, then I proceed to work on the app's styling. As I am nearing the end of the process, I look for unnecessary code or some leftover logs and clean them.

That's the approache I have taken to create this app.

##### REMARKS

If I would develop the entire app, as fullstack developer, I would also have to consider how the backend would work. I would use a MERN stack since it would be performant and suits this purpose. Following MVC pattern as it would be scalable and easy to maintain.

As an improvement, the code of the form could be splitted in two, create another component that would hold all the JSX for the responses and pass state and functions as props.

Installing axios library perhaps would have given more flexibility when error handling and such.

Unit testing and some E2E testing would have been a plus.

##### SUGGESTIONS
