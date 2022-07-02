import React from 'react';
// https://www.youtube.com/watch?v=hBk4nV7q6-w&t=1032s
interface TableProps<TItem> {
  items: TItem[];
  renderItem: (item: TItem) => React.ReactNode;
}

export const Table = <TItem,>(props: TableProps<TItem>) => {
  return null;
};

export const Component = () => {
  return (
    <React.Fragment>
      <Table
        items={[{ id: '1' }]}
        renderItem={(item) => {
          return null;
        }}
      ></Table>
      <Table
        items={[{ id: '1', firstName: 'Burke' }]}
        renderItem={(item) => {
          return null;
        }}
      ></Table>
    </React.Fragment>
  );
};
