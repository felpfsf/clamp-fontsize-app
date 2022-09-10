import React, { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BiCopy } from 'react-icons/bi'

const App = () => {
  const [pxPerRem, setPxPerRem] = useState(10)

  const [minWidthpx, setMinWidthpx] = useState(360)
  const [maxWidthpx, setMaxWidthpx] = useState(960)

  const [minFontSize, setMinFontSize] = useState(16)
  const [maxFontSize, setMaxFontSize] = useState(4.2)

  const hElement = useRef()

  const minWidth = minWidthpx / pxPerRem
  const maxWidth = maxWidthpx / pxPerRem

  console.log(minWidthpx, -minWidth);

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth)
  const yAxisIntersection = -minWidth * slope + minFontSize
  console.log(yAxisIntersection.toFixed(4));

  const clampFunction = `font-size: clamp(${minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxFontSize}rem);`

  // Tests
  // onClick={e => console.log(e.currentTarget.innerText)}
  // console.log(e.current?.innerText)

  const copyToClipboard = () => {
    const textToBeCopied = hElement.current.innerText
    console.log(textToBeCopied);
    navigator.clipboard.writeText(textToBeCopied)
    toastMessage(textToBeCopied)
  }

  const toastMessage = (textToBeCopied) => {
    toast.info(`${textToBeCopied} Copied !`, {
      position: toast.POSITION.TOP_CENTER,
      className: 'w-[360px] text-xs p-4',
      pauseOnHover: 'true'
    })
  }

  return (
    <section className='section-wrapper'>
      <div className="content-wrapper">
        <h1 className='title'>Font-size Clamp</h1>
        <h2 className='subtitle'>Scale linearly your font-size with clamp</h2>
        <div className="fields-container">

          <div className="field-container">
            <div className="inputs-container">
              <label className='label-style' htmlFor="minWidthpx">Min viewport width(px)</label>
              <input
                id='minWidthpx'
                className='input-style'
                type="number"
                value={minWidthpx}
                onChange={e => setMinWidthpx(Number(e.target.value))} />
            </div>

            <div className="inputs-container">
              <label className='label-style' htmlFor="maxWidthpx">Max viewport width(px)</label>
              <input
                id='maxWidthpx'
                className='input-style'
                type="number"
                value={maxWidthpx}
                onChange={e => setMaxWidthpx(Number(e.target.value))} />
            </div>
          </div>

          <div className="field-container">
            <div className="inputs-container">
              <label className='label-style' htmlFor="minFontSize">Min font-size(rem)</label>
              <input
                id='minFontSize'
                className='input-style'
                type="number"
                value={minFontSize}
                onChange={e => setMinFontSize(Number(e.target.value))} />
            </div>

            <div className="inputs-container">
              <label className='label-style' htmlFor="maxFontSize">Max font-size(rem)</label>
              <input
                id='maxFontSize'
                className='input-style'
                type="number"
                value={maxFontSize}
                onChange={e => setMaxFontSize(Number(e.target.value))} />
            </div>
          </div>


          <div className="inputs-container">
            <label className='label-style' htmlFor="pxPerRem">REM to PX</label>
            <label className='label-style' htmlFor="pxPerRem">1rem:
              <input
                id='pxPerRem'
                className='input-style w-16 ml-4'
                type="number"
                value={pxPerRem}
                onChange={e => setPxPerRem(Number(e.target.value))} />
            </label>
            <p className='instructions'>1rem = 10px; 16px = 1.6rem</p>
          </div>
        </div>

        <div className="clamp-field">
          <h4 className='clamp-code' ref={hElement}>{clampFunction}</h4>
          <BiCopy className='copy-btn cursors' onClick={copyToClipboard} />
        </div>

        <ToastContainer />
      </div>
    </section>
  )
}

export default App
