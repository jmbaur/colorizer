import React, {useState} from 'react';
import {SwatchesPicker} from 'react-color';
import './Toolbar.css';


function Toolbar() {
    const [color, setColor] = useState('#000')


    const handleColorChange = (color) => {
        setColor(color.hex)
    }

    return (
        <section className='toolbar'>
        <div>
            <h2>Pick a Color!</h2>
            <SwatchesPicker
            color={color}
            onChangeComplete={handleColorChange}/>     
        </div>
        <div className='buttons'>
            <button>Undo</button> <br/>
            <button>Clear</button>
        </div>
        </section>
    )
}

export default Toolbar
