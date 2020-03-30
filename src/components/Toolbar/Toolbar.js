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
        <div className='picker'>
            <h2>Pick a Color!</h2>
            <SwatchesPicker
            width= '175px'
            height= '350px'
            color={color}
            triangle='hide'
            onChangeComplete={handleColorChange}
            />   
        </div>
        <div className='buttons'>
            <button className='Btn'>Undo</button> 
            <br/><br/>
            <button className= 'Btn'>Clear</button>
        </div>
        </section>
    )
}

export default Toolbar
