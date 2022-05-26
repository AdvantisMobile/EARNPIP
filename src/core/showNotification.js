import Toast from 'react-native-root-toast';
export const showNotification = ({ type, message, }) => {
    let backgroundColor;
    switch (type) {
        case 'ERROR':
            backgroundColor = 'red';
            break;
        case 'WARNING':
            backgroundColor = 'orange';
            break;
        default:
            backgroundColor = 'green';
            break;
    }
    Toast.show(message, {
        position: 0,
        backgroundColor,
        shadowColor:'red',
        shadow: true,
        opacity:1,
        animation: true,
        textColor:'white',
        hideOnPress: true,
        delay: 0,
        duration: type === 'SUCCESS' ? 1000 : Toast.durations.LONG,
    });
};
