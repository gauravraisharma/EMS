import React, {memo, useEffect, useState} from 'react';
import {Navigation} from '../types';
import DropDown from 'react-native-paper-dropdown';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {EmployeeApi} from '../api/EmployeeAPI';
import {employee} from '../models';
import {DatePickerModal} from 'react-native-paper-dates';
import {useToast} from 'react-native-paper-toast';
import moment from 'moment';
import {
  approverValidator,
  leaveTypeValidator,
  reasonValidator,
} from '../core/utils';
import {LeavesApi} from '../api/LeavesAPI';

type Props = {
  navigation: Navigation;
};

const LeaveApply = ({navigation}: Props) => {
  const toaster = useToast();
  const [showDropDown, setShowDropDown] = useState(false);
  const [showTypeDropDown, setShowTypeDropDown] = useState(false);
  const [approver, setApprover] = useState<any>({value: '', error: ''});
  const [type, setType] = useState<any>({value: undefined, error: ''});
  const [approverList, setApproverList] = useState<any[]>([]);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [range, setRange] = React.useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({startDate: undefined, endDate: undefined});
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState({value: '', error: ''});
  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({startDate, endDate}) => {
      setOpen(false);
      setRange({startDate, endDate});
    },
    [setOpen, setRange],
  );
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );
  const leaveTypeList = [
    {label: 'Full Day', value: 1},

    {label: 'Half Day', value: 2},

    {label: 'Short Leave', value: 3},
  ];
  const apply = async () => {
    console.log('called');
    const approverError = approverValidator(approver.value);
    const typeError = leaveTypeValidator(type.value);
    const reasonError = reasonValidator(reason.value);
    if (approverError || typeError || reasonError) {
      setApprover({...approver, error: approverError});
      setType({...type, error: typeError});
      setReason({...reason, error: reasonError});
      return;
    }
    LeavesApi.apply({
      ApproverId: approver.value,
      leaveType: type.value,
      startLeave: type.value === 1 ? range.startDate : date,
      endLeave: type.value === 1 ? range.endDate : date,
      reasonForLeave: reason.value,
    }).then((res: any) => {
      console.log(res);
      toaster.show({message: res, duration: 2000});
      navigation.navigate('Leaves');
    });
  };
  useEffect(() => {
    const getApproverList = async () => {
      EmployeeApi.getApprover({}).then(async (res: employee[]) => {
        let options = await res.map((obj: any) => ({
          value: obj.employeeId,
          label: obj.name,
        }));
        return setApproverList(options);
      });
    };
    getApproverList();
  }, [navigation, setApproverList]);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          size={28}
          style={{paddingLeft: 3}}
        />
        <Appbar.Content
          title={<Text style={{fontSize: 20}}> Leave Apply </Text>}
          style={{marginLeft: -10}}
        />
      </Appbar.Header>
      <SafeAreaView style={styles.containerStyle}>
        <DropDown
          label={'Select Approver'}
          mode={'outlined'}
          value={approver.value}
          setValue={(val: any) => setApprover({value: val, error: ''})}
          list={approverList}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          inputProps={{
            right: <TextInput.Icon name={'menu-down'} />,
          }}
        />
        {approver.error ? (
          <Text style={styles.error}>{approver.error}</Text>
        ) : null}
      </SafeAreaView>
      <SafeAreaView style={styles.containerStyle}>
        <DropDown
          label={'Type'}
          mode={'outlined'}
          value={type.value}
          setValue={(val: any) => setType({value: val, error: ''})}
          list={leaveTypeList}
          visible={showTypeDropDown}
          showDropDown={() => setShowTypeDropDown(true)}
          onDismiss={() => setShowTypeDropDown(false)}
          inputProps={{
            right: <TextInput.Icon name={'menu-down'} />,
          }}
        />
        {type.error ? <Text style={styles.error}>{type.error}</Text> : null}
      </SafeAreaView>
      <SafeAreaView>
        {(type.value === undefined || type.value === 1) && (
          <>
            <Button
              mode={'outlined'}
              style={styles.btn}
              onPress={() => setOpen(true)}>
              {range.startDate
                ? `${moment(range.startDate).format('DD-MM-YYYY')}-${moment(
                    range.endDate,
                  ).format('DD-MM-YYYY')}`
                : 'Duration'}
            </Button>
            <DatePickerModal
              mode="range"
              visible={open}
              onDismiss={onDismiss}
              startDate={range.startDate}
              endDate={range.endDate}
              onConfirm={onConfirm}
              label="Select period"
            />
          </>
        )}
        {(type.value === 2 || type.value === 3) && (
          <>
            <Button
              mode={'outlined'}
              style={styles.btn}
              onPress={() => setOpen(true)}>
              {date ? `${moment(date).format('DD-MM-YYYY')}` : 'Select Date'}
            </Button>
            <DatePickerModal
              // locale={'en'} optional, default: automatic
              mode="single"
              visible={open}
              onDismiss={onDismissSingle}
              date={date}
              onConfirm={onConfirmSingle}
            />
          </>
        )}
      </SafeAreaView>
      <View style={styles.textAreaContainer}>
        <TextInput
          label="Reason"
          style={styles.textArea}
          placeholder="Reason"
          placeholderTextColor="grey"
          numberOfLines={10}
          value={reason.value}
          onChangeText={(text: any) => setReason({value: text, error: ''})}
          multiline={true}
        />
      </View>
      <View style={{marginHorizontal: 16}}>
        {reason.error ? <Text style={styles.error}>{reason.error}</Text> : null}
      </View>

      <Button mode="contained" style={styles.smallBtn} onPress={apply}>
        Apply
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 20,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  container: {
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
  },
  btn: {
    marginHorizontal: 16,
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: '#E5E2CF',
    borderRadius: 5,
    height: 60,
  },
  smallBtn: {
    marginHorizontal: 80,
    height: 45,
    justifyContent: 'center',
    marginTop: 20,
  },
  textAreaContainer: {
    marginTop: 20,
    borderColor: 'grey',
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  error: {
    fontSize: 14,
    color: 'red',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});
export default memo(LeaveApply);
