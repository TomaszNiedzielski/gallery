import { Alert, ToastAndroid, PermissionsAndroid } from "react-native";
import RNFetchBlob from "rn-fetch-blob";

export const REMEMBER_CURRENTLY_VIEWED_MEDIA_ITEM = 'CURRENTLY_VIEWED_MEDIA_ITEM';
export const DOWNLOAD_MEDIA_ITEM = 'DOWNLOAD_MEDIA_ITEM';
export const TOGGLE_HEADER_VISIBILITY = 'TOGGLE_HEADER_VISIBILITY';

export const rememberCurrentlyViewedMediaItem = mediaItem => {
    return {
        type: REMEMBER_CURRENTLY_VIEWED_MEDIA_ITEM,
        payload: {
            mediaItem: mediaItem
        }
    }
}

export const downloadMediaItem = path => {
    return () => {
        downloadFile(path);
    }
}

const actualDownload = path => {
    const fileName = path.split('/').pop();
    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
        fileCache: false,
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: dirs.DownloadDir + "/" + fileName,
        }
    })
    .fetch("GET", path)
    .progress((received, total) => {
        console.log("progress", received / total);
    })
    .then(res => {
        ToastAndroid.showWithGravity(
            "Your file has been downloaded to downloads folder!",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    });
};

const downloadFile = async path => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Storage Permission",
                message: "App needs access to memory to download the file."
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            actualDownload(path);
        } else {
            Alert.alert(
                "Permission Denied!",
                "You need to give storage permission to download the file."
            );
        }
    } catch (err) {
        console.warn(err);
    }
}

export const toggleHeaderVisibility = () => {
    return {
        type: TOGGLE_HEADER_VISIBILITY
    }
}