
# Cyolo (home assignment).

Full-Stack application for Cyolo.  
   
- Developer: Milad Bannourah.
- Portfolio: https://milad-bannourah-portfolio.vercel.app/
- LinkedIn: https://www.linkedin.com/in/milad-bannourah/
- GitHub: https://github.com/miladBann
## Tech Stack used:
Frontend: React

Backend: Node.js and express.js

tests: Jest, react testing library.
## Instructions to use the APP (visual with pictures)
please open this link for an easy and visual way to help you navigate the app.

https://scribehow.com/shared/How_to_Upload_a_File_Set_an_Expiration_Time_and_Copy_the_Link__V8qNpHH9RQKQwWJp_LPTjg
## Running the application
1- Clone this repo into your own github repo or just download the folders.

2- Open both the client folder and the server folder in your code editor.

3- (for this step and the next ones, if you use yarn instead of npm just replace any command that has npm with yarn).

4- From your terminal navigate to the client folder and run the command "npm install" to get the node_modules folder.

5- Repeat step 4 for the server folder.

6- Start the frontend of the application by running the command "npm start" from the terminal inside the client folder.

7- Start the backend of the application by running the command "npm run start_dev" from the terminal inside the server folder.(ther server uses nodemon for auto restarting).

8- Now the app is ready to be used, just click the middle box to upload an image, and give it an expiration time in minutes then submite it.
the server will return a link for you that you can paste in your browser to view the image, and after the expiration time passes the image will be deleted automatically to save space.

## Testing

- Frontend: make sure you are inside the client folder, open it in the terminal by navigating to it's path and run "npm test" to run all 6 tests.

- Backend: make sure you are inside the server folder, open it in the teminal by navigating to it's path and run "npx jest FileRetention.test.js" this runs the test that checks the file retention system, passing this test means that the application is succesfully accepting images, uploading them, returning the link to the user, and finally deleteing the expired images.
