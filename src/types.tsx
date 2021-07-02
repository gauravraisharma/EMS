import {NavigationSetParamsAction} from 'react-navigation';

export type Navigation = {
  navigate: (
    scene: string,
    navigationOptions?: NavigationSetParamsAction,
  ) => void;
  goBack: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setParams: (params: object) => any;
  dispatch: (NavigationSetParamsAction: NavigationSetParamsAction) => any;
  state: any;
};
