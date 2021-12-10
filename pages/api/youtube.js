const YouTubeAPI = async (req, res) => {

    if (req.query.q == "undefinded" || req.query.q == "" || req.query.q === undefined)
        return res.status(400).send('No query provided');

    const key = process.env.YOUTUBE_API_KEY;
    const response = await fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + req.query.q + "&type=video&key=" + key);
    const json = await response.json();

    if (json.error)
        return res.status(403).send(undefined);

    return res.status(200).send(json);

    // res.status(200).send({
    //     kind: "youtube#searchListResponse",
    //     etag: "sy5r20ORIp3o4u6HfN4vz_aYCGQ",
    //     nextPageToken: "CAEQAA",
    //     regionCode: "US",
    //     pageInfo: { totalResults: 1000000, resultsPerPage: 1 },
    //     items: [
    //         {
    //             kind: "youtube#searchResult",
    //             etag: "fjZjsI4ANbTEmnfEfxEiVvTSRV8",
    //             id: { kind: "youtube#video", videoId: "e_UWjVbYFdg" },
    //             snippet: {
    //                 publishedAt: "2021-08-07T22:05:55Z",
    //                 channelId: "UCVOC9EAuRQqnVoBAZ5mE-1Q",
    //                 title: "Sandbox Survival Game On Life-Sized Voxel Planets | Undefined Gameplay | First Look",
    //                 description:
    //                     "{Undefined} Gameplay Let's Play First Look A sandbox survival game, set on life-sized voxel planets with realistic phyisics with the possibility to shape your own ...",
    //                 thumbnails: {
    //                     default: {
    //                         url: "https://i.ytimg.com/vi/e_UWjVbYFdg/default.jpg",
    //                         width: 120,
    //                         height: 90,
    //                     },
    //                     medium: {
    //                         url: "https://i.ytimg.com/vi/e_UWjVbYFdg/mqdefault.jpg",
    //                         width: 320,
    //                         height: 180,
    //                     },
    //                     high: {
    //                         url: "https://i.ytimg.com/vi/e_UWjVbYFdg/hqdefault.jpg",
    //                         width: 480,
    //                         height: 360,
    //                     },
    //                 },
    //                 channelTitle: "GameEdged",
    //                 liveBroadcastContent: "none",
    //                 publishTime: "2021-08-07T22:05:55Z",
    //             },
    //         },
    //         {
    //             kind: "youtube#searchResult",
    //             etag: "asdfl;askdjf;laskdfj;alsdkj",
    //             id: { kind: "youtube#video", videoId: "e_UWjVbYFdg" },
    //             snippet: {
    //                 publishedAt: "2021-08-07T22:05:55Z",
    //                 channelId: "UCVOC9EAuRQqnVoBAZ5mE-1Q",
    //                 title: "Sandbox Survival Game On Life-Sized Voxel Planets | Undefined Gameplay | First Look",
    //                 description:
    //                     "{Undefined} Gameplay Let's Play First Look A sandbox survival game, set on life-sized voxel planets with realistic phyisics with the possibility to shape your own ...",
    //                 thumbnails: {
    //                     default: {
    //                         url: "https://i.ytimg.com/vi/e_UWjVbYFdg/default.jpg",
    //                         width: 120,
    //                         height: 90,
    //                     },
    //                     medium: {
    //                         url: "https://i.ytimg.com/vi/e_UWjVbYFdg/mqdefault.jpg",
    //                         width: 320,
    //                         height: 180,
    //                     },
    //                     high: {
    //                         url: "https://i.ytimg.com/vi/e_UWjVbYFdg/hqdefault.jpg",
    //                         width: 480,
    //                         height: 360,
    //                     },
    //                 },
    //                 channelTitle: "GameEdged",
    //                 liveBroadcastContent: "none",
    //                 publishTime: "2021-08-07T22:05:55Z",
    //             },
    //         },
    //     ],
    // });
};

export default YouTubeAPI;
