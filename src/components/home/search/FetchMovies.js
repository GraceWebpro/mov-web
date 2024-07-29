import { query, where, getDocs } from 'firebase/firestore';
import { movieCollectionRef } from '../../../config/Firestore-collections'

export const fetchMovies = async (searchTerm) => {
  const q = query(movieCollectionRef, where('title', '>=', searchTerm), where('title', '<=', searchTerm + '\uf8ff'));
  const querySnapshot = await getDocs(q);
  const movies = [];
  querySnapshot.forEach((doc) => {
    movies.push({ id: doc.id, ...doc.data() });
  });
  return movies;
};
