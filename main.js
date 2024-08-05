const { Buffer } = require('buffer/').Buffer;

const projectId = "c2b094801d344932979761c0f64abe40";
const projectSecret = "NyP6nFovFXPOwXZ/0N868lCje6DySG7UiKMZLtCr/BzHvD1Vpe+jBA";

const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
console.log(auth);

window.auth = auth;
