/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
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

import Saturate from './components/filters/saturate'
import S1977 from './components/filters/s1977'
import Hudson from './components/filters/hudson'
import Valencia from './components/filters/valencia'
import Inkwell from './components/filters/inkwell'
// import Sierra from './components/filters/sierra'

const filters = [
  {
     name: 'Hudson',
     component: Hudson,
     props: {
       inputImageTexture2: "https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/brannanBlowout.png",
       inputImageTexture3: "https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/hudsonBackground.png",
       inputImageTexture4: "https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/hudsonMap.png"
    }
  },
  {
     name: 'Saturate',
     component: Saturate,
     props: {
       factor: 0.7
     }
  },
  {
     name: 'S1977',
     component: S1977,
     props: {
       inputImageTexture2: "https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/1977map.png"
     }
  },
  {
     name: 'Inkwell',
     component: Inkwell,
     props: {
       inputImageTexture2: "https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/inkwellMap.png"
     }
  },
  {
     name: 'Valencia',
     component: Valencia,
     props: {
       inputImageTexture2: "https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/valenciaMap.png",
       inputImageTexture3: "https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/valenciaGradientMap.png"
     }
  }
]

class imageGlShaders extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeFilter: "Valencia",
      imageUrl: "http://i.imgur.com/iPKTONG.jpg"
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

    if (this.state.activeFilter == "Valencia") {
      return <Valencia
          inputImageTexture={this.state.imageUrl}
          inputImageTexture2="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/valenciaMap.png"
          inputImageTexture3="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/valenciaGradientMap.png"
        />
    } else if (this.state.activeFilter == "Hudson") {
      return <Hudson
        inputImageTexture={this.state.imageUrl}
        inputImageTexture2="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/brannanBlowout.png"
        inputImageTexture3="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/hudsonBackground.png"
        inputImageTexture4="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/hudsonMap.png"
      />
    } else if (this.state.activeFilter == "S1977") {
      return <S1977
        inputImageTexture={this.state.imageUrl}
        inputImageTexture2="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/1977map.png"
      />
    } else if (this.state.activeFilter == "Inkwell") {
      return <Inkwell
        inputImageTexture={this.state.imageUrl}
        inputImageTexture2="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/inkwellMap.png"
      />
    } else if (this.state.activeFilter == "Saturate") {
      return <Saturate
        factor={0.7}
        inputImageTexture={this.state.imageUrl}
      />
    } else {
      throw "Unsupported filter"
    }
  }

  render() {

    let activeFilter = this.renderActiveFilter()

    return (
      <View style={styles.container}>
        <Surface ref="img" width={Dimensions.get('window').width} height={360}>
          {activeFilter}
        </Surface>
        <ScrollView
          style={styles.scroll}
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={true}
          horizontal={true}>
          {filters.map(f => {
            return <TouchableOpacity
              key={f.name}
              onPress={this.onFilterSelected.bind(this, f.name)}>
              <Surface width={160} height={160}>
                <f.component
                  inputImageTexture={this.state.imageUrl}
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
