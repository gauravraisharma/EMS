import React, {memo, useEffect, useState} from 'react';
import {Navigation} from '../types';
import {Appbar, Card, Paragraph, Text, Title} from 'react-native-paper';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {EmployeeApi} from '../api/EmployeeAPI';
import {employeeDetail} from '../models';

type Props = {
  navigation: Navigation;
};

const EmployeeDetail = ({navigation}: Props) => {
  const [data, setData] = useState<employeeDetail>(new employeeDetail());
  const [spinner, setSpinner] = useState<boolean>(true);
  useEffect(() => {
    const {params} = navigation.state;
    console.log(params.params.employeeId);
    EmployeeApi.getEmployeeById(params.params.employeeId)
      .then(res => {
        let resp = res.response as employeeDetail;
        setData(resp);
        setSpinner(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [navigation]);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          size={28}
          style={{paddingLeft: 3}}
        />
        <Appbar.Content
          title={<Text style={{fontSize: 20}}> Employee Details </Text>}
          style={{marginLeft: -10}}
        />
      </Appbar.Header>
      <View>
        {spinner && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={'red'} />
          </View>
        )}
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <Title style={styles.title}>{data?.name}</Title>
            <Paragraph style={styles.textT}>{data?.adharCardNumber}</Paragraph>
            <Text style={styles.text}>{data?.contactNumber1}</Text>
            <Text style={styles.smalText}>{data?.empCode}</Text>
            <Paragraph style={styles.smalText}>
              {data?.officialEmailId}
            </Paragraph>
            <Text style={styles.smalText}>PAN Number : {data?.panNumber}</Text>
          </Card.Content>
          <Card.Cover
            style={styles.cover}
            source={{
              uri: 'https://www.pngarea.com/pngs/671/4697891_velankanni-matha-png-male-user-icon-hd-png.png',
            }}
          />

          <Card.Content>
            <View style={{marginHorizontal: 10}}>
              <Text>Address : {data?.correspondenceAddress}</Text>
              <Text>SkypeId : {data?.skypeId}</Text>
              <Text>Blood Group : {data?.bloodGroup}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowOffset: {width: 10, height: 10},
    width: '90%',
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  cover: {
    width: '100%',
    height: 190,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
  },
  text: {
    fontSize: 18,
    color: '#40382C',
    textAlign: 'center',
  },
  textT: {
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
    color: '#254073',
  },
  smalText: {
    width: '100%',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Nobile, Helvetica, Arial, sans-serif',
    textShadowColor: '#ccc',
  },
  content: {},
});

export default memo(EmployeeDetail);
