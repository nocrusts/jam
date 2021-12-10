
// SwiftUI > React smh
class Song {

    static store(song) {
        if (typeof window !== "undefined") {
            if (song.url.startsWith("https://")) {
                window.localStorage.setItem(song.url, JSON.stringify(song));
            }
        }
    }

    static async create(videoID, from = "?") {
        console.log("Creating from", from + ":", videoID)

        const inputURL = "https://youtube.com/watch?v=" + videoID;

        if (videoID === undefined) {
            return {
                title: "Song!",
                thumbnail: "/stock.png",
                artist: "Unknown",
                url: from + " " + videoID,
                dummy: true
            }
        }

        if (typeof window !== "undefined") {
            const cached = window.localStorage.getItem(inputURL);
            const object = JSON.parse(cached);
            if (cached && object) {
                return object;
            }
        }

        const url = `https://www.youtube.com/oembed?url=${inputURL}&format=json`;
        const res = await fetch(url);
        const json = await res.json();

        let noVEVO = json.author_name
            .replace("VEVO", "")
            .replace(" - Topic", "");

        let smallerTitle = (
            json.title
                .replace(`${json.author_name} - `, "")
                .replace(`- ${json.author_name}`, "")
                .replace(`${noVEVO} - `, "")
                .replace(`- ${noVEVO}`, "")
                .replace("(Official Music Video)", "")
                .replace("(Official Audio)", "")
                .replace("(Audio)", "")
                .replace("(Video)", "")
                .replace("(Official Video)", "")
                .replace("(Lyric Video)", "")
                .replace("[Official Music Video]", "")
                .replace(" | lyrics", "")
        );

        const song = {
            title: smallerTitle,
            thumbnail: json.thumbnail_url,
            artist: noVEVO,
            url: inputURL
        }

        Song.store(song);

        return song;
    }
}

export default Song;