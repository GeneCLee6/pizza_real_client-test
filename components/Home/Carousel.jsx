import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import ChakraNextImage from '../UI/ChakraNextImage';

const Carousel = (props) => {
	const images = [...props.images];
	const timeInterval = props.timeInterval;
	const width = props.w || '300px';
	const height = props.h || '300px';

	const [imageIndex, setImageIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			const isLastImage = imageIndex === images.length - 1;
			setImageIndex(isLastImage ? 0 : imageIndex + 1);
		}, [timeInterval]);

		return () => clearInterval(interval);
	}, [imageIndex]);

	return (
		<>
			<Box>
				<div style={{ width, height }}>
					<ChakraNextImage src={images[imageIndex]} layout="fill" />
				</div>
			</Box>
		</>
	);
};

export default Carousel;
