import React, {memo, useCallback, useState, useEffect} from 'react';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Button, Card, FAB, Text, Title} from 'react-native-paper';
import {LeavesApi} from '../api/LeavesAPI';
import {leaveRequest} from '../models/entities/leave';
import {NavigationScreenProp} from 'react-navigation';
import moment from 'moment';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};
const getLeaveType = (leaveType: any) => {
  let leaveTypeName;
  switch (leaveType) {
    case 1:
      leaveTypeName = 'Full Day';
      break;

    case 2:
      leaveTypeName = 'Half Day';
      break;

    case 3:
      leaveTypeName = 'Short Leave';
      break;

    default:
      leaveTypeName = '';
  }
  return leaveTypeName;
};
const getLeaveStatus = (isApproved: boolean) => {
  let leaveStatus;
  switch (isApproved) {
    case true:
      leaveStatus = {status: 'Approved', color: 'green'};
      break;

    case false:
      leaveStatus = {status: 'Rejected', color: 'red'};
      break;
    default:
      leaveStatus = {status: 'Pending', color: 'brown'};
  }
  return leaveStatus;
};
const ForApprovalTabHook = (props: any) => {
  const {data, callData} = props;
  const setApprove = (isApprove: boolean, leaveId: number) => {
    LeavesApi.approve({isApprove, leaveId}).then(() => {
      callData();
    });
  };
  return (
    <ScrollView>
      {data &&
        data.map((leave: any, ind: any) => (
          <Card style={styles.container} key={ind}>
            <Card.Content>
              <Title>{leave.employeeName}</Title>
              <Text>{getLeaveType(leave.leaveType)}</Text>
              <Text>approver name : {leave.approverName}</Text>
              <Text>
                start leave :{' '}
                {moment(leave.startLeave).format('dddd, MMMM Do YYYY')}
              </Text>
              <Text>
                end leave :{' '}
                {moment(leave.endLeave).format('dddd, MMMM Do YYYY')}
              </Text>
              <Text>reason for leave : {leave.reasonForLeave}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="outlined"
                style={styles.btn}
                onPress={() => setApprove(true, leave.leaveId)}>
                Approve
              </Button>
              <Button
                mode="outlined"
                onPress={() => setApprove(false, leave.leaveId)}>
                Reject
              </Button>
            </Card.Actions>
          </Card>
        ))}
    </ScrollView>
  );
};
const YourLeavesTabHook = (props: any) => {
  const {data} = props;
  return (
    <View>
      {data && (
        <Card style={styles.container}>
          <Card.Content>
            <Title style={styles.htitle}>(remaining) / (total)</Title>
            <Title
              style={styles.title}>{`${data?.remainingLeaves} / 15`}</Title>
            <Text>approver name : {data?.approverName}</Text>
            <Text>leave type : {getLeaveType(data?.leaveType)}</Text>
            <Text>
              Duration : {moment(data?.startLeave).format('dddd, MMMM Do YYYY')}{' '}
              to {moment(data?.endLeave).format('dddd, MMMM Do YYYY')}
            </Text>
            <Text>
              Leave Status :{' '}
              <Text style={{color: getLeaveStatus(data?.isApproved).color}}>
                {getLeaveStatus(data?.isApproved).status}
              </Text>
            </Text>
            <Text>remaining: {data?.remainingLeaves}</Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};
const Leaves = ({navigation}: Props) => {
  const [didMount, setDidMount] = useState(false);
  const [data, setData] = useState<leaveRequest[]>([]);
  const [yourLeaveData, setYourLeaveData] = useState<leaveRequest>();
  const handleDataCall = useCallback(async () => {
    const response = await LeavesApi.getApprovalRequests();
    console.log(response);
    setData(response);
    const leaveStatus = await LeavesApi.getUserLeaves();
    console.log(leaveStatus);
    setYourLeaveData(leaveStatus);
  }, [setData, setYourLeaveData]);
  useEffect(() => {
    setDidMount(true);
    const unsubscribe = navigation.addListener('didFocus', async () => {
      await handleDataCall();
    });
    return () => {
      unsubscribe;
      setDidMount(false);
    };
  }, [navigation, handleDataCall]);

  if (!didMount) {
    return null;
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          size={28}
          style={{paddingLeft: 3}}
        />
        <Appbar.Content
          title={<Text style={{fontSize: 20}}>Leaves</Text>}
          style={{marginLeft: -10}}
        />
      </Appbar.Header>
      <Tabs defaultIndex={0}>
        <TabScreen label="For Approval" icon="compass">
          <ForApprovalTabHook data={data} callData={handleDataCall} />
        </TabScreen>
        <TabScreen label="Your Leave Status" icon="bag-personal">
          <YourLeavesTabHook data={yourLeaveData} />
        </TabScreen>
      </Tabs>
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        onPress={() => navigation.navigate('LeaveApply')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: {height: 5, width: 5},
    shadowOpacity: 0, //default is 1
    shadowRadius: 0, //default is 1
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 5,
    marginHorizontal: 5,
  },
  btn: {
    marginRight: 10,
  },
  title: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 45,
    marginTop: 0,
    width: '100%',
    padding: 25,
  },
  htitle: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default memo(Leaves);
