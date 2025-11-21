import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { selectFilter, setFilter } from '../../redux/todos';
import { TodosFilter } from '../../redux/todos/types';
import { useAppDispatch } from '../../utils/redux/dispatch';

import { styles } from './styles';

type Tab = {
  title: string;
  id: TodosFilter;
};

const tabs: Tab[] = [
  { title: 'All', id: TodosFilter.ALL },
  { title: 'Active', id: TodosFilter.ACTIVE },
  { title: 'Completed', id: TodosFilter.COMPLETED },
];

export const TabBar = () => {
  const dispatch = useAppDispatch();
  const filter = useSelector(selectFilter);

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = filter === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.button}
            onPress={() => dispatch(setFilter(tab.id))}
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
