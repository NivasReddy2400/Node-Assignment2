# Node-Assignment2

downloaded specs of the video are -
1) h264 codec
2 )bitrate 50000kbps
3) 8 bit depth
4) frame rate : 29

NPM modules 
-express
-ytdl-core
-ffmpeg-static

To get High Quality youtube video Make a get request to 
localhost:5000/CompressVideo with url as query parameter
Example:localhost:5000/CompressVideo?url=https://www.youtube.com/watch?v=M0veMUQk1O4


To get 720P youtube video Make a get request to 
localhost:5000/downloadYoutubeVideo with url as query parameter
Example:localhost:5000/downloadYoutubeVideo?url=https://www.youtube.com/watch?v=M0veMUQk1O4
