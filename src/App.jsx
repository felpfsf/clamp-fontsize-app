import React, { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BiCopy } from 'react-icons/bi'

const App = () => {
  const [pxPerRem, setPxPerRem] = useState(16)

  const [minWidthpx, setMinWidthpx] = useState(360)
  const [maxWidthpx, setMaxWidthpx] = useState(840)

  const [minFontSize, setMinFontSize] = useState(1)
  const [maxFontSize, setMaxFontSize] = useState(3.5)

  const hElement = useRef()

  const minWidth = minWidthpx / pxPerRem
  const maxWidth = maxWidthpx / pxPerRem

  console.log(minWidthpx, -minWidth);

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth)
  const yAxisIntersection = -minWidth * slope + minFontSize
  console.log(yAxisIntersection.toFixed(4));

  const clampFunction = `font-size: clamp(${minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)})vw, ${maxFontSize}rem);`

  // Tests
  // onClick={e => console.log(e.currentTarget.innerText)}
  // console.log(e.current?.innerText)

  function copyToClipboard() {
    const textToBeCopied = hElement.current.innerText
    console.log(textToBeCopied);
    navigator.clipboard.writeText(textToBeCopied)
    toastMessage(textToBeCopied)
  }

  const toastMessage = (textToBeCopied) => {
    toast.info(`${textToBeCopied} Copied !`, {
      position: toast.POSITION.TOP_CENTER,
      className: 'w-[360px] text-xs p-4'
    })
  }

  return (
    <section className='container'>
      <div className="container-wrapper">
        <h1 className='title'>Font-size Clamp</h1>
        <h2 className='subtitle'>Generate linearly scale font-size using clamp() function</h2>
        <div className="fields-container">

          <div className="field-container">
            <div className="inputs-container">
              <label htmlFor="minWidthpx">Min viewport width</label>
              <input
                id='minWidthpx'
                className='input-style'
                type="number"
                value={minWidthpx}
                onChange={e => setMinWidthpx(Number(e.target.value))} />
            </div>

            <div className="inputs-container">
              <label htmlFor="maxWidthpx">Max viewport width</label>
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
              <label htmlFor="minFontSize">Min font-size</label>
              <input
                id='minFontSize'
                className='input-style'
                type="number"
                value={minFontSize}
                onChange={e => setMinFontSize(Number(e.target.value))} />
            </div>

            <div className="inputs-container">
              <label htmlFor="maxFontSize">Max font-size</label>
              <input
                id='maxFontSize'
                className='input-style'
                type="number"
                value={maxFontSize}
                onChange={e => setMaxFontSize(Number(e.target.value))} />
            </div>
          </div>


          <div className="">
            <label htmlFor="pxPerRem">1rem = </label>
            <input
              id='pxPerRem'
              className='input-style w-16'
              type="number"
              value={pxPerRem}
              onChange={e => setPxPerRem(Number(e.target.value))} />
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
