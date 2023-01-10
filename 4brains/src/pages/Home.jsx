import styled from 'styled-components'
import Navbar from '../components/Navbar'
import React, { useCallback, useState } from 'react'
import axios from 'axios';
import Webcam from "react-webcam";
import FormData from "form-data"
const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};
const Container = styled.div`

`
function Home() {
    const [image, setImage] = useState('');
    const webcamRef = React.useRef(null);

    const handleRetake = (e) => {
        e.preventDefault();
        setImage('');
    }

    const handleCapture = (e) => {
        e.preventDefault();
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
        console.log(typeof imageSrc)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", image);
        console.log(data);
        // console.log(form);
        axios({
            method: "POST",
            url: "/photo/post",
            data: data,
        }).then((res) => {
            alert(res.data.message);
        });

    }
    const getFile = (e) => {
        setImage(image);
    };
    return (
        <>
            <Navbar />
            <Container>
                <div >
                    <div >
                        {image === '' ? <Webcam
                            audio={false}
                            height={200}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={220}
                            videoConstraints={videoConstraints}
                        /> :
                            <form onSubmit={handleSubmit}>
                                {/* <input name="file" type="image" src={image} alt="Submit" width="240" height="220" /> */}
                                <input type="file" src={image}name="file" onChange={getFile} required />
                                <input type="submit" name="upload" value="Upload" />
                            </form>

                        }
                    </div>
                    <div>
                        {image !== '' ?
                            <button onClick={handleRetake}> Retake Image</button> :
                            <button onClick={handleCapture}>Capture</button>
                        }
                        <button onClick={handleSubmit}> Submit</button>
                    </div>
                </div>


            </Container>
        </>
    )
}

export default Home