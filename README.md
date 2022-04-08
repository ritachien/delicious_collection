# Delicious Collection
![demo.gif](https://raw.githubusercontent.com/ritachien/delicious_collection/2edf11300e0f93a4588d3b55d20d6b4b4829bd8f/Demo.gif)  
<br>
:sparkles: Display information of your favorite restaurants.  

## Features  
:star: Shows all restaurants in homepage.  
:star: Click for further information of each restaurant.  
:star: Search restaurants by keywords(Use comma to separate keywords).  
:star: Add, edit, delete restaurants if needed.  
:star: Support MongoDB to manage data.  



## Getting Started
### Prerequisites
:white_check_mark: Be sure that Node.js and npm are installed already.  
- MacOS ([XCode](https://developer.apple.com/xcode/)、[nvm](https://github.com/nvm-sh/nvm))
- Windows ([nvm-windows](https://github.com/coreybutler/nvm-windows/releases))

### Installing

:white_check_mark: Clone or download the project to your local machine.  
```bash
# folder_name(optional) will create a new folder in your pwd.
git clone <folder_name> https://github.com/ritachien/delicious_collection.git
```
:white_check_mark: Get into your project folder by `Terminal` and run:  
```bash
npm install
```

### How to use  
:white_check_mark: Set environment variable. Create a `.env` file in root, and add content to it.
```bash
MONGODB_URI=<your URI>
```


:white_check_mark: Run the following command after install finished.  
```bash
# seeder for test data (8 seeds provided)
npm run seed

# start the app
npm run start
```
:white_check_mark: Open browser to the URL if you see following message in console.  
```bash
Listening on http://localhost:3000
```
:white_check_mark: Stop using the app by `Ctrl + c`  

## Built With
* Node.js @16.14.2
* Express.js @4.17.3 - The web framework used
* express-handlebars @6.0.4 - View engine for Express
* dotenv @16.0.0 - Manage environment variables
* mongoose @4.2.10 - Connect and operate MongoDB
* Bootstrap @5.1.3 - For CSS stylesheet
* Font-awesome @5.8.1 - Icon used in project

## Authors
* Alpha Camp - project design.  
* [**Rita Chien**](https://github.com/ritachien) - project develop.  
