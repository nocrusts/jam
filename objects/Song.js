
// SwiftUI > React smh
class Song {
    static async create(inputURL) {
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
        );

        return {
            title: smallerTitle,
            thumbnail: json.thumbnail_url,
            artist: noVEVO,
            url: inputURL
        }
    }
}

export default Song;