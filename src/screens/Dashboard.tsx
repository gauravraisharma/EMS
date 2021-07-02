import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  Text,
  Platform,
  View,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Appbar, Card, Paragraph, Title} from 'react-native-paper';
import {EmployeeApi} from '../api/EmployeeAPI';
import {Navigation} from '../types';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationActions} from 'react-navigation';

type Props = {
  navigation: Navigation;
};
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const Dashboard = ({navigation}: Props) => {
  const [employeeList, setEmployeeList] = useState([]);
  const [offset, setOffset] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const fetchMore = useCallback(() => setShouldFetch(true), []);

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          const setParamsAction = NavigationActions.setParams({
            params: {employeeId: item.employeeId},
            key: 'EmployeeDetail',
          });
          navigation.navigate('EmployeeDetail', setParamsAction);
        }}>
        <Card key={index} style={styles.mainCardView}>
          <Card.Title
            title={item.empCode}
            subtitle={item.officialEmailId}
            right={() => <Text>{item.bloodGroup}</Text>}
          />
          <Card.Content>
            <Title style={styles.title}>{item.name}</Title>
            <Text style={styles.subtitle}>{item.contactNumber1}</Text>
            <Paragraph>{item.departmentName}</Paragraph>
          </Card.Content>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }
    const fetch = async (limit: number) => {
      setShouldFetch(false);
      EmployeeApi.get({limit: limit, offset: offset}).then((res: any) => {
        setEmployeeList(oldEmp => (oldEmp != null ? [...oldEmp, ...res] : res));
        setOffset(offset + 1);
      });
    };
    fetch(10);
    console.log(employeeList);
  }, [offset, shouldFetch, employeeList]);

  return (
    <View>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.openDrawer()}
          size={28}
          style={{paddingLeft: 3}}
        />
        <Appbar.Content
          title={<Text style={{fontSize: 20}}> Techbit Hrms </Text>}
          style={{marginLeft: -10}}
        />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      <View style={{marginTop: 10}}>
        <FlatList
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          data={employeeList}
          renderItem={renderItem}
          onEndReachedThreshold={0.9}
          onEndReached={fetchMore}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainCardView: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.history_back,
    borderColor: Colors.color_eeeeee,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 13,
    color: '#696969',
  },
});

export default memo(Dashboard);
