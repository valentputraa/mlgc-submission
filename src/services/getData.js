const { Firestore } = require("@google-cloud/firestore");

async function getData() {
    const db = new Firestore();

    const snapshot = await db.collection("prediction").get();
    return snapshot.docs.map(doc => ({
        id: doc.id,
        history: doc.data()
    }));
}

module.exports = getData;