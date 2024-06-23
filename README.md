# NewFilm

## Description
This is a full stack website made using [Next.js](https://nextjs.org/). At the moment I've added auth, search bar functionality, and the movies will direct the user to a page with their information. The homepage is complete and plan to add ways for users to update their information as well as have their own page where they can see favorited movies. The styles for this project are made using [tailwind](https://tailwindcss.com/). I wanted to do a project where I made my own movie website with inspiration from Netflix and imdb. I used a components and svgs from [Shape Divider](https://www.shapedivider.app/) and [Aceternity](https://ui.aceternity.com/) to give the website a more modern feel. I hope you enjoy my work so far!

### API
The api at the moment is primarily for fetching data from the [TMDB](https://developer.themoviedb.org/docs/getting-started) api and I put the code in the api to fetch instead of the client to prevent api keys being exposed on the client. All movie data is acquired through the TMDB api.

### Auth
For authentication, I used [Auth.js](https://authjs.dev/). Users can sign in using credentials or with google authentication. I plan to add more functionality for users, however I wanted to finish the authentication and have something up for now.

### Live site
[NewFilm](https://newfilm-self.vercel.app/)