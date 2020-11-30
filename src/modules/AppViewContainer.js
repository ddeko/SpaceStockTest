import { compose, lifecycle, fromRenderProps } from 'recompose';
import { Platform, UIManager, StatusBar } from 'react-native';

import AppView from './AppView';

export default compose(
  lifecycle({
    componentDidMount() {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor("white");
      if (Platform.OS === 'android') {
        // eslint-disable-next-line no-unused-expressions
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    },
  }),
)(AppView);
