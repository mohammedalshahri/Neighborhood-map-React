# Neighborhood-Map-React
This project is single-page application that view goole map form google map API, by google-map-react
(https://github.com/google-map-react/google-map-react) and use foursquare API to displaying more information

##Getting Started
 run `npm install`.
Once installed use `npm start` to launch the project.

###what the application do

1. open the burger menu to display filter/search bar to real time filtering the list on the map.
3.Click  on the marker  to show   information window .
4. Click anywhere on the map to close the information window that opens.


### Important thing in MyReads Project

#App.js
This file is responsible for get all data form the foursquare API , and display the map withe marker

##slidemenu.js
In this Component is use react-burger-menu (https://github.com/negomi/react-burger-menu) to hide the list
when it's open will display the marker list and  search bar to filter the list
