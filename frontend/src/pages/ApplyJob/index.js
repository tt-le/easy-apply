import React from "react";
//import DocumentPicker from "react-native-document-picker";

function ApplyJob () {
render() {
    return(
        <View
            style={{
                width: "30%",
                top: moderateScale(8),
                justifyContent: "center",
                borderRadius: moderateScale(10),
            }}
            >
            <TouchableOpacity
                onPress={() =>this.docPicker()}
                style={styles.uploadView}
            >
                <Image
                source={images.upload}
                style={styles.documentStatusImg}
                />
            <Text style={styles.uploadTxt}> {'upload  doc'}</Text>
            </TouchableOpacity>
            </View>
    )
    }
   };

export default ApplyJob;