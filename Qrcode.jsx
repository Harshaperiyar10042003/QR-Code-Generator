import React, { useState } from "react"; 

const Qrcode = () => {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrdata, setQrdata] = useState("");
    const [qrsize, setQrsize] = useState("");

    async function generateQR() {
        if (!qrdata.trim() || !qrsize.trim()) {
            alert("Please enter both data and size to generate a QR code.");
            return;
        }

        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
            setImg(url);
        } catch (error) {
            console.error("Error generating QR Code", error);
        } finally {
            setLoading(false);
        }
    }

    function downloadQR() {
        if (!img) {
            alert("No QR code generated yet.");
            return;
        }

        fetch(img)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("Error downloading QR Code", error);
            });
    }

    return (
        <div className="app-container">
            <h1>QR CODE GENERATOR</h1>
            {loading && <p>Please wait...</p>}
            {img && <img src={img} alt="QR Code" className="qr-code-image" />}
            
            <div>
                <label htmlFor="dataInput" className="input-label">
                    Data for QR Code:
                </label> 
                <input
                    type="text"
                    value={qrdata}
                    id="dataInput"
                    placeholder="Enter data for QR Code"
                    onChange={(e) => setQrdata(e.target.value)}
                />

                <label htmlFor="sizeInput" className="input-label">
                    Image size (e.g., 150):
                </label>
                <input type="text" value={qrsize} id="sizeInput" placeholder="Enter image size" onChange={(e)=>setQrsize(e.target.value)}/>
            <button className="generate-button"  disabled={loading} onClick={generateQR}>Generate QR Code</button>
            <button className="download-button" onClick={downloadQR}>Download QR Code</button>
            </div>

            <p className="footer">
                Designed by <a href="https://harshaperiyar10042003.github.io/My-Portfolio/">Harshavardhini</a>
            </p>
        </div>
    );
};

export default Qrcode;