import React from 'react';
import { Text,
     TouchableOpacity,
     TouchableOpacityProps,
     ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props extends TouchableOpacityProps {
    isLoading: boolean;
}

export function Button({ isLoading, ...props }: Props) {
  return (
    <TouchableOpacity 
    style={styles.container}
    {...props}
    >
        {
            isLoading ? 
            <ActivityIndicator
                color={theme.colors.text_on_brand_color}
            />
            : 
            <Text style={styles.title}>
                Enviar Feedback
            </Text>
        }
    </TouchableOpacity>
  );
}