import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import HistoryItem, { HistoryItemData } from './HistoryItem';

interface HistoryListProps {
  data: HistoryItemData[];
  onDeleteItem: (id: number) => void;
  onEditActualPrice: (id: number) => void;
}

export default function HistoryList({ 
  data, 
  onDeleteItem, 
  onEditActualPrice 
}: HistoryListProps) {
  const renderItem = ({ item }: { item: HistoryItemData }) => (
    <HistoryItem
      item={item}
      onDelete={onDeleteItem}
      onEditActualPrice={onEditActualPrice}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
