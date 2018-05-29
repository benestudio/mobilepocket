import React from 'react';
import { FlatList, Text } from 'react-native';

import Item from './Item';
import Empty from './Empty';

export default ({ items, onRemove }) => (
  <FlatList
    data={items}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
       <Item item={item} onRemove={onRemove} />
    )}
    ListEmptyComponent={Empty}
  />  
);
