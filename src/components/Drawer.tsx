import React, {memo} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {Avatar, Button, Divider, Text} from 'react-native-paper';
import {DrawerItems} from 'react-navigation-drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {theme} from '../core/theme';
import {AuthApi} from '../api/AuthAPI';
import {employeeDetail} from '../models';

const CustomDrawerContentComponent = (props: any) => {
  const [user, setUser] = React.useState<employeeDetail | undefined>(undefined);
  const ripple = TouchableNativeFeedback.Ripple('#adacac', false);
  const signOutUser = async (props: any) => {
    console.log(props);
    try {
      await AsyncStorage.clear();
      props.navigation.navigate('LoginScreen');
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    async function fetchMyAPI() {
      const resp = await AuthApi.me();
      setUser(resp);
    }
    fetchMyAPI();
  }, []);
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View
            style={[
              styles.containHeader,
              {backgroundColor: theme.colors.primary},
            ]}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Avatar.Image
                size={80}
                source={require('../assets/profile.png')}
              />
              <Text
                style={{
                  color: '#f9f9f9',
                  marginTop: '3%',
                  fontFamily: 'sans-serif-condensed',
                }}>{`Hi ${user?.name}`}</Text>
              <Text
                style={{
                  color: '#f9f9f9',
                  fontFamily: 'sans-serif-condensed',
                }}>{`${user?.officialEmailId}`}</Text>
            </View>
          </View>

          <DrawerItems {...props} />

          <View>
            <View style={{marginTop: '2%'}}>
              <Divider style={{backgroundColor: '#777f7c90'}} />
            </View>
            <View style={{marginTop: '3%'}}></View>
            <View style={{marginTop: '5%'}}>
              <Divider style={{backgroundColor: '#777f7c90'}} />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>

      <View style={{backgroundColor: '#ffffff'}}>
        <TouchableNativeFeedback
          background={ripple}
          onPress={() => signOutUser({...props})}>
          <View style={styles.containDrawerOption}>
            <Button icon={require('../assets/exit.png')}>Logout</Button>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containHeader: {
    paddingTop: '4%',
    paddingBottom: '4%',
  },
  containDrawerOption: {
    paddingLeft: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '3%',
    paddingBottom: '3%',
    backgroundColor: '#e6e6e6',
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    fontWeight: '600',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  actionText: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    fontWeight: '600',
    marginRight: '3%',
    marginLeft: '3%',
  },
  closeBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 17,
  },
  closeText: {
    fontFamily: 'sans-serif-medium',
    fontWeight: '600',
    marginRight: '3%',
    marginLeft: '3%',
  },
});
export default memo(CustomDrawerContentComponent);
