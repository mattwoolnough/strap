import React, { PropTypes } from 'react';
import { Link } from 'react-router-native';
import { Button, Icon, Text } from 'native-base';

const styles = {
  button: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
  },
  icon: {
    color: '#fff',
  },
  label: {
    fontSize: 12,
  },
};

const NavItem = ({ icon, label, to }) => (
  <Link
    component={Button}
    light
    outline
    style={styles.button}
    to={to}
  >
    <Icon style={styles.icon} name={icon} />
    <Text style={styles.label}>{label}</Text>
  </Link>
);

NavItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavItem;
