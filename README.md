# Delicious Collection
![demo.png](./Demo.png)
<br>
:sparkles: Display information of your favorite restaurants.  

## Features  
:star: Shows all restaurants in homepage.  
:star: Click for further information of each restaurant.  
:star: Search restaurants by keywords(Use comma to separate keywords).  
:star: Sort restaurants by name, category, location or rating.  
:star: Add, edit, delete restaurants if needed.  
:star: Click to get google map of the restaurant.
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
:white_check_mark: Set environment variable. Create a `.env` file in `config` folder, and add content to it.
```bash
MONGODB_URI="<your URI>"
```


:white_check_mark: Run the following command after install finished.  
```bash
# seeder for test data (8 seeds provided)
npm run seed

# start the app
# Be sure your current working directory is root, or it might cause .env loading error!
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
