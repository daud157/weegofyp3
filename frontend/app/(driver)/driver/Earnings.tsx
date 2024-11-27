import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons

const EarningsScreen = () => {
  const earnings = 1200; // Example earnings data
  const [isOnline, setIsOnline] = React.useState(false); // For the toggle button

  // Dummy booking data with passenger name and fare
  const bookings = [
    { id: 1, passenger: 'John Doe', fare: 35 },
    { id: 2, passenger: 'Jane Smith', fare: 50 },
    { id: 3, passenger: 'Alice Johnson', fare: 22 },
  ];

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 60, paddingHorizontal: 16, backgroundColor: '#FFF8E1' }}>
      {/* Earnings Card */}
      <View className="bg-white rounded-2xl p-6 shadow-lg w-full mt-16 mb-6 flex-row items-center justify-between">
      {/* Wallet Icon */}
      <View className="bg-customOrange rounded-full p-4">
        <Ionicons name="wallet-outline" size={32} color="white" />
      </View>
      
      {/* Earnings Info Right Aligned */}
      <View className="ml-4 flex-grow items-end">
        <Text className="text-lg font-bold text-gray-800 text-right">This Week's Earnings</Text>
        <Text className="mt-2 text-3xl font-bold text-black text-right mr-4">${earnings}</Text>
      </View>
    </View>
      {/* Booking List Header */}
      <Text className="text-2xl font-bold text-gray-700 mb-4">Your Bookings</Text>

      {/* Dummy Booking Cards */}
      {bookings.map((booking) => (
        <View key={booking.id} className="bg-white rounded-2xl p-4 shadow-lg w-full mb-4 flex-row justify-between items-center">
          <View>
            <Text className="text-xl font-bold text-gray-800">{booking.passenger}</Text>
            <Text className="text-gray-600 mt-1">Fare: ${booking.fare}</Text>
          </View>
          <Ionicons name="person-circle-outline" size={40} color="gray" />
        </View>
      ))}

      {/* Book Now Button */}
      <TouchableOpacity className="bg-customOrange py-4 px-9 rounded-full mt-6 shadow-lg flex-row justify-center items-center">
        <Text className="text-lg font-bold text-white text-center">Book your Ride Now</Text>
        <Ionicons name="arrow-forward" size={20} color="white" className="ml-2" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EarningsScreen;
