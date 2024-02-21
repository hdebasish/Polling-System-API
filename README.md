# Polling System API 

## Documentation

A polling API for adding questions and options would provide endpoints and functionality to facilitate the creation and management of polls, including the questions and options available for users to vote on. 

[Polling System API](https://polling-system-api-z3h8.onrender.com/)

## Author

- Debasish Halder

## Features

- Create a question (you can add as many questions as you want)
- Add options to a question
- Add a vote to an option of question
- Delete a question → (A question can’t be deleted if one of it’s options has votes)
- Delete an option → (An option can’t be deleted if it has even one vote given to it)
- View a question with it’s options and all the votes given to it
  
## Usage

You can access the Polling System API at the following base URL:

```url
  https://polling-system-api-z3h8.onrender.com/
```

### Creating Questions

- Endpoint: `POST /api/questions/create`
- Description: Creates a new poll question.

Request Body:

```json
  {
    "title":"Who is the best player in IPL history?"
  }
```
Response:

```json
  {
    "title": "Who is the best player in IPL history?",
    "options": [],
    "_id": "65d4d9a5797ef23e2962204f",
    "__v": 0
}
```

### Adding Options to a Question

- Endpoint: `POST /api/questions/:questionId/options/create`
- Description: Adds options to an existing question.

Request Body:

```json
  {
    "text":"Virat Kholi"
  }
```
Response:

```json
{
    "questionId": "65d4d9a5797ef23e2962204f",
    "text": "Virat Kholi",
    "votes": 0,
    "_id": "65d5eb225d1652eca04f38d1",
    "link_to_vote": "https://polling-system-api-z3h8.onrender.com/api/options/65d5eb225d1652eca04f38d1/add_vote",
    "__v": 0
}
```

### Voting

- Endpoint: `GET /api/options/:optionId/add_vote`
- Description: Submits a vote for a specific question option.

Response:

```text
Vote added successfully
```

### Retrieving a question

- Endpoint: `GET /api/questions/:questionId`
- Description: Retrieves the voting results for a specific question.

Response:

```json
{
    "_id": "65d4d9a5797ef23e2962204f",
    "title": "Who is the best player in IPL history?",
    "options": [
        {
            "_id": "65d5eb225d1652eca04f38d1",
            "text": "Virat Kholi",
            "votes": 1,
            "link_to_vote": "https://polling-system-api-z3h8.onrender.com/api/options/65d5eb225d1652eca04f38d1/add_vote"
        },
        {
            "_id": "65d5ee915d1652eca04f38da",
            "text": "Rohit Sharma",
            "votes": 0,
            "link_to_vote": "https://polling-system-api-z3h8.onrender.com/api/options/65d5ee915d1652eca04f38da/add_vote"
        },
        {
            "_id": "65d5eece5d1652eca04f38de",
            "text": "Shikhar Dhawan",
            "votes": 0,
            "link_to_vote": "https://polling-system-api-z3h8.onrender.com/api/options/65d5eece5d1652eca04f38de/add_vote"
        }
    ],
    "__v": 0
}
```

### Delete a question

- Endpoint: `DELETE /api/questions/:questionId/delete`
- Description: Deletes a specific question if it's options doesen't exists.

Response:

```text
Deleted Successfully
```

### Delete a option

- Endpoint: `DELETE /api/options/:optionId/delete`
- Description: Deletes a specific option if it has zero votes.

Response:

```text
Option deleted successfully
```

## Feedback

If you have any feedback, please reach out to us at hdebasish@gmail.com
