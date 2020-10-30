import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const gameCount = functions.firestore
    .document('games/{gameId}')
    .onCreate( async (snapshot, context) => {
        const data = snapshot.data();

        const userRef = db.doc(`users/${data.uid}`);

        const userSnap = await userRef.get();
        const userData = userSnap.data()

        return userRef.update({
            gameCount: userData.gameCount +1
        });
    });

    export const userTrend = functions.firestore
        .document('games/{gameId}')
        .onUpdate((snapshot, context) => {
            const before = snapshot.before.data();
            const after = snapshot.after.data();

            let trend;

            if (after.score >= before.score) {
                trend = 'You are improving';
            } else {
                trend = 'you suck ass and are getting worse';
            }

            const userRef = db.doc(`users/${after.uid}`);

            return userRef.update({
                trend
            });
        });