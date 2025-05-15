reflection

i worked alone on this project because i'm doing it at my own pace. it was important for me to go through everything step by step and make something solid. i’m not planning to share this with classmates, it’s just for the teacher to see my work and how i approached the task.

during the project i focused on making the app more stable and ready for real use. i tested what happens when the database goes down or when bad data gets sent to the backend. i used docker to stop and start the db container and watched how the backend behaved. i also tested things like missing input fields or broken routes to see how the system reacts. that helped me fix weak points early.

backend error handling example

in my backend i have a health route that checks if the database is reachable. if it’s not, the server doesn’t crash, it just responds with a 500 error. that way the frontend gets a clear signal something is wrong without breaking the whole app. i also added console logs to help see when this happens. returning proper status codes is important so everything stays in control.

frontend error handling

on the frontend i made sure that if something goes wrong, like the backend being offline or sending back errors, the user still sees a clear message. i show something like “something went wrong, try again later” instead of letting the app go blank or freeze. that way the user knows it's not their fault and they can just wait or reload later.

healthchecks

i added healthchecks in docker-compose for both db and backend. the db check uses pg_isready to see if postgres is up, and the backend calls its own /health route. that makes sure docker knows when a service is actually ready, not just running. it's more reliable than just checking if the process is alive.

logging

i used console.log and console.error to keep track of what’s going on during errors. one helpful message was when i got “connect ECONNREFUSED” from the backend when the db was offline. that showed me the backend tried to connect too early. thanks to that i added depends_on and waited for the db to be healthy before starting the backend.

why this matters

apps that just crash when something is wrong can’t be used in production. if you want to deploy with something like kubernetes, it needs to know which services are ready and which aren’t. healthchecks and proper error handling are super important to keep things running. good logs also help a lot when fixing bugs or finding the problem fast.

clean code and structure

i removed unused files and made sure my folders were clean and only had what i needed. that helped me a lot when working alone because i didn’t get confused or distracted by stuff that wasn’t part of the project. clean code is just easier to work with and makes debugging way less painful.