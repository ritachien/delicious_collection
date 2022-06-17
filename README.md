# Delicious Collection
![demo.png](./Demo.png)
<br>
:sparkles: Display information of your favorite restaurants.  

## Features  
:star: Login / register via Facebook or Google.  
:star: Shows users own restaurants list.  
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
:white_check_mark: Set environment variables. Create a `.env` file in root, and add content to it. The needed variabls are listed in `.env.example` file.  

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
* Bootstrap @5.1.3
* Express.js @4.17.3
* Font-awesome @5.8.1
* Node.js @16.14.2
* bcryptjs @2.4.3
* connect-flash @0.1.1
* dotenv @16.0.0
* express-handlebars @6.0.4
* express-session @1.17.3
* method-override @3.0.0
* mongoose @6.2.10
* passport @0.6.0
* passport-facebook @3.0.0
* passport-google-oauth20 @2.0.0
* passport-local @1.0.0

## Authors
* [**Rita Chien**](https://github.com/ritachien)  
