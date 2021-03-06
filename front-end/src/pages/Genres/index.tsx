import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import useAuthContext from '../../contexts/AuthContext';
import useToastContext from '../../contexts/ToastContext';

import Card from '../../components/Card';

import { Container } from './styles';

interface IGenre {
    id: number;
    description: string;
    genre_image: string;
}

const Genres: React.FC = () => {
	const [genres, setGenres] = useState<IGenre[]>();

	const { signOut } = useAuthContext();
	const history = useHistory();
	const { addToast } = useToastContext();

	const navigateToBandPage = (genre_id: number) => {
		history.push(`/bands/${genre_id}`)
	}

	useEffect(() => {
			api.get('/api/v1/genre').then(({ data }) => {
				setGenres(() => {
					return data.results.map((genre: IGenre) => {
						return { ...genre }
					}) as IGenre[]
				});
			}).catch((error) => {
				if (error?.response?.status === 401) {
					signOut();
					addToast({
						title: 'Session Expired',
						type: 'error'
					});
				}
				addToast({
					title: 'cant connect to server',
					description: 'try again later',
					type: 'error'
				});
			});
	}, [signOut, addToast]);

    const showCards = () => {
			return genres && genres.map(genre => {
				return (
          <Card
            key={genre.id}
            onClick={() => navigateToBandPage(genre.id)}
            description={genre.description}
            image={genre.genre_image}
          />
				)
			})
		}

    return (
			<Container>
				{showCards()}
			</Container>
    )
}

export default Genres;
