# Sommer
A **So**cial **M**edia **M**anag**er** Web App, to manage your Social Media 

## Setting up the project

1. ### Fork the Project
  <img width="950" alt="image" src="https://user-images.githubusercontent.com/75921254/195995103-3cddfd6d-34e1-4f3c-b030-cedd87e69dd6.png">

   fill in desired name and create fork


2. ### Clone the Repository to local machine
  ```
  git clone <repo_url>
  ```
  here replace <repo_url> with the url of your forked Repository


3. ### Navigate to Main Directory/Repository
  ```
  cd <repo_name>
  ```
  here replace the <repo_name> with the name you gave to Repository


4. ### Install dependencies
  ```
  npm i
  ```

5. ### Create a MongoDB cluster and get the connection URL : </br>
  Reference : https://medium.com/featurepreneur/how-to-create-a-cluster-in-mongodb-28996662b3ac


6. ### Instantiate a config file :
  ```
  type nul > config.env
  ```


7. ### insert field 'DB_CONNECTION' with value as your connection URL
  <img width="656" alt="image" src="https://user-images.githubusercontent.com/75921254/195996743-052ff03a-3b94-41d5-b9e1-8342b2d0f6ff.png">


8. ### Create a google workspace Project and a service account : </br>
  Reference : https://developers.google.com/android/management/service-account

9. ### Get the Service account Credentials : </br> 
  Reference : https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating </br>
  Download the credentials as json file in the main directory with name 'sommer-gdrive-key' </br>
  <img width="191" alt="image" src="https://user-images.githubusercontent.com/75921254/195997057-00d4ded5-04fa-4615-994c-6f0347cb983b.png">

10. ### Create a folder in google drive using personal account and share with the service account email giving it editing access : </br>
<img width="507" alt="image" src="https://user-images.githubusercontent.com/75921254/195997747-dc03080f-a7ce-4b7e-85e7-c1a10d747800.png"> <img width="390" alt="image" src="https://user-images.githubusercontent.com/75921254/195997805-ecec071b-574b-47dc-971f-21702f0a8eaf.png">

11. ### Copy the folder ID, and add in config.env with key as 'SOMMER_FOLDER'
<img width="461" alt="image" src="https://user-images.githubusercontent.com/75921254/195997889-e1f76b38-bd35-4691-9fc3-a0f2c169eb40.png"><img width="659" alt="image" src="https://user-images.githubusercontent.com/75921254/195998015-f32bcdf7-8a37-48e0-b7aa-15f760e97e39.png">

12. ### ADD JWT secret string, any string with key SECRET in config.env
<img width="674" alt="image" src="https://user-images.githubusercontent.com/75921254/195998147-ef4ee2e6-f025-4a5f-a974-0c56548c0d65.png">
may also add optional key PORT with value as desired port


13. ### seed the database
```
node utils\seed.js all
```


14. ### Run The Project
```
npm run start
```
<img width="436" alt="image" src="https://user-images.githubusercontent.com/75921254/195998307-c6def064-66ad-4df5-972f-028398965765.png">


## Hurray 🥳, the web app is live at localhost:<port_number>
<img width="960" alt="image" src="https://user-images.githubusercontent.com/75921254/195998508-cf98ac1b-f36f-4508-91e1-d9ab4ba60f74.png">

<img width="944" alt="image" src="https://user-images.githubusercontent.com/75921254/195998728-eb641b2e-0549-48ee-ad1f-f5b62b994805.png">

<img width="944" alt="image" src="https://user-images.githubusercontent.com/75921254/195998749-56c3deeb-a5fe-4998-b571-bbe417845d37.png">


## List of implemented Feature(s)
- User authentication and authorization (Signup and Login).
- Previlaged User Roles : member,coordinator and lead.
- Task/Subtask CRUD operations
- Subtask assignment and unassignment by users
- subtask status derived via file upload and deadlines as virtual field
- Files upload and download via google drive api and service account
- User dashboards, with their subtasks and club dashboards with all tasks of club
- Error Handling and feedback to user
- A nice responsive UI 


## List of unimplemented/Planned Feature(s)
- Confirmation email,forgot password, user sessions features pertaining to authentication
- More robust Authorization using refactored route mapping and additional middlewares
- Admin Role to Register clubs, and add social media available
- Add **task** to calendar for deadlines
- More user friendly file uploads and downloads by showing progress bars
- implementing api features like filtering,sorting and pagination
- More robust and Complete Error Handling with custom/friendly error messages
- Allowing user to belong to multiple clubs
- Comment section for each task and subtas to discuss
- Schedule posts pre-hand
- Calendar based UI for planning
- Integration with social Media platforms
- use webpack with complete configuration to handle sass and js modules
- implement rate-limiter,compressor ans security headers for production release

## Reference(s) Used:
- documentation(s)
  - Mongoose : https://mongoosejs.com/docs/api.html
  - Express : https://expressjs.com/en/5x/api.html
  - Pugjs : https://pugjs.org/api/getting-started.html
  - Node js : https://nodejs.org/docs/latest-v17.x/api/
  - Bootstrap : https://getbootstrap.com/docs/5.2/getting-started/introduction/
  - Gdrive : https://developers.google.com/drive/api/v3/reference
- Course(s)
  - Node.js, Express, MongoDB & More: The Complete Bootcamp 2022 : https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/
- Stack Exchange
  - file downloads : 
    - https://stackoverflow.com/questions/59164411/get-uploaded-file-as-stream-using-express
      - By : https://stackoverflow.com/users/1119863/marcos-casagrande
    - https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
      - By : Community wiki https://stackoverflow.com/users/6160662/vinay
 - youtube
    - File-uploads : https://www.youtube.com/watch?v=Z2MCxblgPoc
      - By : DAIMTO Developer Tips 
      
## Known issue(s)/bug(s) : 
- Use of Parcel Bundler
  - parcel-bundler is depreceated and hence must be replaced with webpack or other bundlers
- config file loading issue
  - seeding data includes deletion of all folders except the root project folder : **Sommer** in gdrive
  - using utils\seed.js with 'all' command line argument involves use of config file, but it doesn't seem to load
  - as a result unsuccessful attempt to delete root dolder is made, in utils\fileHandler.js => deleteAllFiles()
  
## Additional Note(s)
### Rebundling on modification/addition of public js files
  - All new js files' content must be imported in public\js\index.js (if new files created)
  - from root directory run : 
    ```
    npx parcel public\js\index.js public\js\dist\index.js  
    ```
### Recompiling sass file on modification/addition of public css files
  - all new css files must be imported in public\css\bootstrap.scss
  - from root directory run : 
    ```
    npx sass public\css\bootstrap.scss public\css\bootstrap.css
    ```
    
    



