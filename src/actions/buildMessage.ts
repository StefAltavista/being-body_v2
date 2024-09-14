export default function buildMessage(subject, data) {
    const info = Object.keys(data)
        .map((x) => {
            return `${x.toUpperCase()}: ${data[x]}`;
        })
        .toString()
        .replace(/,/gi, "<br></br>");

    return `<div><p>Hello Katia!<br></br>You received a ${subject}</p><br></br><p>${info}</p>`;
}
