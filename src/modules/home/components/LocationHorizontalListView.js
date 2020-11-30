import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View, StyleSheet,
    Animated,
    ScrollView, TouchableOpacity,
    Text,
    Image,
    Linking
} from 'react-native';
import { images, Values, Colors } from '../../../config';
import FastImage from 'react-native-fast-image';

const width = Values.deviceWidth * 0.38;
const height = 180;
const carouselWidth = width;
const carouselHeight = height;//(width * 2) / 5;
const BAR_SPACE = 7;
const MAX_ITEMS_COUNT = 8;

import { location } from '../../../data';


class LocationHorizontalListView extends Component {
    //carousel
    itemWidth = 6
    animVal = new Animated.Value(0)

    constructor(props) {
        super(props);
        this.state={
            activePage: 0,
            locations: []
        }
        this._animateNextPage = this._animateNextPage.bind(this);
        this._setUpTimer = this._setUpTimer.bind(this);
        this._resetPager = this._resetPager.bind(this);
        this.scrollToPage = this.scrollToPage.bind(this);
    }
    componentDidMount() {
        this.setState({
            locations: location,
        });
    }

    componentWillUnmount() {
        if(this.timer) {
            clearInterval(this.timer);
        }

    }
    
    componentDidUpdate(prevProps, prevState) {
        
    }

    _animateNextPage() {
        const { locations } = this.state;
        let {activePage} = this.state;
        if (activePage < locations.length - 1) {
          activePage++;
        } else if (this.props.loop) {
          activePage = 0;
        } else if (!this.props.loop) {
          this.clearInterval(this.timer);
          return;
        }

        this.scrollToPage(activePage, true);
    }

    _setUpTimer() {
        const { locations } = this.state;
        if (this.timer) {
          clearInterval(this.timer);
        }

        if (locations.length > 1) {
          this.timer = setInterval(this._animateNextPage, this.props.delay);
        }
    }

    _resetPager() {
        const { locations } = this.state;
        const {initialPage, autoplay} = this.props;
        if (initialPage > 0) {
          this.setState({activePage: initialPage});
          this.scrollToPage(initialPage, false);
        }
        if (locations && autoplay) {
          this._setUpTimer();
        }
    }

    scrollToPage(activePage, animated) {
        this.setState({activePage});
        if(this.scrollView) {
            this.scrollView.scrollTo({
                x: activePage * (carouselWidth + 15),
                y: 0,
                animated,
            });
        }

    }

    render(){

        const { locations } = this.state;
        ////carousel item
        let locationArray = []
        let barArray = []

        locations.forEach((location, i) => {
            const thisPromotion = (
                <TouchableOpacity key={`promotion${i}`} >

                    <View  style={{backgroundColor: Colors.white,  flexDirection:"row", flex: 1}} >
                        
                        <FastImage
                            source={{ uri: location.imgUrl }}
                            style={i === locations.length - 1 ? styles.lastImage : styles.image}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={{fontSize: Values.fontSize.small,
                        textAlign: "center",
                        color: Colors.white,
                        alignSelf: "stretch",
                        fontWeight: "bold", 
                        position: 'absolute', left: 0, right: 0, bottom: 10,
                    }}>{location.name}</Text>
                    
                </TouchableOpacity>
            )

            locationArray.push(thisPromotion)
        })

        if(locationArray.length == 0) return null;
        return <View style={{alignSelf: 'stretch'}}>
            <View style={styles.mainContainer}>
                <View style={styles.listContainer}>

                    <ScrollView
                        ref={(scrollView) => {
                            this.scrollView = scrollView;
                        }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={carouselWidth + 15}
                        decelerationRate={0}
                        scrollEventThrottle={20}
                        onScroll={
                            Animated.event(
                                [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
                            )
                        }
                    >
                        {locationArray}
                    </ScrollView>

                </View>
            </View>
        </View>


    }
}

LocationHorizontalListView.defaultProps = {
    loop : true,
    initialPage: 0,
    autoplay: true,
    delay: 10000
}

const styles = StyleSheet.create({
    mainContainer: {
        height: carouselHeight + 16,
        alignSelf: 'stretch',
        marginVertical: 8,
    },
    listContainer: {
        paddingTop: 7,
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        marginLeft: 5,
        height: "100%",
        borderRadius: 5,
        borderWidth:1,
        borderColor: Colors.lightGray,
        width: carouselWidth,
        elevation: 1,
    },
    lastImage: {
        marginLeft: 5,
        height: "100%",
        marginRight: (Values.deviceWidth * 0.15) - 5,
        borderRadius: 5,
        width: carouselWidth,
        borderColor: Colors.lightGray,
        borderWidth:1,
        elevation: 1,
    },
    barContainer: {
        position: 'absolute',
        zIndex: 2,
        left: 16,
        bottom: -1,
        flexDirection: 'row',
    },
    linkButton: {
        position: 'absolute',
        zIndex: 2,
        right: 16,
        bottom: -20,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linkText: {
        fontSize: 12,
        color: Colors.secondaryColor
    },
    track: {
        backgroundColor: Colors.divider,
        overflow: 'hidden',
    },
    bar: {
        backgroundColor: Colors.gray,
        position: 'absolute',
    },
    title: {
        fontSize: 16,
        color: Colors.lightBlack
    },

});
const mapStateToProps = (state) => ({ });

export default connect(mapStateToProps)(LocationHorizontalListView);
