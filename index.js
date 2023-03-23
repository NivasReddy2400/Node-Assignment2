const express = require('express');
const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');

const app = express()

app.get('/downloadYoutubeVideo',(req, res) => {
    try{
    const ref = req.query.url;

    const audio = ytdl(ref, { quality: 'highestaudio' }) 
    const video = ytdl(ref, { quality: 'highestvideo' })

    const ffmpegProcess = cp.spawn(ffmpeg, [
 
        '-loglevel', '8', '-hide_banner',
        '-progress', 'pipe:3',
        '-i', 'pipe:4',
        '-i', 'pipe:5',
        '-map', '0:a',
        '-map', '1:v',
        '-c:v', 'h264',
        '-b:v', '50000k', 
        '-pix_fmt', 'yuv420p', 
        'HighQualityVideo.mp4',
    ], {
        windowsHide: true,
        stdio: [
           
            'inherit', 'inherit', 'inherit',
            'pipe', 'pipe', 'pipe',
        ],
    });
    ffmpegProcess.on('close', () => {
        console.log('done');
        res.status(200).send('Video donwload completed!')
    });

    if(fs.existsSync('HighQualityVideo.mp4')) {
        fs.unlinkSync('HighQualityVideo.mp4');
    }

    audio.pipe(ffmpegProcess.stdio[4]);
    video.pipe(ffmpegProcess.stdio[5]);
    }catch(error){
        console.log('Error')
        send.status(500).status('Something Went Wrong')
    }
});

app.get('/CompressVideo',(req,res)=>{
        try{
        const url = req.query.url;

        const audio = ytdl(url, { quality: 'highestaudio' });
        const video = ytdl(url, { quality: 'highestvideo' });

        const ffmpegProcess = cp.spawn(ffmpeg, [
            '-loglevel', '8', '-hide_banner',
            '-progress', 'pipe:3',
            '-i', 'pipe:4',
            '-i', 'pipe:5',
            '-c:v', 'h264',
            '-b:v', '50000k', 
            '-pix_fmt', 'yuv420p', 
            '-preset', 'medium',
            '-crf', '23',
            '-c:a', 'libx264',
            '-s', '1280x720',
            '720Pvideo.mp4',
        ], {
            windowsHide: true,
            stdio: [
                'inherit', 'inherit', 'inherit',
                'pipe', 'pipe', 'pipe',
            ],
        });

        ffmpegProcess.on('close', () => {
            console.log('done');
            res.status(200).send('Video donwload completed!')
        });

        if (fs.existsSync('720Pvideo.mp4')) {
            fs.unlinkSync('720Pvideo.mp4');
        }

        audio.pipe(ffmpegProcess.stdio[4]);
        video.pipe(ffmpegProcess.stdio[5]);
    }catch(error){
        console.log('Error')
        send.status(500).status('Something Went Wrong')
    }
});


app.listen(5000, () => {
    console.log('Server started on Port 5000')
})

