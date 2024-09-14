const cert = require("../../../server/config.json").CERTIFICATION;

export default async function submitForm(subject, message) {
    return await fetch("/api/sendMessage", {
        headers: {
            "Content-type": "application/json",
            Authorization: cert,
        },
        method: "POST",
        body: JSON.stringify({ subject, message }),
    })
        .then((res) => res.json())
        .then(({ result }) => {
            return result;
        })
        .catch((e) => {
            if ((e = "NO_CREDENTIAL")) {
                return { e, result: "NOT ALLOWED" };
            }
            return { e, result: "Internal Error" };
        });
}
