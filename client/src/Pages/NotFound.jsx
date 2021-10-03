import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <>
            <div
                style={{
                    fontSize: "4rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    height: "100vh",
                    flexDirection: "column"
                }}>
                <div style={{
                    display: "flex",
                }}>
                    <span
                        style={{
                            color: "#1db954"
                        }}>
                        Oops !
                    </span>
                    Page Not Found
                </div>
                <Link to="/">
                    <button style={{
                        marginTop: "3rem",
                        padding: "0.75rem",
                        width: "10rem",
                        backgroundColor: "#1db954",
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "3rem",
                        color: "#fff",
                        outline: "none",
                        border: "none",
                        marginBottom: "1rem",
                        cursor: "pointer",
                    }}>Home</button>
                </Link>
            </div>
        </>
    )
}

export default NotFound
