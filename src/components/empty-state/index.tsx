import { View, Text, Image } from 'react-native';

import emptyStateImage from '../../assets/icons/empty.png';
import { styles } from './styles';

type Props = {
  title: string;
  description: string;
};

export function EmptyState(props: Props) {
  const { title, description } = props;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={emptyStateImage} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.spacer} />
    </View>
  );
}
