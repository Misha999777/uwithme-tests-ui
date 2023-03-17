import LoadingOverlay from "react-loading-overlay-ts";
import SyncLoader from "react-spinners/SyncLoader";
import "../../styles/Loader.css"

export default function LoadingIndicator({loading = true, children = null}) {
    return (
        <LoadingOverlay
            spinner={<SyncLoader color={"#FFFFFF"}/>}
            text="Завантаження..."
            active={loading}
            fadeSpeed={0}
        >
            {children}
        </LoadingOverlay>
    )
};