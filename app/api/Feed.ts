import * as firebase from 'firebase'
// tslint:disable-next-line:import-name
import db from '../firebase'

const getFeedsFromQuerySnaphot = (
  docs: firebase.firestore.QueryDocumentSnapshot[],
) => {
  const promisesArr = docs.map(
    (doc): Promise<AppTypes.FeedImageData> =>
      new Promise(async (resolve) => {
        const docData = doc.data()
        const {
          description,
          imageUrl,
          imageHeight,
          imageWidth,
          likes,
          userId,
          createdAt,
        } = docData
        const user = await docData.user.get()
        const likesNumber = (likes as firebase.firestore.DocumentReference[])
          .length
        const likesPaths = (likes as firebase.firestore.DocumentReference[]).map(
          (like) => like.path,
        )
        const data: AppTypes.FeedImageData = {
          createdAt: (createdAt as firebase.firestore.Timestamp)
            .toDate()
            .getTime(),
          user: {
            ...(user.data() as AppTypes.User),
            id: userId,
          },
          image: {
            description,
            imageUrl,
            imageWidth,
            imageHeight,
            likes: likesNumber,
            isLiked: likesPaths.includes(
              `users/${firebase.auth().currentUser!.uid}`,
            ),
          },
          id: doc.id,
        }
        resolve(data)
      }),
  )
  return Promise.all(promisesArr)
}

const getSubscribedFeed = async (
  usersIds: string[] = [],
): Promise<AppTypes.FeedImageData[]> => {
  const docs = await Promise.all(
    usersIds.map((userId) =>
      db
        .collection('pictures')
        .orderBy('createdAt', 'desc')
        .where('userId', '==', userId)
        .get(),
    ),
  )
  let images: AppTypes.FeedImageData[] = []
  await Promise.all(
    docs.map(async (doc) => {
      const datas = await getFeedsFromQuerySnaphot(doc.docs)
      images = images.concat(datas)
    }),
  )
  images.sort((a, b) => b.createdAt - a.createdAt)
  return images
}

export default {
  getSubscribedFeed,
}
