
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useAppStore } from '@/lib/store';
import { Card } from '@/lib/types';
import { leaders } from '@/lib/leaderData';
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.85;
const cardSpacing = 16;

const cards: Card[] = [
  {
    title: 'About Us',
    description: 'Learn more about our society, values, and vision.',
    route: '/Sidebarsection/AboutUs',
    sectionKey: 'about-us',
    image: require('@/assets/images/aboutus.jpeg'),
    buttonLabel: 'Know More',
  },
  {
    title: 'Vision',
    description: 'Understand our long-term goals and direction.',
    route: '/Sidebarsection/Vision',
    sectionKey: 'vision',
    image: require('@/assets/images/farm.webp'),
    buttonLabel: 'View Vision',
  },
  {
    title: 'Event Registration',
    description: 'Register for upcoming community events.',
    route: '/Sidebarsection/EventRegistration',
    sectionKey: 'event-registration',
    image: require('@/assets/images/register.jpg'),
    buttonLabel: 'Register Now',
  },
  {
    title: 'Event Pass',
    description: 'You can view your pass here.',
    route: '/Sidebarsection/EventPass',
    sectionKey: 'eventpass',
    image: require('@/assets/images/pass.png'),
    buttonLabel: 'View Pass',
  },
];

export default function Home() {
  const { setCurrentSection } = useAppStore();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleArrowScroll = (direction: 'left' | 'right') => {
    const newIndex = direction === 'right' ? activeIndex + 1 : activeIndex - 1;
    if (newIndex >= 0 && newIndex < leaders.length) {
      const scrollX = newIndex * (cardWidth + cardSpacing);
      scrollRef.current?.scrollTo({ x: scrollX, animated: true });
      setActiveIndex(newIndex);
    }
  };

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / (cardWidth + cardSpacing));
    setActiveIndex(index);
  };

  return (
    <View style={styles.fullScreen}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.greetingContainer} />
        <View style={styles.rightSection}>
          <TouchableOpacity onPress={() => setCurrentSection('profile')}>
            <Image
              source={require('@/assets/images/bg.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Static Info Cards */}
        {cards.map((card, index) => (
          <View key={index} style={styles.cardBox}>
            <Image source={card.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => setCurrentSection(card.sectionKey)}
            >
              <Text style={styles.cardButtonText}>▶ {card.buttonLabel}</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Leader Cards Section */}
        <View style={styles.leaderHeading}>
          <Text style={styles.sectionHeading}>Leaders</Text>
        </View>

        <View style={styles.scrollContainer}>
          {/* Left Arrow */}
          {activeIndex > 0 && (
            <TouchableOpacity
              style={[styles.scrollArrow, { left: 10 }]}
              onPress={() => handleArrowScroll('left')}
            >
              <MaterialIcons name="arrow-back-ios" size={20} color="#1b5e20" />
            </TouchableOpacity>
          )}


<ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
            snapToInterval={cardWidth + cardSpacing}
            decelerationRate="fast"
            onMomentumScrollEnd={handleScrollEnd}
            contentContainerStyle={{
              paddingHorizontal: (screenWidth - cardWidth) / 2,
            }}
            style={styles.leaderScroll}
          >
            {leaders.map((leader, idx) => (
              <View key={idx} style={styles.leaderCard}>
                <Image source={leader.image} style={styles.cardImage1} />
                <Text style={styles.cardTitle}>{leader.title}</Text>
                <Text style={styles.cardDescription}>{leader.description}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Right Arrow */}
          {activeIndex < leaders.length - 1 && (
            <TouchableOpacity
              style={[styles.scrollArrow, { right: 10 }]}
              onPress={() => handleArrowScroll('right')}
            >
              <MaterialIcons name="arrow-forward-ios" size={20} color="#1b5e20" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#f9fefb',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(16, 82, 48, 0.81)',
  },
  greetingContainer: {
    flex: 1,
    marginLeft: 26,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#66bb6a',
  },
  cardBox: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 10,
    shadowColor: '#2e7d32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 290,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardImage1: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 15,
    color: '#000000',
    marginBottom: 12,
  },
  cardButton: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#1b5e20',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionHeading: {
    fontSize: 25,
    fontWeight: '600',
    color: '#1b5e20',
    marginLeft: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  leaderHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 4,
    gap: 6,
  },
  scrollContainer: {
    position: 'relative',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderScroll: {
    flexGrow: 0,
  },
  leaderCard: {
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: cardSpacing / 2,
    shadowColor: '#2e7d32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  scrollArrow: {
    position: 'absolute',
    top: '40%',
    backgroundColor: '#e2f8dd',
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
});
