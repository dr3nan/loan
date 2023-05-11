# Loan

A simple web-app to inquire a loan with customer details

##### PROCESS

As first step I need to have a roadmap about how I will handle version control, select the preferred platform (GitHub), create the the repo, clone and continue.

Read all the requirements of the task at hand and understanding what is needed, gather as much info as possible about the client and collect ideas from their page layout, design patterns and create a simple sketch.

I started the process by thinking about the structure of the app, the tools I was goign to use, and installing all needed dependencies. Since is such small project, I create a development branch to maintain main branch clean.

Committing often is key to maintain good practices and make makes turning back from an error easier.

I follow by creating a development branch and work in said branch. My first approach is to create basic components, and their styling file. If I am using TypeScript I create the interfaces and I start building the app. Create some state and create minimal handlers and helpers to be able to run the app.

Once I have finished basic logic of the app, I proceed to create a feature branch and start implementing any features I need (again, since this is such small project, there is not really a need to create all branches at once, but the usual procedure would be to create all necessary branches from the start).

I test if the behaviour of the app is correct and follows with requirements, once happy with the results I proceed to work on the styling of the app, as I am nearing the end of the process, I look for unnecessary code or some leftover logs and clean them.

That's my approach to creating this app in particular.

##### REMARKS

As an improvement, the code of the form could be splitted in two, create another component that would hold all the JSX for the responses and pass state and functions as props.

Perhaps install axios library would have given a bit more flexibility when error handling and such.

##### SUGGESTIONS


