import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fonts} from '../../../utils';

interface ITag {
  id: string;
  value: string;
  tagValue: string;
  words: Array<string>;
}

interface ITagInput extends TextInputProps {
  handleAnimation: () => void;
  value: string;
  onChangeText: (text: string) => void;
}

const TagInput: React.FC<ITagInput> = props => {
  const {onChangeText, value: textValue} = props;
  const {
    labelStyle,
    textInputStyle,
    tagListStyle,
    tagListItemStyle,
    tagListItemTextStyle,
  } = styles();

  const onDelete = (tag: ITag) => {
    const textValueWithoutTagSelected = textValue
      .replace(/\s*,\s*/g, ', ')
      .replace(`${tag.value},`, '')
      .replace(`, ${tag.value}`, '')
      .trim();

    if (getTags().length === 1) {
      onChangeText(textValueWithoutTagSelected);
      onChangeText('');
    } else {
      onChangeText(textValueWithoutTagSelected);
    }
  };

  const getTags = (): Array<ITag> => {
    const tags = textValue.trim().split(',');
    return tags
      .map((tag, idx) => {
        return {
          id: `tag-${idx + 1}}`,
          value: tag.trim(),
          tagValue: `#${tag.trim().toLowerCase().replace(/\s+/g, '_')}`,
          words: tag.trim().split(' '),
        };
      })
      .filter(tag => tag.value.length > 0);
  };
  return (
    <View>
      <Text style={labelStyle}>Tags</Text>
      <TextInput
        value={textValue}
        onChangeText={onChangeText}
        style={textInputStyle}
        placeholder={'write tags separated by comma ( , )'}
        autoCapitalize={'none'}
        autoCorrect={false}
        multiline={true}
        textAlignVertical={'center'}
      />
      <View style={tagListStyle}>
        {getTags().map(tag => {
          return tag?.value ? (
            <TouchableOpacity
              key={tag.id}
              onPress={() => onDelete(tag)}
              style={tagListItemStyle}>
              <Text style={tagListItemTextStyle} key={tag.id}>
                {tag.tagValue}
              </Text>
            </TouchableOpacity>
          ) : null;
        })}
      </View>
    </View>
  );
};

export default TagInput;

const styles = () => {
  return StyleSheet.create({
    labelStyle: {
      fontSize: 18,
      fontFamily: fonts.montserratRegular,
      color: colors.muted,
    },
    textInputStyle: {
      height: 100,
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginVertical: 8,
      backgroundColor: colors.bgInput,
      borderRadius: 12,
      fontFamily: fonts.montserratRegular,
      color: colors.black,
      fontSize: 18,
    },
    tagListStyle: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tagListItemStyle: {
      borderRadius: 5,
      marginRight: 8,
      marginBottom: 8,
      paddingVertical: 5,
      paddingHorizontal: 10,
      flexDirection: 'row',
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
    },
    tagListItemTextStyle: {
      color: colors.primary,
      fontSize: 16,
      fontFamily: fonts.montserratRegular,
    },
  });
};
