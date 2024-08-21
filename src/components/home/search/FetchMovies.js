import { getDocs } from 'firebase/firestore';
import { movieCollectionRef } from '../../../config/Firestore-collections'

export const fetchMovies = async (searchTerm) => {
  //const q = query(movieCollectionRef);
  const querySnapshot = await getDocs(movieCollectionRef);
  const movies = [];
  querySnapshot.forEach((doc) => {
    movies.push({ id: doc.id, ...doc.data() });
  });
  return movies;
};
