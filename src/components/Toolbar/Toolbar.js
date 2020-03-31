import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Toolbar.css';


function Toolbar() {

    //mapToProps
    const color = useSelector(state => state.color)
    console.log('intialState', color)

    //dispatchToProps
    const dispatch = useDispatch()


    const handleColorChange = (e) => {
        dispatch({type: e.target.name, payload: e.target.value})
    }




    return (
        <section className='toolbar'>
        <div className='picker'>
            <h2>Pick a Color!</h2>
            <input type='color' name='SET_COLOR' value={color} onChange={handleColorChange}/>

        </div>
        <div>
            <input></input>
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
