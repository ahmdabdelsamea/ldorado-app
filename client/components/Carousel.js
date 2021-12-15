import React, { useState, useRef } from 'react';
import {
	Dimensions,
	StyleSheet,
	Platform,
	View,
	SafeAreaView,
} from 'react-native';
import Carousel, {
	ParallaxImage,
	Pagination,
} from 'react-native-snap-carousel';

const width = Dimensions.get('window').width;

function CarouselItem({ item, index }, parallaxProps) {
	return (
		<View style={styles.item}>
			<ParallaxImage
				source={{ uri: item.image }} /* the source of the image */
				containerStyle={styles.imageContainer}
				style={styles.image}
				{...parallaxProps} /* pass in the necessary props */
			/>
		</View>
	);
}

function CustomPaging({ data, activeSlide }) {
	const settings = {
		dotsLength: data.length,
		activeDotIndex: activeSlide,
		containerStyle: styles.dotContainer,
		dotStyle: styles.dotStyle,
		activeDotStyle: styles.activeDotStyle,
		inactiveDotStyle: styles.inactiveDotStyle,
		inactiveDotOpacity: 0.5,
		inactiveDotScale: 1.5,
	};
	return <Pagination {...settings} />;
}

export default function CustomSlider({ data }) {
	const [slideIndex, setSlideIndex] = useState(0);
	const carouselRef = useRef(null);

	const settings = {
		sliderWidth: width,
		sliderHeight: width,
		itemWidth: width,
		data: data,
		hasParallaxImages: true,
		renderItem: CarouselItem,
		onSnapToItem: (index) => setSlideIndex(index),
	};
	return (
		<View style={styles.container}>
			<Carousel ref={carouselRef} {...settings} />
			<CustomPaging data={data} activeSlide={slideIndex} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 0,
		marginBottom: 15,
	},
	item: {
		width: '100%',
		height: 350,
	},
	imageContainer: {
		flex: 1,
		borderRadius: 0,
		backgroundColor: '#000',
		marginBottom: Platform.select({ ios: 0, android: 1 }), //handle rendering bug.
	},
	image: {
		resizeMode: 'cover',
	},
	dotContainer: {
		marginTop: -15,
	},
	dotStyle: {
		width: 8,
		height: 8,
		borderRadius: 50,
		backgroundColor: 'white',
	},
	inactiveDotStyle: {
		width: 5,
		height: 5,
		backgroundColor: 'rgb(255,230,230)',
	},
});
