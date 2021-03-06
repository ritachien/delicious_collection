# Delicious Collection
![demo.png](./Demo.png)
<br>
:sparkles: Display information of your favorite restaurants.  

## Features  
### User Account related  
:star: Login / register via Facebook or Google.  
:star: Enable to update user's name or password.  
:star: Show dismissible success or error message block while login, register or account edit.)
### Restarant list related  
:star: Shows users own restaurants list.  
:star: Click for further information of each restaurants.  
:star: Search restaurants by keywords(Use comma to separate keywords).  
:star: Sort restaurants by name, category, location or rating.  
:star: Add, edit, delete restaurants if needed.  
:star: Click to get google map of the restaurant.  
### Others  
:star: Support MongoDB to manage data.  
:star: Use Passport.js to support authentication.

## Getting Started
### Prerequisites
:white_check_mark: Be sure that Node.js and npm are installed already.  
- MacOS ([XCode](https://developer.apple.com/xcode/)、[nvm](https://github.com/nvm-sh/nvm))
- Windows ([nvm-windows](https://github.com/coreybutler/nvm-windows/releases))

:white_check_mark: If using `npm run dev` command, [nodemon](https://www.npmjs.com/package/nodemon) must be preinstalled.  

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
:white_check_mark: Set environment variables. Create a `.env` file in root, and add content to it. The needed variables are listed in `.env.example` file.  

:white_check_mark: Run the following command after install finished.  
```bash
# seeders: 2 users with 3 restaurants of each.
npm run seed

# start the app
# Be sure your current working directory is root, or it might cause some path loading error!
npm run start
```
:white_check_mark: Open browser to the URL if you see following message in console.  
```bash
Listening on http://localhost:3000
```
:white_check_mark: Stop using the app by `Ctrl + c`  

## Built With
* Runtime: node@16.14.2  
* Framework: express@4.17.3  
* Database: mongoose@6.2.10  
* View Engine: express-handlebars@6.0.4  
* Authentication: passport.js@0.6.0


Other dependencies are listed in package.json


## Authors
* [**Rita Chien**](https://github.com/ritachien)  
