/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useEffect } from "react";
import { BackHandler, View, StyleSheet, StatusBar } from "react-native";
const Modal = ({ visible, children, presentationStyle, onRequestClose }) => {
    useEffect(() => {
        const backHandler = visible ? BackHandler.addEventListener("hardwareBackPress", () => {
            if (visible && typeof onRequestClose === "function") {
                onRequestClose();
            }
            return true;
        }) : null;
        return () => {
            var _a;
            (_a = backHandler) === null || _a === void 0 ? void 0 : _a.remove();
        };
    }, [visible]);
    if (!visible) {
        return null;
    }
    const statusBarHidden = presentationStyle === "overFullScreen";
    const statusBarStateStyle = presentationStyle === "overFullScreen"
        ? styles.overFullscreen
        : styles.defaultStyle;
    return (<>
      {statusBarHidden && <StatusBar hidden/>}
      <View style={[styles.root, statusBarStateStyle]}>{children}</View>
    </>);
};
const styles = StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
        backgroundColor: "transparent"
    },
    overFullscreen: {
        top: 0
    },
    defaultStyle: {
        top: 0
    }
});
export default Modal;
