# GeneLab
To help with the organisation and tracking of Genetic Lab Strains.
Visualise your strains phylogeny, purchase strains and easily add new strains.

**[Relational Model](https://docs.google.com/drawings/d/19rR_shnmXq3-8fINedSf1_5HKc0NyXGFbh7hTcxJJ8o/edit)**

Back End: Ruby on Rails with Session login, PostrgreSQL
Front End: React, Bootstrap

### Front end deployment guide
Deploy with `npm run deploy`
Run `npm install` before trying to deploy

## Description
### key features
- user login with error handling
- inventory management system (CRUD) and orders
- phylogeny visualization
- QR code
- Rails session management with JS-Cookie management in React

###
Stack:
#### front end
- React
- bootstrap
- JS-Cookie management

#### backend
- Rails as an ORM and API
- Rails session management for user auth
- 3 model relational database
- PostrgreSQL

### To Do:
- [ ] Rebuild DB in Flask

### Roadmap:
- [ ] Rebuild DB in Flask
- [ ] deploy to heroku
- [ ]

## Tools
- [draft.js](https://draftjs.org/docs/getting-started)
- [react-qr-scanner](https://www.npmjs.com/package/react-qr-scanner)
