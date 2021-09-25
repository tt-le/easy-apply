# Motivation 
Easy Apply is a job search tool that improves upon the current job seeking process by allowing users 
to create a video introduction of themselves to express creativity and uniqueness of each user. 
Thereby allowing employers to easily digest applicants’ info via video format without shifting through heaps of resumes.


# Getting Started
## Prerequisites
- You will need [python](https://www.python.org/downloads/) for the building backend.
- You will need npm and [node](https://nodejs.org/en/) for building the frontend.
- To deploy a local database, you will need [postgresql](https://www.postgresql.org/download/).

## Installation and deployment

1. Clone the repo.
```bash 
git clone https://github.com/UTSCCSCC01/projectf21-team-anything-works.git easy-apply
cd easy-apply
```

2. Go to the backend directory and create a virtual environment. 

```bash
cd backend && python3 -m venv .
```

3. Install python dependencies into the virtual environment using the provided list. 

```bash
pip install -r requirement.txt
```
4. Migrate the database

```bash
flask db init
flask db migrate -m "Initial migration."
```

5. Deploy the flask backend locally

```bash
python3 run.py
```

6. Go to the frontend directory and install all node dependencies

```bash
cd ../frontend && npm i 
```

7. Deploy the React Frontend locally

```bash
npm start
```

## Configuration
Backend configuration is done in [config.py](https://github.com/UTSCCSCC01/projectf21-team-anything-works/blob/main/backend/config.py). To connect your database,  
change the following variable appropriately: 
```python
SQLALCHEMY_DATABASE_URI = "postgresql://{user}:{password}@localhost:{PORT}/{tableName}"
```
To use the configuration as is, simply run the postgresql server with default settings. 

The table configured for the dummy API is the following, create it by using postgresql CLI tool. 

```bash
psql -U postgres
```

Run the following to create the table.
```bash
CREATE TABLE dummyDB ( 
name VARCHAR ( 255 ) UNIQUE NOT NULL, 
id  serial PRIMARY KEY, 
date_created TIMESTAMP NOT NULL, date_modified TIMESTAMP );
```

# Contributing: 
Please refer to each project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Commit changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request
