import { View, TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';

type Tab = {
  title: string;
  id: string;
};

type Props = {
  onPress: (tab: string) => void;
  activeTab: string;
  tabs: Tab[];
};

export const TabBar = (props: Props) => {
  const { onPress, activeTab, tabs } = props;

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.button}
            onPress={() => onPress(tab.id)}
            disabled={isActive}
          >
            <View>
              <Text style={[styles.text, isActive && styles.activeText]}>
                {tab.title}
              </Text>
              <View
                style={[styles.underline, isActive && styles.activeUnderline]}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
