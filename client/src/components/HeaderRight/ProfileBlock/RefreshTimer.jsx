import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./ProfileBlock.module.css";
import React from "react";

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress
                color="primary"
                size={24}
                thickness={6}
                variant="static" {...props} />
            <Box
                top={-2}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <div className={classes.numberInCircle}>
                    {`${Math.round(
                        props.value / 3.33,
                    )}`}
                </div>
            </Box>
        </Box>
    );
}

export default function RefreshTimer(props) {
    const [progress, setProgress] = React.useState(99.8);


    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 99.8 ? 3.33 : prevProgress + 3.33));
        }, 1000);
        const timer2 = setInterval(() => {
            props.loadingNotificationsNoReadCount()
            props.loadingDealsPage()
        }, 30000);
        return () => {
            clearInterval(timer);
            clearInterval(timer2);
        };
    }, []);

    return <CircularProgressWithLabel value={progress}/>;
}