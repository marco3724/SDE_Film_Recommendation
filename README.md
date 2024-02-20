# SDE_Film_Recommendation [service design and engineering 23/24]

The goal for this project was to provide users with a comprehensive overview of a film by aggregating information from various sources. Recognizing that different platforms may contain different data about the same movie. Additionally, to mitigate bias, we offered a rating score based on multiple review system sources and averaged the result. Lastly, our platform also offers film recommendations based on users preferences and maintaining a history of recommended films for future viewing.

![Alt text](./docs/architecture.jpg)

# How to run
To run this application Docker and Docker compose are **required**.\
In order to run this project you will need to obtain the API keys from **RapidAPI** and **TMDb**.\
Then set the env variables:
```
JWT_SECRET="your secret key"
X_RAPIDAPI_KEY="your secret key"
TMDB_AUTHORIZATION="your secret key"
``` 
in the `.env_sample` file, and rename it to `.env`\
Then run the following command in the root directory of this project:
```
docker-compose up --build
```
The web interface will be available at http://localhost (on port 3000).

