import React from 'react';
import { Text } from 'react-native';

const NameContext = React.createContext('Unknown');

const NameProvider = ({ children, first, last }) => {
  const fullName = `${first} ${last}`;
  return (
    <NameContext.Provider value={fullName}>
      <Text>{children}</Text>
    </NameContext.Provider>
  );
};

const NameConsumer = () => (
  <NameContext.Consumer>{value => <Text>My Name Is: {value}</Text>}</NameContext.Consumer>
);

export { NameContext, NameConsumer, NameProvider };
