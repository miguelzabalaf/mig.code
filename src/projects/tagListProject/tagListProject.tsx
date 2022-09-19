import {View, Text, StyleSheet, LayoutAnimation} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../utils';
import TagInput from './components/tagInput';

const TagListProject = () => {
  const {containerStyle, heroProjectStyle, titleStyle, subTitleStyle} =
    styles();

  const [textValue, setTextValue] = React.useState('');

  const handleAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {type: 'linear', property: 'opacity', duration: 100},
      update: {type: 'spring', springDamping: 1},
      delete: {type: 'linear', property: 'opacity', duration: 100},
    });
  };

  const onChangeText = (text: string) => {
    handleAnimation();
    setTextValue(text);
  };
  return (
    <View style={containerStyle}>
      <View style={heroProjectStyle}>
        <Text style={titleStyle}>{'Tag list'}</Text>
        <Text style={subTitleStyle}>{'Developed by: Miguel Zabala'}</Text>
      </View>
      <View>
        <TagInput
          value={textValue}
          onChangeText={onChangeText}
          handleAnimation={handleAnimation}
        />
      </View>
    </View>
  );
};

export default TagListProject;

const styles = () => {
  return StyleSheet.create({
    containerStyle: {
      flex: 1,
      paddingTop: 75,
      paddingHorizontal: 25,
      backgroundColor: colors.white,
    },
    heroProjectStyle: {
      marginBottom: 50,
    },
    titleStyle: {
      fontSize: 35,
      fontFamily: fonts.montserratBlack,
      color: colors.black,
    },
    subTitleStyle: {
      fontSize: 20,
      fontFamily: fonts.montserratLight,
      color: colors.muted,
    },
  });
};
