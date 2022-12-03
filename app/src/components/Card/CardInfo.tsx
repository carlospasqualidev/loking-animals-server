/* eslint-disable import/no-cycle */
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks';
import { sizes } from '../../styles';
import { Text } from '../Typography';

export const CardInfo = ({
  icon,
  label,
  value,
}: {
  icon: any;
  value: string | number;
  label: string;
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    cardContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    card: {
      padding: sizes['sm-16'],
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
      borderRadius: sizes['sm-8'],
    },
  });

  return (
    <View style={styles.cardContainer}>
      <Text type="p2">{label}</Text>
      <View style={styles.card}>
        <MaterialCommunityIcons name={icon} size={24} color={theme.colors.primary} />
        <Text style={{ marginLeft: sizes['sm-8'] }} type="p2">
          {String(value)}
        </Text>
      </View>
    </View>
  );
};
