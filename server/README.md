
# Project Title

A brief description of what this project does and who it's for


## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## API Reference

#### Get all projects

```http
  GET /projects
```

#### Create a project

```http
  POST /projects
```

#### Get all developers

```http
  GET /projects/developers
```

#### Create a Bug  

```http
  POST /bug
```

#### Create a User  

```http
  POST /registration
```
#### Login a User 

```http
  POST /session
```

## Authors

- [@usmansiddique123](https://www.github.com/usmansiddique123)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Appendix

-- Manager can create, edit and delete projects 

-- QA can report bugs

-- Developers can assign and resolve bugs

-- Authorization is done through Passport-JWT Strategy. 

-- Image Uploading is done through multer

-- MongoDB has been used as a Database. 
 
## Deployment

To deploy this project run

```Heroku
   git push heroku master
```


## Run Locally

Clone the project

```bash
  https://github.com/usmansiddique123/bugzilla-app-mern.git
```

Go to the project directory

```bash
  cd bugzilla-mern-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

