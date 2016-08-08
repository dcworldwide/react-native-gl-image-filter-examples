import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    Text,
    View
} from 'react-native';

import RNFS from 'react-native-fs'
import {Surface} from "gl-react-native"
const {Image: GLImage} = require("gl-react-image")
// import {ImageFilter} from "gl-react-imagefilter";
import Saturate from './components/filters/saturate'
import S1977 from './components/filters/s1977'
import Hudson from './components/filters/hudson'
import Valencia from './components/filters/valencia'
import Inkwell from './components/filters/inkwell'
// import Sierra from './components/filters/sierra'
import Amaro from './components/filters/Amaro'
import Brannan from './components/filters/Brannan'

const filters = [
    {
        name: 'Amaro',
        component: Amaro,
        props: {},
    },
    {
        name: 'Brannan',
        component: Brannan,
        props: {},
    },
    {
        name: 'Hudson',
        component: Hudson,
        props: {}
    },
    {
        name: 'Saturate',
        component: Saturate,
        props: {
            factor: 0.9
        }
    },
    {
        name: 'S1977',
        component: S1977,
        props: {}
    },
    {
        name: 'Inkwell',
        component: Inkwell,
        props: {}
    },
    {
        name: 'Valencia',
        component: Valencia,
        props: {}
    }
]

class imageGlShaders extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeFilter: "Amaro",
            imageUrl: "http://lorempixel.com/output/nature-q-c-600-480-2.jpg", //"https://s3.amazonaws.com/mira/uploads/-KKDzQqGeuMJ-FgKktKR", //https://s3.amazonaws.com/mira/uploads/-KKDzg7lecfWQR8uiILx", //"http://i.imgur.com/iPKTONG.jpg"
            imageSize: {width: 600, height: 480} //{width: 1920, height: 1920}
        }
    }

    onFilterSelected(filter) {

        this.setState({
            activeFilter: filter
        })

        // @see https://projectseptemberinc.gitbooks.io/gl-react/content/docs/api/Surface.html
        let opts = {
            format: "file",
            filePath: `${RNFS.DocumentDirectoryPath}/temp.png`
        }

        console.log(opts)
        // this.refs.img.captureFrame(opts).then(file => {
        //   console.log(file)
        // });
    }

    renderActiveFilter() {

        let image = <GLImage
            source={this.state.imageUrl}
            imageSize={this.state.imageSize}
            resizeMode="cover"/>

        if (this.state.activeFilter == "Valencia") {
            return <Valencia
                inputImageTexture={image}
            />
        } else if (this.state.activeFilter == "Amaro") {
            return <Amaro
                inputImageTexture={image} />
        } else if (this.state.activeFilter == "Brannan") {
            return <Brannan
                inputImageTexture={image}
            />
        } else if (this.state.activeFilter == "Hudson") {
            return <Hudson
                inputImageTexture={image}
            />
        } else if (this.state.activeFilter == "S1977") {
            return <S1977
                inputImageTexture={image}
                />
        } else if (this.state.activeFilter == "Inkwell") {
            return <Inkwell
                inputImageTexture={image}
            />
        } else if (this.state.activeFilter == "Saturate") {
            return <Saturate
                factor={0.7}
                inputImageTexture={image}
            />
        } else {
            throw "Unsupported filter"
        }
    }

// <Surface width={Dimensions.get('window').width} height={200}>
// <ImageFilter sepia={3} blur={2}>
// <GLImage
// source="https://unsplash.it/200/300"
// imageSize={{ width: 300, height: 200 }}
// resizeMode="cover" />
// </ImageFilter>
// </Surface>

    render() {

        let activeFilter = this.renderActiveFilter()

        return (
            <View style={styles.container}>
                <Text>Standard React Image</Text>
                <Image source={{uri: this.state.imageUrl}} style={{height: 200}}></Image>
                <Text>GL React Image</Text>
                <Surface ref="img" width={Dimensions.get('window').width} height={200}>
                    {activeFilter}
                </Surface>
                <ScrollView
                    style={styles.scroll}
                    showsHorizontalScrollIndicator={false}
                    automaticallyAdjustContentInsets={true}
                    horizontal={true}>
                    {filters.map(f => {

                        let image = <GLImage
                            source={this.state.imageUrl}
                            imageSize={this.state.imageSize}
                            resizeMode="cover"/>

                        return <TouchableOpacity
                            key={f.name}
                            style={{flex: 1, padding: 1}}
                            onPress={this.onFilterSelected.bind(this, f.name)}>
                            <Text>{f.name}</Text>
                            <Surface width={120} height={120}>
                                <f.component
                                    inputImageTexture={image}
                                    {...f.props}
                                />
                            </Surface>
                        </TouchableOpacity>
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scroll: {
        flex: 1,
        height: 160,
    },
    shaderLabel: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('imageGlShaders', () => imageGlShaders);
