import { getDocs, query, where } from 'firebase/firestore';
import { movieCollectionRef } from '../../config/Firestore-collections'

export const fetchSimilarMovies = async (tags, id) => {
  const q = query(movieCollectionRef, where('tags', 'array-contains-any', tags));

  const querySnapshot = await getDocs(q);
  const similarMovies = [];
  querySnapshot.forEach((doc) => {
      if (doc.id !== id) {
        similarMovies.push({ id: doc.id, ...doc.data() });

      }
  });
  return similarMovies;
};