import React, { useState } from 'react'

const Qrcode = () => {

    const [img, setImg] = useState("")
    const [loading, setLoading] = useState(false)
    const [qrdata, setQrdata] = useState("https://mdinesh.netlify.app/")
    const [size, setSize] = useState("150")

    async function generateQr() {
        setLoading(true)
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrdata)}`
            setImg(url)
        } catch (error) {
            console.log("caught error in generateQr", error)
        } finally {
            setLoading(false)
        }
    }

    function downloadQr() {
        fetch(img).then((response) => response.blob()).then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
           document.body.removeChild(link);
        }).catch((error)=>{
            console.log("error in download qr",error)
        })
    }

    return (
        <div className='text-center pt-5' >
            <div className=''>
                <h1 className='text-xl md:text-5xl '>MAKE YOU <span className='text-sky-500'>QR CODE </span> HERE</h1>
                {loading && <p className='text-xl my-5'>Please Wait ..... your Qr-code is on the way</p>}

                <img className='mx-auto my-7' src={img} />

                <div className='mt-5 flex flex-col align-content-center'>
                    <div className='mb-5'>
                        <label className='text-sky-500 text-xl md:text-2xl '> Data for Qr-code : </label>
                        <input className='text-md md:text-lg border border-sky-500 p-2  ' value={qrdata} onChange={(e) => setQrdata(e.target.value)} type='text' id='datainput' placeholder='Enter data for Qr-code' />
                    </div>
                    <div>
                        <label className='text-sky-500 text-xl md:text-2xl'> Image Size (Eg:250) : </label>
                        <input className='text-md md:text-lg border border-sky-500 p-2 ' type='number' id='sizeinput' placeholder='Enter Image Size' value={size} onChange={(e) => setSize(e.target.value)} />
                    </div>

                </div>

                <div className='mt-5  '>
                    <button className='bg-sky-500 text-md md:text-xl px-3 p-2 mb-3 md:mb-0  md:p-4 rounded-md md:mr-5' onClick={generateQr} >Generate QR-code</button><br className='block md:hidden' />
                    <button className='bg-emerald-500 text-md md:text-xl p-2 md:p-4 rounded-md' onClick={downloadQr} >Download QR-code</button>
                </div>

            </div>
            <div>
                <h1 className='text-md md:text-xl mt-4 '>Designed by <a href='https://mdinesh.netlify.app/' target='_blank' className='text-sky-500 '>Dinesh</a></h1>
            </div>
        </div>

    )
}

export default Qrcode
