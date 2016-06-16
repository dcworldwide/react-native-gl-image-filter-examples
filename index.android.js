/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View
} from 'react-native';

import {Surface} from "gl-react-native"
import Saturate from './components/saturate'
import Sierra from './components/sierra'
import S1977 from './components/s1977'
import Hudson from './components/hudson'
import Valencia from './components/valencia'
import Inkwell from './components/inkwell'

class imageGlShaders extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <Image
            style={{
              width: 250,
              height: 250
            }}
            source={{uri: 'http://i.imgur.com/iPKTONG.jpg'}}>
            <Text style={styles.shaderLabel}>Original</Text>
          </Image>
          <Surface width={250} height={250}>
            <Inkwell
              inputImageTexture="http://i.imgur.com/iPKTONG.jpg"
              inputImageTexture2="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/inkwellMap.png"
            />
          </Surface>
          <Surface width={250} height={250}>
            <S1977
              inputImageTexture="http://i.imgur.com/iPKTONG.jpg"
              inputImageTexture2="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/1977map.png"
            />
          </Surface>
          <Surface width={250} height={250}>
            <Valencia
              inputImageTexture="http://i.imgur.com/iPKTONG.jpg"
              inputImageTexture2="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/valenciaMap.png"
              inputImageTexture3="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/valenciaGradientMap.png"
            />
          </Surface>
          <Surface width={250} height={250}>
            <Hudson
              inputImageTexture="http://i.imgur.com/iPKTONG.jpg"
              inputImageTexture2="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/hudsonBackground.png"
              inputImageTexture3="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/softLight.png" //https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/overlayMap.png"
              inputImageTexture4="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/hudsonMap.png"
            />
          </Surface>
          <Surface width={250} height={250}>
            <Saturate
              factor={0.7}
              image="http://i.imgur.com/iPKTONG.jpg"
            />
          </Surface>
          <Surface width={250} height={250}>
            <S1977
              inputImageTexture="http://i.imgur.com/iPKTONG.jpg"
              inputImageTexture2="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/1977map.png"
            />
          </Surface>
          <Surface width={250} height={250}>
            <Sierra
              inputImageTexture="http://i.imgur.com/iPKTONG.jpg"
              inputImageTexture2="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/softLight.png" //https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/earlybirdBlowout.png" //https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/brannanBlowout.png" //https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/1977blowout.png"
              inputImageTexture3="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/sierraVignette.png"
              inputImageTexture4="https://raw.githubusercontent.com/danielgindi/Instagram-Filters/master/InstaFilters/Resources_for_IF_Filters/sierraMap.png"
            />
          </Surface>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scroll: {
    flex: 1,
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
