import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  Text,
} from 'react-native';
import FloatingVideo from 'rn-floating-video-widget';

const data = {
  video: {
    url:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  videos: [
    {
      url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    {
      url:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  ],
  seek: 0,
  index: 0,
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floating: false,
    };
  }

  componentDidMount() {
    FloatingVideo.onClose(data => console.log(data));
    FloatingVideo.onOpen(data => console.log(data));
    FloatingVideo.onPlay(data => console.log(data));
    FloatingVideo.onPause(data => console.log(data));
    FloatingVideo.onNext(data => console.log(data));
    FloatingVideo.onPrev(data => console.log(data));
    FloatingVideo.onError(data => console.log(data));
  }

  enterPipMode() {
    FloatingVideo.requestOverlayPermission()
      .then(() => {
        this.setState({
          floating: true,
        });
        FloatingVideo.open(data);
      })
      .catch(e => {
        ToastAndroid.show('Please grant draw over other apps permission', 800);
      });
  }

  componentWillUnmount() {
    FloatingVideo.removeAllListeners();
  }

  render() {
    const floating = this.state.floating;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.start}
          onPress={() => {
            this.enterPipMode();
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}>
            START
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            alignItems: 'center',
            padding: 15,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (floating) {
                this.setState({
                  floating: false,
                });
                FloatingVideo.close();
              }
            }}>
            <Text
              style={{
                color: 'red',
                fontSize: 16,
              }}>
              CLOSE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (floating) {
                FloatingVideo.play();
              }
            }}>
            <Text
              style={{
                color: 'red',
                fontSize: 16,
              }}>
              PLAY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (floating) {
                FloatingVideo.pause();
              }
            }}>
            <Text
              style={{
                color: 'red',
                fontSize: 16,
              }}>
              PAUSE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (floating) {
                FloatingVideo.next();
              }
            }}>
            <Text
              style={{
                color: 'red',
                fontSize: 16,
              }}>
              NEXT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (floating) {
                FloatingVideo.prev();
              }
            }}>
            <Text
              style={{
                color: 'red',
                fontSize: 16,
              }}>
              PREV
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  start: {
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 5,
  },
  button: {
    alignSelf: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 5,
  },
});
