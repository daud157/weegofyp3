import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For icons
import { useUser } from "@/context/userContext"; // Import the user context

const ProfileScreen = () => {
  const { user } = useUser(); // Get user data from context

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header Section */}
      <View className="bg-gradient-to-r from-black to-gray-900 p-6 flex-row items-center justify-between shadow-md">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white"></Text>
        {/* <Ionicons name="ellipsis-horizontal" size={24} color="white" /> */}
      </View>

      {/* Profile Info */}
      <View className="bg-white p-6 mt-10 rounded-xl shadow-xl mx-4 bg-rgba(254, 192, 43, 0.8)">
        <View className="flex-row items-center ">
          <Image
            source={{ uri: user?.profilePicture || 'https://via.placeholder.com/100' }}
            className="w-24 h-24 rounded-full border-4 border-gray-300"
          />
          <View className="ml-4">
            <Text className="text-2xl font-bold text-black">
              {user?.firstname} {user?.lastname}
            </Text>
            <View className="flex-row items-center mt-2">
              <Ionicons name="star" size={18} color="gold" />
              <Text className="ml-1 text-lg text-gray-500">4.85 stars</Text>
            </View>
            <Text className="text-sm text-gray-400 mt-1">Joined: {user?.joinedDate || '24 Jan 2021'}</Text>
          </View>
          <TouchableOpacity className="ml-auto">
            <Ionicons name="pencil" size={24} color="rgba(254, 192, 43, 0.8)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Tabs */}
      <View className="flex-row justify-around bg-white shadow-sm rounded-xl mt-6 mx-4 p-2">
        <TouchableOpacity className="border-b-2 border-rgba(254, 192, 43, 0.8)-500 pb-2">
          <Text className="font-semibold text-rgba(254, 192, 43, 0.8)">Profile Info</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="font-semibold text-gray-400">Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Information */}
      <View className="p-6 bg-white mt-4 rounded-xl shadow-xl mx-4">
        <Text className="text-xl font-semibold text-black">Profile Information</Text>
        <View className="mt-4 border-b border-gray-200 pb-2">
          <Text className="text-gray-500">Full Name</Text>
          <Text className="text-black mt-1 text-lg">{user?.firstname} {user?.lastname}</Text>
        </View>

        <View className="mt-4 border-b border-gray-200 pb-2">
          <Text className="text-gray-500">User Name</Text>
          <Text className="text-black mt-1 text-lg">{user?.username || user?.firstname}</Text>
        </View>

        <View className="mt-4">
          <Text className="text-gray-500">Phone Number</Text>
          <Text className="text-black mt-1 text-lg">{user?.phoneNumber || 'N/A'}</Text>
        </View>

        {/* Edit button */}
        <TouchableOpacity className="absolute right-0 top-4">
          <Ionicons name="pencil" size={20} color="rgba(254, 192, 43, 0.8)" />
        </TouchableOpacity>
      </View>

      {/* Verification Section */}
      <View className="p-6 bg-white mt-4 rounded-xl shadow-xl mx-4">
        <Text className="text-xl font-semibold text-black">Verification</Text>

        <View className="mt-4 border-b border-gray-200 pb-2">
          <Text className="text-gray-500">Driver License</Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-black text-lg">{user?.driverProfile?.licenseNumber || 'N/A'}</Text>
            <Ionicons name="document-outline" size={24} color="rgba(254, 192, 43, 0.8)" className="ml-2" />
          </View>
        </View>

        {/* Insurance info */}
        <View className="mt-4">
          <Text className="text-gray-500">Insurance Info</Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-black text-lg">Insurance Document</Text>
            <Ionicons name="document-outline" size={24} color="rgba(254, 192, 43, 0.8)" className="ml-2" />
          </View>
        </View>

        <TouchableOpacity className="absolute right-0 top-4">
          <Ionicons name="pencil" size={24} color="rgba(254, 192, 43, 0.8)" />
        </TouchableOpacity>
      </View>

      {/* Spacer */}
      <View className="h-12"></View>
    </ScrollView>
  );
};

export default ProfileScreen;
