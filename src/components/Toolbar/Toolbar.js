import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Toolbar.css';


function Toolbar() {

    //mapToProps
    const {thickness, color} = useSelector(state => state)
    console.log('intialState', color)

    //dispatchToProps
    const dispatch = useDispatch()


    const handleChange = (e) => {
        dispatch({type: e.target.name, payload: e.target.value})
    }


    return (
        <section className='toolbar'>
        <div className='picker'>
            <h2>Pick a Color!</h2>
            <input type='color' name='SET_COLOR' value={color} onChange={handleChange}/>

        </div>
        <div className='sliderCont'>
            <input className='slider' name='SET_THICKNESS' value={thickness} onChange={handleChange} type='range' min='1' max='10' />
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
