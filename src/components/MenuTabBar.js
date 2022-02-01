/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {IconButton, Text, useTheme} from 'react-native-paper';
import {TouchableOpacity, View} from 'react-native';

function MenuTabBar({state, descriptors, navigation}) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 45,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined ? options.tabBarLabel : null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              marginHorizontal: 2,
              backgroundColor: isFocused
                ? theme.colors.gray200
                : theme.colors.gray100,
              borderTopColor: isFocused
                ? theme.colors.primary
                : theme.colors.text100,
              borderTopWidth: 2,
              alignItems: 'center',
            }}>
            {label ? (
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: isFocused
                    ? theme.colors.primary
                    : theme.colors.text200,
                  width: '100%',
                  height: '100%',
                }}>
                {label}
              </Text>
            ) : (
              <IconButton
                icon="camera"
                color={isFocused ? theme.colors.primary : theme.colors.text200}
                size={20}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MenuTabBar;
