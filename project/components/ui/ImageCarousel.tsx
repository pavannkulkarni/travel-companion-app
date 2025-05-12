import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Platform,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Theme } from '@/constants/theme';
import { ChevronLeft, ChevronRight, X } from 'lucide-react-native';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH;

interface ImageCarouselProps {
  images: string[];
  height?: number;
  autoplay?: boolean;
  loop?: boolean;
  showArrows?: boolean;
  borderRadius?: number;
  enableFullscreen?: boolean;
}

export function ImageCarousel({
  images,
  height = 200,
  autoplay = true,
  loop = true,
  showArrows = true,
  borderRadius = 0,
  enableFullscreen = false,
}: ImageCarouselProps) {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      activeOpacity={enableFullscreen ? 0.9 : 1}
      onPress={() => {
        if (enableFullscreen) {
          setFullscreenIndex(index);
          setIsFullscreen(true);
        }
      }}>
      <Image
        source={{ uri: item }}
        style={[styles.image, { height, borderRadius }]}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const renderFullscreenCarousel = () => (
    <Modal visible={isFullscreen} transparent={true}>
      <SafeAreaView style={styles.fullscreenContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsFullscreen(false)}>
          <X size={24} color={Theme.colors.white} />
        </TouchableOpacity>
        
        <Carousel
          ref={carouselRef}
          data={images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          firstItem={fullscreenIndex}
          onSnapToItem={setFullscreenIndex}
          loop={true}
        />

        {showArrows && images.length > 1 && (
          <>
            <TouchableOpacity
              style={[styles.fullscreenArrow, styles.leftArrow]}
              onPress={() => carouselRef.current?.snapToPrev()}>
              <ChevronLeft size={32} color={Theme.colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.fullscreenArrow, styles.rightArrow]}
              onPress={() => carouselRef.current?.snapToNext()}>
              <ChevronRight size={32} color={Theme.colors.white} />
            </TouchableOpacity>
          </>
        )}

        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === fullscreenIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={setActiveIndex}
        autoplay={autoplay}
        loop={loop}
        autoplayInterval={5000}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
      />

      {showArrows && images.length > 1 && (
        <>
          <TouchableOpacity
            style={[styles.arrow, styles.leftArrow]}
            onPress={() => carouselRef.current?.snapToPrev()}>
            <ChevronLeft size={24} color={Theme.colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.arrow, styles.rightArrow]}
            onPress={() => carouselRef.current?.snapToNext()}>
            <ChevronRight size={24} color={Theme.colors.white} />
          </TouchableOpacity>
        </>
      )}

      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      )}

      {isFullscreen && renderFullscreenCarousel()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    backgroundColor: Theme.colors.neutral[200],
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  leftArrow: {
    left: 16,
  },
  rightArrow: {
    right: 16,
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  paginationDotActive: {
    backgroundColor: Theme.colors.white,
    width: 24,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: SLIDER_WIDTH,
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenArrow: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});