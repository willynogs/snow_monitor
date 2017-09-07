## SNOW MONITOR

To run this project you will need to have node and mongodb installed on your computer.

run the project with DEBUG=snowmonitor* npm start

when starting the server you will also have to supply servicenow user credentials using USER=<username> PASS=<password> if you start the server using forever this will help to keep the credentials hidden

when you start the server it will make an inital rest call to update the database. it will then continually refresh this data on the backend at a rate set by the frequency configuration
