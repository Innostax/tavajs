import { useEffect, useState } from "react";
import "../index.css";

const NetworkStatus = () => {
    const [online, setOnline] = useState(navigator.onLine);
    const [isBackOnline, setIsBackOnline] = useState(false);

    const showOnlineStatus = () => {
        setOnline(true);
        setIsBackOnline(true);
        setTimeout(() => {
            setIsBackOnline(false);
        }, 1000);
    };
    const showOfflineStatus = () => {
        setOnline(false);
    };

    useEffect(() => {
        window.addEventListener("offline", showOfflineStatus);
        window.addEventListener("online", showOnlineStatus);

        return () => {
            window.removeEventListener("offline", showOfflineStatus);
            window.removeEventListener("online", showOnlineStatus);
        };
    }, [online]);
    return (
        <div>
            {!online && (
                <div className="msg offline-msg">
                    <div className="icon">
                        <span></span>
                    </div>
                    <div className="content">
                        <div>
                            {" "}
                            <strong>Offline : </strong> Connection lost! You are not connected
              to internet
                        </div>
                    </div>
                </div>
            )}
            {isBackOnline && (
                <div className="msg online-msg">
                    <div className="icon">
                        <img src="https://img.icons8.com/office/40/000000/high-connection.png" />
                    </div>
                    <div className="content">
                        <div>
                            <strong>Online : </strong>Back to online
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NetworkStatus;
