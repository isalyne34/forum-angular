# ForumAngular

The goal of this project is to discover Angular by creating a forum where you can find subjects and associated posts. You can create, update or delete all resources depending on your role (if you create a resource, you can update and delete it).

## Visuals

![Login Page](<Screenshot from 2024-07-05 18-59-26.png>)
![Subject List](<Screenshot from 2024-07-05 18-58-43.png>)
![Subject Page](<Screenshot from 2024-07-05 18-59-12.png>)


## Installation 
You can run this project locally by following the instructions below.

### Backend  
- `cd back/pocketbase_0.22.14_linux_amd64/`  
If this doesn't fit your architecture or OS, you can download other versions [here](https://pocketbase.io/docs/).
- Run `./pocketbase serve`
- Through http://127.0.0.1:8090/, you can import, via the settings page, the file `pb_schema.json` to populate your database.

### Frontend  
- `cd front`  
- Run `ng serve` for a dev server. 
- Navigate to `http://localhost:4200/`.   j
The application will automatically reload if you change any of the source files.

*This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.*


## Usage

- First, you need to login you with email address and password. You can add a new account using the pocketbase interface.
- Now, you can create a subject or edit/delete a subject if you are the owner of this subject. You can open any subject.
- In a subject, you can see all the associated posts. You can create a new post on the list. If you are the owner of a post, you can edit or delete it.

