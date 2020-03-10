___ All 3 user stories are finished now ___
The app consists of several coponents now separated by concerns and logic
App component holds **HeaderSearch** **UserList** i **Modal** components.
**HeaderSearch** accepts user input and on button click starts search process
Once the list is loaded, from within **UserList** component, based on the _username_ property passed to it by the parent
List has additional button show more visible if there are more users to be fetched for that criteria

One user list item hold user avatar, user's username, name, location if visible and the time of his last update
When we click on a user in the list, his username is passed to the **Modal** component.
**Modal** simply passes the information to **CommitsModal** component and by itself handles toggling it on and off the screen
**CommitsModal** keeps a list of past commits by user arranged by date descending. Every **Commit** 
only holds time of the update repository name and number of commits the user has done at that particular time.


There are much more additions that I'd add to the app to make it really, properly, 100% production ready. 
There is pagination to be added to the fetch commits call. 
I'd probably rewrite modal to keep the commits and show them again these ones if the user is reopening the same modal. Or maybe we want to get fresh data every time. 
I would also add some error messaging for the user. Ways to tell them if something goes wrong :)
Ideally, I wanted to fetch all types of contributions and present them in a list with more info.
I haven't worked with React before, it's test frameworks nor GraphQL and I really find it quite intersting and powerful.
In hindsight there are some other things I would add now to the app, but I am very happy to discuss it much more in details in person :)

 -- You can write me on **matovicluka@gmail.com** if you have any additional questions. -- 


__*GfK Front End Code Challenge*__

__*Scenario*__

You have been recently hired as a senior developer on a startup that is trying to build a web application using GitHub's search API. There are concerns over the quality of the existing codebase; moreover, your architect has decided that the application should use [GitHub's GraphQL API](https://developer.github.com/v4/) instead of its REST API in future.

*Please submit your solution once you deem it production ready.*

Your first ticket is as follows: 

__User Story__

*As a:* User 

*I want:* to be able to search GitHub by user name and display a list of matches.

*So that:* I can find my friends.


__User Story__

*As a:* User 

*I want:* to see a user's avatar.

*So that:* I can recognise my friends.


__User Story__

*As a:* User 

*I want:* to see information about a user's activity.

*So that:* I can understand their commit history.





