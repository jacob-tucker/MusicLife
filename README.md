# Overview

This application is a full-stack application. The client is build in React.js, and utilizes the Redux library to communicate with the Firebase database, which is a database hosted by google, and can be found here: https://firebase.google.com/. The MusicLife app can be found here: https://musiclife.netlify.app/

This is a social network application based around user's love for music. Once a user signs in or signs up through firebase authentication, they have access to the an entire musical database that was created by users themselves. The idea is that users can add songs to the database to better the overall MusicLife community, or add songs specifically to individual communities that are run by users (will be explained in another section). Every user can then browse through all the songs that everyone who has signed up for the app has added and add those songs to a personalized library. The main Browse page also has the ability to display popular songs at the moment, latest tracks added, and popular communities, which will be explained.

Inside your own library, you can create playlists with your songs to better organize the songs you love. There is also an option to delete songs from your library in case you would not like to have them there any longer.

## Communities
The social network part of the app comes into play with communities, which are ways for users to interact with each other. On the main Browse page with all the songs, there are also recommended communities to join, and communities that are popular at the moment. This will help a new user interact with communities they may not have known existed, help them spread their influence to communities they love, and get started on the app with new friends.

Once a user has joined a community, they can discuss with others in that community about the songs they love, the history of the music of interest, or anything else. They can add songs from their own library or from the main Browse page to a list of songs specific to that community. One example of this would be an 80s community who loves 80s music. They can discuss it, add songs to their community, and help their community thrive and potentially reach the top of the communities chart to help spread their influence.

There is also a recommended communities tab to help people find communities, and there is a "popping communities" tab on the main page to grab people's interest.

## Firestore
Because the backend database is hosted using Firestore, there are many benefits that come along with this. Messages sent in communities will be stored forever, which allows for continuous conversation between users. Firebase also provides proper authentication so that people who have not signed up for an account cannot read or write to songs list, or interact with any communities. Also, a user's songs and playlists are all stored in the Firestore, so their collections will never get lost.
