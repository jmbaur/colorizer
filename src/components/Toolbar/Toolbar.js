import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {SwatchesPicker} from 'react-color';
import './Toolbar.css';


function Toolbar() {
    //state
    // const [color, setColor] = useState('#ff0000')

    //mapToProps
    const color = useSelector(state => state.color)
    console.log('intialState', color)

    //dispatchToProps
    const dispatch = useDispatch()

    //swatches
    // const handleColorChange = (color) => {
    //     setColor(color.hex)
    // }

    const handleColorChange = (e) => {
        dispatch({type: e.target.name, payload: e.target.value})
    }




    return (
        <section className='toolbar'>
        <div className='picker'>
            <h2>Pick a Color!</h2>
            <input type='color' name='SET_COLOR' value={color} onChange={handleColorChange}/>
            
            {/* <SwatchesPicker
            width= '175px'
            height= '350px'
            color={color}
            triangle='hide'
            onChangeComplete={handleColorChange}
            />     */}
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
