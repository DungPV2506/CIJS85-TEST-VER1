import React from 'react';
import { useState } from 'react';


const TaskItem = (task) => {

    const {id, name, isCompleted, onDelete} = task;

    const deleteTask = () =>{
        onDelete(id);
    }

    return (
        <>
            <input type="checkbox" id={name} name="fav_language" value="HTML"  defaultChecked={isCompleted} ></input>
            <label htmlFor={name} >{name}</label> <button onClick={deleteTask}>Delete</button><br />
        </>
    )
}

export default TaskItem